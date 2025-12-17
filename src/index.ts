import { TaskType } from "./domain/task/TaskTypes/TaskType";
import { ProcurementTaskType } from "./domain/task/TaskTypes/ProcurementTaskType";
import { DevelopmentTaskType } from "./domain/task/TaskTypes/DevelopmentTaskType";

export const taskTypes: TaskType[] = [
  new ProcurementTaskType(),
  new DevelopmentTaskType(),
];

export function getTaskType(type: string): TaskType {
  const taskType = taskTypes.find((t) => t.type === type);

  if (!taskType) {
    throw new Error(`Unknown task type: ${type}`);
  }

  return taskType;
}
