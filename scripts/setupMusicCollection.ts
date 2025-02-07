import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function setupMusicCollection() {
  try {
    // Create table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS music_collection (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        format TEXT NOT NULL CHECK(format IN ('CD', 'LP')),
        artist TEXT NOT NULL,
        title TEXT NOT NULL,
        release_year INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.execute(createTableQuery);
    console.log('✅ Table created');

    // Prepare New Order releases
    const releases = [
      {
        format: 'LP',
        title: 'Power, Corruption & Lies',
        release_year: 1983,
      },
      {
        format: 'LP',
        title: 'Low-Life',
        release_year: 1985,
      },
      {
        format: 'CD',
        title: 'Brotherhood',
        release_year: 1986,
      },
      {
        format: 'CD',
        title: 'Technique',
        release_year: 1989,
      },
      {
        format: 'LP',
        title: 'Republic',
        release_year: 1993,
      },
    ];

    // Upsert each release
    for (const release of releases) {
      const upsertQuery = `
        INSERT INTO music_collection (format, artist, title, release_year)
        VALUES (?, 'New Order', ?, ?);
      `;

      await client.execute({
        sql: upsertQuery,
        args: [release.format, release.title, release.release_year],
      });
    }

    console.log('✅ New Order releases added');

    // Verify the data
    const result = await client.execute({
      sql: "SELECT * FROM music_collection WHERE artist = 'New Order' ORDER BY release_year",
      args: [],
    });

    console.log('\nCurrent New Order collection:');
    console.table(result.rows);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

setupMusicCollection();
