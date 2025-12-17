import { useState } from "react";
import { changeStatus, closeTask } from "../api/taskApi";
import type { Task } from "../types.ts/task";
import {
  Card,
  CardContent,
  Typography,
  Button,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { USERS } from "../config/users";
import { STATUS_REQUIREMENTS } from "../config/statusRequirements";

export default function TaskCard({ task, onUpdate }: {
  task: Task;
  onUpdate: (updater: (prev: Task[]) => Task[]) => void;
}) {
  const [nextUserId, setNextUserId] = useState<number | "">("");
  const [customValue, setCustomValue] = useState("");

  const nextStatus = task.status + 1;
  const requirement =
    STATUS_REQUIREMENTS[task.type]?.[nextStatus];

  const forward = async () => {
    if (!nextUserId) {
      alert("Please select next assigned user");
      return;
    }

    if (requirement && !customValue.trim()) {
      alert(`Please provide: ${requirement.label}`);
      return;
    }

    const updated = await changeStatus(task.id, {
      newStatus: nextStatus,
      assignedUserId: nextUserId,
      customData: requirement
        ? { value: customValue }
        : {},
    });

    onUpdate((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );

    setNextUserId("");
    setCustomValue("");
  };

  const close = async () => {
    const updated = await closeTask(task.id);
    onUpdate((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const assignedUserName =
    USERS.find((u) => u.id === task.assignedUserId)?.name ??
    `User ${task.assignedUserId}`;
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          Task #{task.id}
        </Typography>

        <Typography>Type: {task.type}</Typography>
        <Typography>Status: {task.status}</Typography>
        <Typography>Assigned User: {assignedUserName}</Typography>

        {!task.isClosed && (
          <Stack spacing={2} mt={2}>
            <TextField
              select
              label="Next Assigned User"
              value={nextUserId}
              onChange={(e) => setNextUserId(Number(e.target.value))}
              fullWidth
            >
              {USERS.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>

            {requirement && (
              <TextField
                label={requirement.label}
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                fullWidth
              />
            )}

            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={forward}>
                Forward to status {nextStatus}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={close}
              >
                Close
              </Button>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
