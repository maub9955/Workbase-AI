import { Queue, Worker } from "bullmq";

const connection = { url: process.env.REDIS_URL ?? "redis://localhost:6379" };

const exampleQueue = new Queue("example", { connection });

new Worker(
  "example",
  async (job) => {
    console.log(`Processing job ${job.id}`, job.data);
  },
  { connection }
);

await exampleQueue.add("hello", { message: "Worker service ready" });

console.log("Worker service bootstrapped");
