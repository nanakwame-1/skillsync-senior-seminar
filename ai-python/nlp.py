import re
from typing import List, Tuple, Set
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

BASIC_STOPWORDS: Set[str] = {
    "the", "and", "a", "an", "to", "of", "in", "for", "on", "with", "is", "are",
    "was", "were", "be", "as", "at", "by", "or", "that", "this", "it", "from",
    "but", "not", "you", "we", "our", "your", "their", "they", "i", "me", "my",
    "us", "seeking", "experience", "role", "position", "looking", "plus", "developer"
}

KNOWN_SKILLS: List[str] = [
    "java",
    "python",
    "sql",
    "spring",
    "spring boot",
    "fastapi",
    "docker",
    "kubernetes",
    "rest api",
    "rest apis",
    "machine learning",
    "postgresql",
    "javascript",
    "typescript",
    "html",
    "css",
    "react",
    "flask",
    "git",
    "linux",
    "node.js",
    "c++",
    "c#"
]


def preprocess(text: str) -> str:
    """
    Normalize text:
    - lowercase
    - keep + # . -
    - remove other punctuation
    - collapse whitespace
    """
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s\+\#\.-]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def normalize_skill(skill: str) -> str:
    """
    Normalize skill labels for consistent output.
    """
    skill = preprocess(skill)

    aliases = {
        "rest apis": "rest api",
    }

    return aliases.get(skill, skill)


def extract_skills(text: str) -> List[str]:
    """
    Extract only real skills from a known vocabulary.
    Prefer longer phrases first, so 'spring boot' wins over 'spring'.
    """
    text_clean = preprocess(text)
    found: List[str] = []

    for skill in sorted(KNOWN_SKILLS, key=len, reverse=True):
        if skill in text_clean:
            normalized = normalize_skill(skill)
            if normalized not in found:
                found.append(normalized)

    # If a phrase exists, remove its single-word component where appropriate
    if "spring boot" in found and "spring" in found:
        found.remove("spring")

    return found


def analyze(
    resume_text: str,
    job_text: str
) -> Tuple[float, List[str], List[str]]:
    """
    Returns:
      score: 0-100 cosine similarity between resume and job TF-IDF vectors
      matched: job skills also found in resume
      missing: job skills not found in resume
    """
    resume_clean = preprocess(resume_text)
    job_clean = preprocess(job_text)

    vectorizer = TfidfVectorizer(
        stop_words=list(BASIC_STOPWORDS),
        ngram_range=(1, 2)
    )

    tfidf = vectorizer.fit_transform([resume_clean, job_clean])

    sim = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
    score = round(float(sim * 100.0), 2)

    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_text)

    matched = [skill for skill in job_skills if skill in resume_skills]
    missing = [skill for skill in job_skills if skill not in resume_skills]

    return score, matched, missing