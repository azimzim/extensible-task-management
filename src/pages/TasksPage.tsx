import { Box } from "@mui/material";
import Header from "../components/Header";

import TasksList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskFrom";
import type { Task } from "../types.ts/task";
import { useState } from "react";
import UserTasksFilter from "../components/UserTasksFilter";
import { getTasksByUser } from "../api/taskApi";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");

  const fetchUserTasks = async () => {
    if (!selectedUserId) return;
    const data = await getTasksByUser(selectedUserId);
    setTasks(data);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ py: 2, textAlign: "center" }}>
        <Header />
      </Box>

      {/* Body */}
      <Box
        sx={{
          flex: 1, // take remaining height
          display: "flex",
          minHeight: 0, // IMPORTANT: allow children to scroll
        }}
      >
        {/* Left column */}
        <Box
          sx={{
            width: "33.333%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        
          <CreateTaskForm onCreated={(t) => setTasks((prev) => [t, ...prev])} />
        </Box>

        {/* Right column – SCROLL HERE */}
        <Box
          sx={{
            width: "66.666%",
            overflowY: "auto", // enable vertical scroll
            minHeight: 0, // REQUIRED for flex children
            px: 3,
          }}
        >
          <TasksList tasks={tasks} onUpdate={setTasks} />
        </Box>
      </Box>
    </Box>
  );
}
