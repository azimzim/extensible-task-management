import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from '../domain/task/Task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'task_management',
  synchronize: true, 
  entities: [Task],
});
