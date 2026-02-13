import re
from typing import List, Tuple, Set
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Basic stopwords + a few domain “junk” words
BASIC_STOPWORDS: Set[str] = {
    "the","and","a","an","to","of","in","for","on","with","is","are","was","were",
    "be","as","at","by","or","that","this","it","from","but","not","you","we",
    "our","your","their","they","i","me","my","us",
    "seeking","experience","role","position","looking","plus","developer"
}

# Phrases that TF-IDF often creates but are not real “skills”
BANNED_PHRASES: Set[str] = {
    "sql docker",
    "docker kubernetes",
    "kubernetes plus",
    "boot sql",
    "java spring"
}

# Single-word tokens that can be “generic” and create junk bigrams
GENERIC_TOKENS: Set[str] = {"boot", "rest", "apis"}  # keep small; we handle other rules below

# Real phrases we want to keep even if they look generic
ALLOWED_PHRASES: Set[str] = {"spring boot"}


def preprocess(text: str) -> str:
    """
    Normalize text:
    - lowercase
    - keep + # . - (useful for c++, c#, node.js)
    - remove other punctuation
    - collapse whitespace
    """
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s\+\#\.-]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def looks_like_skill(term: str) -> bool:
    """
    Heuristics to keep skills/keywords and remove junk.
    """
    term = term.strip()
    if not term:
        return False

    if term in BANNED_PHRASES:
        return False

    tokens = term.split()

    # reject anything containing filler words
    bad_tokens = {"plus", "developer", "seeking", "experience"}
    if any(t in bad_tokens for t in tokens):
        return False

    # allow certain phrases explicitly
    if term in ALLOWED_PHRASES:
        return True

    # basic length guard
    if len(term) < 2:
        return False

    # If it's a bigram, filter obvious “combo” nonsense:
    # - Two unrelated “tool words” glued together
    if len(tokens) == 2:
        a, b = tokens

        # avoid bigrams with extremely generic tokens
        if a in GENERIC_TOKENS and b in GENERIC_TOKENS:
            return False

        # avoid bigrams that contain "sql" combined with something else
        # (we want "sql" as its own skill)
        if a == "sql" and b != "server":
            return False
        if b == "sql" and a != "server":
            return False

    return True


def top_keywords(vectorizer: TfidfVectorizer, tfidf_row, top_n: int) -> List[str]:
    """
    Return top_n terms by TF-IDF weight from one document vector.
    Filters terms through looks_like_skill().
    """
    feature_names = vectorizer.get_feature_names_out()
    scores = tfidf_row.toarray().flatten()
    idx_sorted = scores.argsort()[::-1]

    keywords: List[str] = []
    for idx in idx_sorted:
        if scores[idx] <= 0:
            break

        term = feature_names[idx]

        if not looks_like_skill(term):
            continue

        keywords.append(term)

        if len(keywords) >= top_n:
            break

    return keywords


def prefer_phrases(terms: List[str]) -> List[str]:
    """
    If a phrase exists (e.g., 'spring boot'), remove its single-word components
    ('spring', 'boot') from the same list to avoid duplicates.
    """
    term_set = set(terms)
    singles_to_remove = set()

    for t in term_set:
        if " " in t:
            for w in t.split():
                if w in term_set:
                    singles_to_remove.add(w)

    cleaned = [t for t in term_set if t not in singles_to_remove]
    return sorted(cleaned)


def force_include_singletons(job_kw: List[str]) -> List[str]:
    """
    Make sure important single skills appear even if TF-IDF prefers phrases.
    Example: If 'docker kubernetes' shows up (we ban it), we still want 'docker'
    and 'kubernetes' if they are present in the job text vocabulary.
    """
    singles = set()
    for term in job_kw:
        for token in term.split():
            # keep single tokens that look like legit skills
            if token not in BASIC_STOPWORDS and len(token) >= 2:
                singles.add(token)

    # add useful known tokens if they appear as part of phrases
    # (helps your demo: docker/kubernetes often appear)
    for must in ["docker", "kubernetes"]:
        if must in singles:
            job_kw.append(must)

    # final cleanup
    job_kw = list(dict.fromkeys(job_kw))  # preserve order, remove duplicates
    return job_kw


def analyze(
    resume_text: str,
    job_text: str,
    top_n_job: int = 15,
    top_n_resume: int = 25
) -> Tuple[float, List[str], List[str]]:
    """
    Returns:
      score: 0-100 cosine similarity between resume and job TF-IDF vectors
      matched: job keywords that also appear in resume keywords
      missing: job keywords that do not appear in resume keywords
    """
    resume_clean = preprocess(resume_text)
    job_clean = preprocess(job_text)

    vectorizer = TfidfVectorizer(
        stop_words=list(BASIC_STOPWORDS),
        ngram_range=(1, 2)
    )

    tfidf = vectorizer.fit_transform([resume_clean, job_clean])

    sim = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]  # 0..1
    score = round(sim * 100.0, 2)

    resume_kw = set(top_keywords(vectorizer, tfidf[0], top_n_resume))
    job_kw = top_keywords(vectorizer, tfidf[1], top_n_job)

    # ensure key singletons can show up
    job_kw = force_include_singletons(job_kw)

    matched = [k for k in job_kw if k in resume_kw]
    missing = [k for k in job_kw if k not in resume_kw]

    matched = prefer_phrases(matched)
    missing = prefer_phrases(missing)

    # final pass: remove banned phrases if any slipped in
    matched = [t for t in matched if t not in BANNED_PHRASES]
    missing = [t for t in missing if t not in BANNED_PHRASES]

    return score, matched, missing
