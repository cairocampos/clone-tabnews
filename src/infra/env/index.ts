import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
  POSTGRES_CA: z.string().optional(),
});

export const env = envSchema.parse(process.env);
