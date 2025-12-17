import { useEffect, useState } from "react";
import { getTasksByUser } from "../api/taskApi";
import type { Task } from "../types.ts/task";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const userId = 1; // hardcoded for assignment
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasksByUser(userId)
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"));
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>My Tasks</h2>
      <TaskList tasks={tasks} onUpdate={setTasks} />
    </div>
  );
}
