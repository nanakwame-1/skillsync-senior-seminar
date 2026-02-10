-- SkillSync (PostgreSQL) schema v0.1
-- Keep it minimal and demo-friendly.

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NULL REFERENCES users(id) ON DELETE SET NULL,
  resume_text TEXT NOT NULL,
  job_text TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS match_results (
  id BIGSERIAL PRIMARY KEY,
  document_id BIGINT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  match_score DOUBLE PRECISION NOT NULL,
  matched_skills TEXT NOT NULL,
  missing_skills TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Helpful index for history queries
CREATE INDEX IF NOT EXISTS idx_documents_user_id_created_at
  ON documents (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_match_results_document_id_created_at
  ON match_results (document_id, created_at DESC);
