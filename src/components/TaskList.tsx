import type { Task } from "../types.ts/task";
import TaskCard from "./TaskCard";


export default function TaskList({
  tasks,
  onUpdate,
}: {
  tasks: Task[];
  onUpdate: (updater: (prev: Task[]) => Task[]) => void;
}) {
  return (
    <>
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onUpdate={onUpdate} />
      ))}
    </>
  );
}
