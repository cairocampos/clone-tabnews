import database from "@/infra/database";
import { env } from "@/infra/env";
import { NextApiResponse, NextApiRequest } from "next";
import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method && !["GET", "POST"].includes(request.method)) {
    response.status(405).send(null);
  }

  const dbClient = await database.getNewClient();
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
    await dbClient.end();

    return response.status(200).json(pendingMigrations);
  }

  const migratedMigrations = await migrationRunner({
    ...defaultMigrationOptions,
    dryRun: false,
  });

  await dbClient.end();

  if (migratedMigrations.length > 0) {
    return response.status(201).json(migratedMigrations);
  }

  return response.status(200).json(migratedMigrations);
}
