import { env } from "@/infra/env";
import { NextApiResponse, NextApiRequest } from "next";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  await migrationRunner({
    databaseUrl: env.DATABASE_URL,
    dir: join("src", "infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    dryRun: true,
  });

  response.status(200).json([]);
}
