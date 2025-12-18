import { AppDataSource } from "../../infra/db";
import { Task } from "../../domain/task/Task.entity";

async function seed() {
  await AppDataSource.initialize();

  const taskRepo = AppDataSource.getRepository(Task);

  await taskRepo.save([
    // Task 1 – Procurement, status 1
    {
      type: "PROCUREMENT",
      status: 1,
      assignedUserId: 1,
      isClosed: false,
      customData: {},
    },

    // Task 2 – Procurement, status 2 (supplier offers received)
    {
      type: "PROCUREMENT",
      status: 2,
      assignedUserId: 2,
      isClosed: false,
      customData: {
        priceQuotes: [
          "Supplier A: 1200$",
          "Supplier B: 1150$",
        ],
      },
    },

    // Task 3 – Development, status 1
    {
      type: "DEVELOPMENT",
      status: 1,
      assignedUserId: 3,
      isClosed: false,
      customData: {},    },

    // Task 4 – Development, status 3 (development completed)
    {
      type: "DEVELOPMENT",
      status: 3,
      assignedUserId: 1,
      isClosed: false,
      customData: {
        branchName: "feature/task-workflow",
      },
    },
  ]);

  console.log("Seed completed");
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
