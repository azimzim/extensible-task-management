import { AppDataSource } from './infra/db';
import app from './app';

const PORT = 3000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
