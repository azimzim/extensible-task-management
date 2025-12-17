// components/Header.tsx
import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        MY TASKS
      </Typography>
      <Box
        sx={{
          mt: 1,
          height: "2px",
          width: "100%",
          bgcolor: "divider",
        }}
      />
    </Box>
  );
}
