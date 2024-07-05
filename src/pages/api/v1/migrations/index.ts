import database from "@/infra/database";
import { env } from "@/infra/env";
import { NextApiResponse, NextApiRequest } from "next";
import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { join } from "node:path";
import { Client } from "pg";

export default async function migrations(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const allowedMethods = ["GET", "POST"];
  if (request.method && !allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  let dbClient: Client | null = null;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationOptions: RunnerOption = {
      dbClient,
      dir: join("src", "infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      verbose: true,
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: true,
      });

      return response.status(200).json(pendingMigrations);
    }

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}
