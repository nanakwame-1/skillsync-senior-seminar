# SkillSync Database Schema (PostgreSQL)

## Overview
SkillSync stores:
1) the raw resume/job text submitted for analysis
2) the AI-generated results (score + matched/missing skills)
3) optional user identity (email) to support per-user history

## Tables

### 1) users
**Purpose:** Identify who submitted analyses (auth not required for MVP).

Columns:
- `id` (PK)
- `email` (unique)
- `created_at`

### 2) documents
**Purpose:** Store the raw inputs used in each analysis.

Columns:
- `id` (PK)
- `user_id` (FK → users.id, nullable)
- `resume_text` (TEXT)
- `job_text` (TEXT)
- `created_at`

Relationship:
- One user → many documents
- User is optional for MVP (so `user_id` can be NULL)

### 3) match_results
**Purpose:** Store AI outputs for a given document submission.

Columns:
- `id` (PK)
- `document_id` (FK → documents.id)
- `match_score` (DOUBLE PRECISION)
- `matched_skills` (TEXT)
- `missing_skills` (TEXT)
- `created_at`

Relationship:
- One document → one match_result (for MVP)
  - (You can support multiple results per document later, but not needed now.)

## Notes on skills storage
For MVP, `matched_skills` and `missing_skills` are stored as TEXT.
- Easiest to implement and demo
- Can store comma-separated values or JSON strings

Optional improvement:
- Use PostgreSQL JSONB for structured querying once core features are done.
