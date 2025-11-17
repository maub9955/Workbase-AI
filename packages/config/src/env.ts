import { z } from "zod";

const baseSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().optional(),
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  STORAGE_ENDPOINT: z.string().optional(),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional()
});

export type Env = z.infer<typeof baseSchema>;

export const parseEnv = (env: NodeJS.ProcessEnv): Env => {
  const result = baseSchema.safeParse(env);

  if (!result.success) {
    throw new Error(`Invalid environment configuration: ${result.error.message}`);
  }

  return result.data;
};
