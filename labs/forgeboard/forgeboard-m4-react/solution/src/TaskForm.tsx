import { useState } from "react";

export interface TaskFormProps {
  initialTitle?: string;
  errorMessage?: string | null;
  onSubmitTitle?: (title: string) => void;
}

export function TaskForm({ initialTitle = "", errorMessage = null, onSubmitTitle }: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const invalid = Boolean(errorMessage);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitTitle?.(title);
      }}
      noValidate
    >
      <label htmlFor="task-title">Task title</label>
      <input
        id="task-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-invalid={invalid ? "true" : "false"}
        aria-describedby={invalid ? "title-error" : undefined}
      />
      {errorMessage ? (
        <p id="title-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <button type="submit">Save task</button>
    </form>
  );
}
