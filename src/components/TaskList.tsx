// components/TasksList.tsx
import { Box } from "@mui/material";
import TaskCard from "./TaskCard";
import type { Task } from "../types.ts/task";


type Props = {
  tasks: Task[];
  onUpdate: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TasksList({ tasks, onUpdate }: Props) {
 

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        pr: 1,
      }}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={() => {}} />
      ))}
    </Box>
  );
}
