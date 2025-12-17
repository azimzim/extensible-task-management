import type { Task } from "../types.ts/task";
const BASE = "http://localhost:3000/tasks";

export async function createTask(payload: {
  type: string;
  assignedUserId: number;
}): Promise<Task> {
  const res = await fetch(`${BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("create failed");
  return res.json();
}

export async function getTasksByUser(userId: number): Promise<Task[]> {
  const res = await fetch(`${BASE}/user/${userId}`);
  if (!res.ok) throw new Error("fetch failed");
  return res.json();
}

export async function changeStatus(
  taskId: number,
  payload: {
    newStatus: number;
    assignedUserId: number;
    customData: Record<string, any>;
  }
): Promise<Task> {
  const res = await fetch(`${BASE}/${taskId}/change-status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("change failed");
  return res.json();
}

export async function closeTask(taskId: number): Promise<Task> {
  const res = await fetch(`${BASE}/${taskId}/close`, { method: "POST" });
  if (!res.ok) throw new Error("close failed");
  return res.json();
}
