import { Task } from "./Task.entity";
import { getTaskType } from "../..";

export class TaskService {
  validateStatusChange(
    task: Task,
    newStatus: number,
    customData: Record<string, any>,
    assignedUserId: number
  ) {
    if (task.isClosed) {
      throw new Error("Task is closed");
    }

    if (!assignedUserId) {
      throw new Error("Next assigned user is required");
    }

    const taskType = getTaskType(task.type);

    if (!taskType.isValidStatus(newStatus)) {
      throw new Error("Invalid status");
    }

    // Forward – only +1
    if (newStatus > task.status && newStatus !== task.status + 1) {
      throw new Error("Forward status must be sequential");
    }

    // Required fields check
    const requiredFields = taskType.getRequiredFieldsForStatus(newStatus);

    for (const field of requiredFields) {
      if (!(field in customData)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }
  /**
   * Validate whether a task can be closed
   */
  closeTask(task: Task) {
    if (task.isClosed) {
      throw new Error("Task is already closed");
    }

    const taskType = getTaskType(task.type);
    const finalStatus = taskType.getFinalStatus();

    if (task.status !== finalStatus) {
      throw new Error("Task can only be closed at final status");
    }

    task.isClosed = true;
  }
}
