import { Box, Button, Divider } from "@mui/material";
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
        {/* Left column */}
        <Box
          sx={{
            width: "33.333%",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          {/* Top half – CREATE NEW TASK */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
            }}
          >
            <Box
              sx={{
                fontWeight: 600,
                mb: 2,
                letterSpacing: "0.5px",
              }}
            >
              CREATE NEW TASK
            </Box>

            <CreateTaskForm
              onCreated={(t) => setTasks((prev) => [t, ...prev])}
            />
          </Box>

          <Divider />

          {/* Bottom half – GET USER DETAILS */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
            }}
          >
            <Box
              sx={{
                fontWeight: 600,
                mb: 2,
                letterSpacing: "0.5px",
              }}
            >
              USER TASKS
            </Box>

            <UserTasksFilter
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              fetchUserTasks={fetchUserTasks}
            />
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => setTasks([])}
            >
              CLEAR
            </Button>
          </Box>
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
