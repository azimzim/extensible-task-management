import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
  Alert,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import type { Task } from "../types.ts/task";
import { changeStatus, closeTask } from "../api/taskApi";
import UserSelect from "./UserSelect";
import {
  STATUS_REQUIREMENTS,
  type StatusRequirement,
} from "../config/statusRequirements";

type Props = {
  task: Task;
  onUpdate: React.Dispatch<React.SetStateAction<Task[]>>;
};

type CustomFieldRow = {
  key: string; // selected requirement key
  value: string; // user input
};

export default function TaskCard({ task, onUpdate }: Props) {
  const [nextUserId, setNextUserId] = useState<number | "">("");

  const [customKey, setCustomKey] = useState("");
  const [customValue, setCustomValue] = useState("");

  const [error, setError] = useState<string | null>(null);
  const nextStatus = task.status + 1;
  const allRequirements: StatusRequirement[] = Object.values(
    STATUS_REQUIREMENTS[task.type] ?? {}
  ).flat();

  const [reverseStatus, setReverseStatus] = useState<number | "">("");

  const [customFields, setCustomFields] = useState<CustomFieldRow[]>([
    { key: "", value: "" },
  ]);
  const handleForward = async () => {
    setError(null);

    if (!nextUserId) {
      setError("Next assigned user is required");
      return;
    }

    try {
      const customData = Object.fromEntries(
        customFields
          .filter((row) => row.key && row.value.trim() !== "")
          .map((row) => [row.key, row.value])
      );

      const updated = await changeStatus(task.id, {
        newStatus: nextStatus,
        assignedUserId: nextUserId,
        customData,
      });

      onUpdate((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

      setCustomKey("");
      setCustomValue("");
      setNextUserId("");
    } catch (e: any) {
      setError(e.message || "Failed to advance task");
    }
  };

  const handleBackward = async () => {
    if (!reverseStatus) return;

    setError(null);

    try {
      const customData = Object.fromEntries(
        customFields
          .filter((row) => row.key && row.value.trim() !== "")
          .map((row) => [row.key, row.value])
      );

      const updated = await changeStatus(task.id, {
        newStatus: reverseStatus,
        assignedUserId: task.assignedUserId,
        customData,
      });

      onUpdate((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

      setReverseStatus("");
    } catch (e: any) {
      setError(e.message || "Failed to move task backward");
    }
  };

  const handleClose = async () => {
    setError(null);

    try {
      const updated = await closeTask(task.id);
      onUpdate((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e: any) {
      setError(e.message || "Task cannot be closed");
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          Task #{task.id} ({task.type})
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Status: {task.status}</Typography>

          <Chip
            label={task.isClosed ? "Closed" : "Open"}
            color={task.isClosed ? "default" : "success"}
            size="small"
          />
        </Stack>

        {!task.isClosed && (
          <>
            <Divider sx={{ my: 2 }} />

            {/* Error area */}
            {error && <Alert severity="error">{error}</Alert>}

            <Stack spacing={2} mt={2}>
              {/* Next user */}
              <Box sx={{ maxWidth: 220 }}>
                <UserSelect
                  label="Next Assigned User"
                  value={nextUserId}
                  onChange={setNextUserId}
                />
              </Box>

              {/* Custom data */}
              {allRequirements && (
                <Stack spacing={2}>
                  {customFields.map((row, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      {/* Field selector */}
                      <TextField
                        select
                        label="Custom Field"
                        value={row.key}
                        onChange={(e) =>
                          setCustomFields((prev) =>
                            prev.map((r, i) =>
                              i === index ? { ...r, key: e.target.value } : r
                            )
                          )
                        }
                        sx={{ width: 220 }}
                      >
                        {allRequirements.map((req) => (
                          <MenuItem key={req.key} value={req.key}>
                            {req.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* Value input */}
                      <TextField
                        label="Value"
                        value={row.value}
                        onChange={(e) =>
                          setCustomFields((prev) =>
                            prev.map((r, i) =>
                              i === index ? { ...r, value: e.target.value } : r
                            )
                          )
                        }
                        sx={{ flex: 1 }}
                      />
                    </Stack>
                  ))}

                  {/* Add new row */}
                  <Button
                    variant="text"
                    onClick={() =>
                      setCustomFields((prev) => [
                        ...prev,
                        { key: "", value: "" },
                      ])
                    }
                  >
                    Add Custom Field
                  </Button>
                </Stack>
              )}

              {/* Actions */}
              <Stack direction="row" spacing={1} alignItems="center">
                {/* Left */}
                <Button variant="outlined" onClick={handleForward}>
                  Advance
                </Button>

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Center */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ minWidth: 90 }}>
                    REVERSE TO
                  </Typography>

                  <TextField
                    select
                    size="small"
                    value={reverseStatus}
                    onChange={(e) => setReverseStatus(Number(e.target.value))}
                    sx={{ width: 100 }}
                  >
                    {Array.from({ length: task.status - 1 }).map((_, i) => {
                      const s = task.status - 1 - i;
                      return (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      );
                    })}
                  </TextField>

                  <Button
                    variant="text"
                    disabled={!reverseStatus}
                    onClick={handleBackward}
                  >
                    Apply
                  </Button>
                </Stack>

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Right */}
                <Button color="error" variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </Stack>

              <Divider />
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}
