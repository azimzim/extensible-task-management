import { changeStatus, closeTask } from "../api/taskApi";
import type { Task } from "../types.ts/task";

export default function TaskCard({
  task,
  onUpdate,
}: {
  task: Task;
  onUpdate: (updater: (prev: Task[]) => Task[]) => void;
}) {
  const forward = async () => {
    const updated = await changeStatus(task.id, {
      newStatus: task.status + 1,
      assignedUserId: task.assignedUserId,
      customData: {}, // לפי סטטוס/Type בהמשך
    });
    onUpdate((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const close = async () => {
    const updated = await closeTask(task.id);
    onUpdate((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: 8, padding: 8 }}>
      <div><b>Task #{task.id}</b></div>
      <div>Status: {task.status}</div>
      <div>Assigned: {task.assignedUserId}</div>
      {!task.isClosed && (
        <>
          <button onClick={forward}>Forward</button>{" "}
          <button onClick={close}>Close</button>
        </>
      )}
    </div>
  );
}
