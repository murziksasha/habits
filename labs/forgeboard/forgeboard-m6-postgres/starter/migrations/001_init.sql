-- TODO: Create users, projects, tasks (CHECK constraints, FK CASCADE, composite index on (project_id, status)), and audit_logs tables
CREATE TABLE IF NOT EXISTS users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE
);
