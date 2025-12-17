import { Button, Stack } from "@mui/material";
import UserSelect from "../components/UserSelect";

interface Props {
  selectedUserId: number | "";
  setSelectedUserId: (id: number) => void;
  fetchUserTasks: () => void;
}

export default function UserTasksFilter({
  selectedUserId,
  setSelectedUserId,
  fetchUserTasks,
}: Props) {
  return (
    <Stack spacing={2} width={280}>
      <UserSelect
        label="User"
        value={selectedUserId}
        onChange={setSelectedUserId}
      />

      <Button
        variant="contained"
        disabled={!selectedUserId}
        onClick={fetchUserTasks}
      >
        Get All User Tasks
      </Button>
    </Stack>
  );
}
