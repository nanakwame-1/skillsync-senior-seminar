import re
from typing import List, Tuple, Set, Iterable
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


def _skill_label(skill: str) -> str:
    """Human-friendly label for suggestion text."""
    special = {
        "c++": "C++",
        "c#": "C#",
        "node.js": "Node.js",
        "rest api": "REST APIs",
        "sql": "SQL",
        "html": "HTML",
        "css": "CSS",
        "javascript": "JavaScript",
        "typescript": "TypeScript",
    }
    if skill in special:
        return special[skill]
    return skill.title()


def _dedupe_preserve_order(items: Iterable[str]) -> List[str]:
    seen: Set[str] = set()
    out: List[str] = []
    for x in items:
        if x and x not in seen:
            seen.add(x)
            out.append(x)
    return out


def build_resume_suggestions(
    score: float,
    matched: List[str],
    missing: List[str],
    resume_text: str,
    job_text: str,
) -> List[str]:
    """
    Actionable, honest resume tips derived from overlap and gaps.
    """
    suggestions: List[str] = []

    for skill in missing[:5]:
        label = _skill_label(skill)
        suggestions.append(
            f"Surface {label} on your resume wherever it is accurate—a compact skills line, "
            f"a project, or a bullet under the closest role. Match the posting’s spelling so both "
            f"people and keyword filters recognize it."
        )

    if len(missing) > 5:
        rest = ", ".join(_skill_label(s) for s in missing[5:9])
        if rest:
            suggestions.append(
                f"The posting also emphasizes {rest}. You do not need every keyword; prioritize "
                f"terms you can speak to clearly in an interview."
            )

    if matched:
        shown = ", ".join(_skill_label(s) for s in matched[:4])
        suffix = "…" if len(matched) > 4 else ""
        suggestions.append(
            f"You already reflect {shown}{suffix}. Lead your summary or the top bullet of your "
            f"most relevant role with two of these strengths so they appear in the first screen."
        )

    if score < 45:
        suggestions.append(
            "Overall wording overlap is low. Re-read the job’s responsibilities and, where truthful, "
            "reuse the same verbs and tools you have actually used—without copying full sentences."
        )
    elif score < 65:
        suggestions.append(
            "You are partly aligned. Add one or two outcome bullets that name the posting’s priorities "
            "(e.g. reliability, scale, collaboration) using vocabulary from the description."
        )
    else:
        suggestions.append(
            "Fit looks solid on text overlap. Tighten redundancy: cut generic filler and replace it "
            "with one more concrete metric or stakeholder (who used what you built, and what changed)."
        )

    resume_word_count = len(preprocess(resume_text).split())
    job_word_count = len(preprocess(job_text).split())
    if resume_word_count < max(80, job_word_count // 4):
        suggestions.append(
            "Your resume is thin next to this posting. Add specific bullets: what you shipped, "
            "constraints you handled, and tools involved—each bullet can carry several useful terms."
        )

    if not missing and matched:
        suggestions.append(
            "Skill checklist lines up. Strengthen proof: add numbers (latency, users, revenue, team size) "
            "so your matched skills read as verified experience, not only keywords."
        )

    return _dedupe_preserve_order(suggestions)[:12]


def analyze(
    resume_text: str,
    job_text: str
) -> Tuple[float, List[str], List[str], List[str]]:
    """
    Returns:
      score: 0-100 cosine similarity between resume and job TF-IDF vectors
      matched: job skills also found in resume
      missing: job skills not found in resume
      suggestions: concrete resume edits to improve apparent fit
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

    suggestions = build_resume_suggestions(
        score, matched, missing, resume_text, job_text
    )

    return score, matched, missing, suggestions