import { useState } from "react";
import { createTask } from "../api/taskApi";
import type { Task } from "../types.ts/task";
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import UserSelect from "./UserSelect";

export default function CreateTaskForm({
  onCreated,
}: {
  onCreated: (task: Task) => void;
}) {
  const [type, setType] = useState("development");
  const [assignedUserId, setAssignedUserId] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    try {
      if (!assignedUserId) {
        alert("Please select assigned user");
        return;
      }
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
    <Card sx={{ width:420, maxWidth:"90%" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Create Task
        </Typography>

        <Stack spacing={2}>
          <TextField
            select
            label="Task Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="development">Development</MenuItem>
            <MenuItem value="procurement">Procurement</MenuItem>
          </TextField>

          <UserSelect value={assignedUserId} onChange={setAssignedUserId} />

          <Button variant="contained" onClick={submit}>
            Create
          </Button>

          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </CardContent>
    </Card>
  );
}
