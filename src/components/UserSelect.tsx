import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { USERS } from "../config/users";

interface Props {
  value: number | "";
  onChange: (userId: number) => void;
  label?: string;
}

export default function UserSelect({
  value,
  onChange,
  label = "Assigned User",
}: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {USERS.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
