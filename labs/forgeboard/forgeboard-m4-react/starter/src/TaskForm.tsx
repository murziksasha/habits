import React from "react";

export interface TaskFormProps {
  initialTitle?: string;
  errorMessage?: string | null;
  onSubmitTitle?: (title: string) => void;
}

export function TaskForm({ initialTitle = "", errorMessage = null }: TaskFormProps) {
  // TODO: Render accessible <label htmlFor="task-title">, aria-invalid, aria-describedby="title-error", and role="alert" error
  return (
    <form>
      <input id="task-title" defaultValue={initialTitle} />
      {errorMessage ? <span>{errorMessage}</span> : null}
      <button type="submit">Save task</button>
    </form>
  );
}
