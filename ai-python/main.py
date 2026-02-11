import re
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(title="SkillSync AI Service", version="0.2.0")

class AnalyzeRequest(BaseModel):
    resumeText: str
    jobText: str

def preprocess(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

@app.get("/health")
def health():
    return {"status": "UP"}


@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    resume = preprocess(req.resumeText)
    job = preprocess(req.jobText)

    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform([resume, job])

    sim = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
    score = round(sim * 100, 2)

    return {"score": score, "matchedSkills": [], "missingSkills": []}
