import { Client } from "pg";
import { env } from "./env";

async function query(queryObject: any) {
  const client = await getNewClient();
  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    database: env.POSTGRES_DB,
    password: env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};

function getSSLValues() {
  if (env.POSTGRES_CA) {
    return {
      ca: env.POSTGRES_CA,
    };
  }

  return env.NODE_ENV === "production" ? true : false;
}
