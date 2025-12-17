import express from 'express';
import tasksRoutes from './routes/tasks.routes';
import cors from "cors";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);


app.use(express.json());

app.use('/tasks', tasksRoutes);



app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
