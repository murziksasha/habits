import type postgres from "postgres";

export interface TaskRow {
  id: number;
  project_id: number;
  title: string;
  status: string;
}

export class ForgeBoardRepo {
  constructor(private readonly sql: postgres.Sql) {}

  async createUser(email: string): Promise<number> {
    const rows = await this.sql<{ id: number }[]>`
      INSERT INTO users (email) VALUES (${email})
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id::int AS id
    `;
    return rows[0]!.id;
  }

  async createProject(ownerId: number, name: string): Promise<number> {
    void ownerId;
    void name;
    throw new Error("TODO: implement createProject");
  }

  async createTask(projectId: number, title: string, status = "todo"): Promise<TaskRow> {
    void projectId;
    void title;
    void status;
    throw new Error("TODO: implement createTask");
  }

  async listTasks(projectId: number, status?: string): Promise<TaskRow[]> {
    void projectId;
    void status;
    throw new Error("TODO: implement listTasks");
  }

  async moveTaskWithAudit(taskId: number, targetProjectId: number, actorId: number): Promise<void> {
    void taskId;
    void targetProjectId;
    void actorId;
    throw new Error("TODO: implement transactional moveTaskWithAudit");
  }
}
