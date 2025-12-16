import { TaskType } from './TaskType';
import { ProcurementTaskType } from './ProcurementTaskType';
import { DevelopmentTaskType } from './DevelopmentTaskType';

export const taskTypes: TaskType[] = [
  new ProcurementTaskType(),
  new DevelopmentTaskType(),
];

export function getTaskType(type: string): TaskType {
  const taskType = taskTypes.find(t => t.type === type);

  if (!taskType) {
    throw new Error(`Unknown task type: ${type}`);
  }

  return taskType;
}
