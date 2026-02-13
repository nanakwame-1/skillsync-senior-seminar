from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from nlp import analyze as run_analysis

app = FastAPI(title="SkillSync AI Service", version="0.3.0")

class AnalyzeRequest(BaseModel):
    resumeText: str
    jobText: str

class AnalyzeResponse(BaseModel):
    score: float
    matchedSkills: List[str]
    missingSkills: List[str]

@app.get("/health")
def health():
    return {"status": "UP"}

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    score, matched, missing = run_analysis(req.resumeText, req.jobText)
    return {
        "score": score,
        "matchedSkills": matched,
        "missingSkills": missing
    }
