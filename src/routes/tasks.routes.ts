import { Router } from "express";
import { AppDataSource } from "../infra/db";
import { Task } from "../domain/task/Task.entity";
import { TaskService } from "../domain/task/TaskService";

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

    if (!assignedUserId) {
      throw new Error("Next assigned user is required");
    }

    // Domain validation (business rules)
    taskService.validateStatusChange(
      task,
      newStatus,
      customData,
      assignedUserId
    );

    // Apply state changes only after validation
    task.status = newStatus;
    task.customData = customData;
    task.assignedUserId = assignedUserId;

    // Persist updated task
    await taskRepository.save(task);

    res.json(task);
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
