from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="SkillSync AI Service", version="0.1.0")

class AnalyzeRequest(BaseModel):
    resumeText: str
    jobText: str

@app.get("/health")
def health():
    return {"status": "UP"}

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    # Stub response for Week 1
    return {
        "score": 0.0,
        "matchedSkills": [],
        "missingSkills": []
    }
