import { useState } from "react";
import { createTask } from "../api/taskApi";
import type { Task } from "../types.ts/task";

export default function CreateTaskForm({
  onCreated,
}: {
  onCreated: (task: Task) => void;
}) {
  const [type, setType] = useState("development");
  const [assignedUserId, setAssignedUserId] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    try {
      const task = await createTask({
        type,
        assignedUserId,
      });
      onCreated(task);
      setError(null);
    } catch {
      setError("Failed to create task");
    }
  };

  return (
    <div style={{ border: "1px solid #aaa", padding: 8, marginBottom: 16 }}>
      <h4>Create Task</h4>

      <div>
        <label>Type: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="development">Development</option>
          <option value="procurement">Procurement</option>
        </select>
      </div>

      <div>
        <label>User ID: </label>
        <input
          type="number"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(Number(e.target.value))}
        />
      </div>

      <button onClick={submit}>Create</button>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
