import { Box } from "@mui/material";
import Header from "../components/Header";

import TasksList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskFrom";
import type { Task } from "../types.ts/task";
import { useState } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header – יכול להיות ממורכז */}
      <Box sx={{ py: 2, textAlign: "center" }}>
        <Header />
      </Box>

      {/* Body – תמיד על כל המסך */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          width: "100%",
        }}
      >
      
        <Box
          sx={{
            width: "33.333%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid #eee", // רק לבדיקה
          }}
        >
          <CreateTaskForm
            onCreated={(t) => setTasks((prev) => [t, ...prev])}
          />
        </Box>

        
        <Box
          sx={{
            width: "80%",
            overflowY: "auto",
            px: 3,
          }}
        >
          <TasksList tasks={tasks} onUpdate={setTasks} />
        </Box>
      </Box>
    </Box>
  );
}