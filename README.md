# skillsync-senior-seminar

# SkillSync — AI Resume/Job Matching Web Application (CSCI 411/412)

SkillSync is a backend-driven web application that accepts resume text and job description text, sends them to an AI analysis service, computes a match score + matched/missing skills, and stores results for later retrieval.

**Stack:** Java (Spring Boot) + Python (FastAPI) + PostgreSQL (SQL)  
**Demo tools:** Swagger UI / Postman / curl

---

## Repository Structure

- `backend-java/` — Spring Boot API (main backend)
- `ai-python/` — FastAPI AI service (text scoring + skills extraction)
- `database/` — SQL schema + notes
- `docs/` — project documentation (architecture, API spec, DB schema)

---

## Services and Ports

- Spring Boot backend: `http://localhost:8080`
- FastAPI AI service: `http://localhost:8000`
- PostgreSQL: (Week 1 schema only; DB integration starts later)

---

## Prerequisites

- Java 17+
- Python 3.10+
- (Optional later) Docker + PostgreSQL

---

## Run the Python AI Service (FastAPI)

```bash
cd ai-python
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

