import { Router } from "express";
import { AppDataSource } from "../infra/db";
import { Task } from "../domain/task/Task.entity";
import { TaskService } from "../domain/task/TaskService";
import { getTaskType } from "..";

const router = Router();

// Repository is responsible only for DB access
const taskRepository = AppDataSource.getRepository(Task);

// Domain service contains business rules
const taskService = new TaskService();

/**
 * Create a new task
 * Initial status is always 1
 */
router.post("/", async (req, res) => {
  try {
    const { type, assignedUserId } = req.body;

    if (!type || !assignedUserId) {
      return res
        .status(400)
        .json({ error: "type and assignedUserId are required" });
    }

    const task = taskRepository.create({
      type,
      status: 1,
      assignedUserId,
      isClosed: false,
      customData: {},
    });

    await taskRepository.save(task);

    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Change task status (forward / backward)
 * Applies domain validation before saving
 */
router.post("/:id/change-status", async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    // Load task from DB
    const task = await taskRepository.findOneBy({ id: taskId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const { newStatus, customData, assignedUserId } = req.body;

    // ---- Basic route-level validation ----
    if (
      typeof customData !== "object" || customData === null ||    Array.isArray(customData)  ) {
      return res.status(400).json({ error: "customData must be a valid object" });
    }

    // ---- Domain validation (business rules) ----
    taskService.validateStatusChange(
      task,
      newStatus,
      customData,
      assignedUserId
    );

    // ---- Build customData according to target status ----
    const requiredFields = getTaskType(task.type).getRequiredFieldsForStatus( newStatus );
   
    // Only keep required fields in customData (others are discarded)
    const nextCustomData: Record<string, any> = {};
    for (const field of requiredFields) {
      if (customData && field in customData) {
        nextCustomData[field] = customData[field];
      }
    }

    // ---- Apply state ----
    task.status = newStatus;
    task.customData = nextCustomData;
    task.assignedUserId = assignedUserId;

    // Persist updated task
    await taskRepository.save(task);
    // Always return DB state (source of truth)
    const updatedTask = await taskRepository.findOneBy({ id: task.id });
    return res.json(updatedTask);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Get all tasks assigned to a specific user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const tasks = await taskRepository.findBy({
      assignedUserId: userId,
    });

    res.json(tasks);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Close a task
 * Task can be closed only at its final status
 */
router.post("/:id/close", async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const task = await taskRepository.findOneBy({ id: taskId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    taskService.closeTask(task);

    await taskRepository.save(task);

    res.json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
