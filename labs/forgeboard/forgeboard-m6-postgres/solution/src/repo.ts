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
    const rows = await this.sql<{ id: number }[]>`
      INSERT INTO projects (owner_id, name) VALUES (${ownerId}, ${name})
      RETURNING id::int AS id
    `;
    return rows[0]!.id;
  }

  async createTask(projectId: number, title: string, status = "todo"): Promise<TaskRow> {
    const rows = await this.sql<TaskRow[]>`
      INSERT INTO tasks (project_id, title, status)
      VALUES (${projectId}, ${title}, ${status})
      RETURNING id::int AS id, project_id::int AS project_id, title, status
    `;
    return rows[0]!;
  }

  async listTasks(projectId: number, status?: string): Promise<TaskRow[]> {
    if (status) {
      return this.sql<TaskRow[]>`
        SELECT id::int AS id, project_id::int AS project_id, title, status
        FROM tasks
        WHERE project_id = ${projectId} AND status = ${status}
        ORDER BY id ASC
      `;
    }
    return this.sql<TaskRow[]>`
      SELECT id::int AS id, project_id::int AS project_id, title, status
      FROM tasks
      WHERE project_id = ${projectId}
      ORDER BY id ASC
    `;
  }

  async moveTaskWithAudit(taskId: number, targetProjectId: number, actorId: number): Promise<void> {
    await this.sql.begin(async (tx) => {
      const db = tx as unknown as postgres.Sql;
      await db`
        INSERT INTO audit_logs (task_id, actor_id, action)
        VALUES (${taskId}, ${actorId}, ${`move:${targetProjectId}`})
      `;
      await db`
        UPDATE tasks SET project_id = ${targetProjectId} WHERE id = ${taskId}
      `;
    });
  }
}
