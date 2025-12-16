import express from 'express';
import tasksRoutes from './routes/tasks.routes';

const app = express();
app.use(express.json());

app.use('/tasks', tasksRoutes);



app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
