import { createClient, type Client } from '@libsql/client';

let client: Client | undefined;

export function getDb(): Client {
  if (!client) {
    const url = process.env.ASTRO_DB_REMOTE_URL;

    if (!url) {
      throw new Error('ASTRO_DB_REMOTE_URL is not set');
    }

    client = createClient({
      url,
      authToken: process.env.ASTRO_DB_APP_TOKEN,
    });
  }

  return client;
}
