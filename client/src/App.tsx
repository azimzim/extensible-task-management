import { Box, CssBaseline } from "@mui/material";
import TasksPage from "./pages/TasksPage";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          position: "fixed",
          inset: 0, // top:0 right:0 bottom:0 left:0
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TasksPage />
      </Box>
    </>
  );
}
