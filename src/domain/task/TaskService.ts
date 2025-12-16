import { Task } from './Task.entity';
import { getTaskType } from './TaskTypes';

export class TaskService {
  validateStatusChange(
    task: Task,
    newStatus: number,
    customData: Record<string, any>
  ) {
    if (task.isClosed) {
      throw new Error('Task is closed');
    }

    const taskType = getTaskType(task.type);

    if (!taskType.isValidStatus(newStatus)) {
      throw new Error('Invalid status');
    }

    // Forward – only +1
    if (newStatus > task.status && newStatus !== task.status + 1) {
      throw new Error('Forward status must be sequential');
    }

    // Required fields check
    const requiredFields =
      taskType.getRequiredFieldsForStatus(newStatus);

    for (const field of requiredFields) {
      if (!(field in customData)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }
}
