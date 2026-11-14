import 'dotenv/config';
import fs from 'node:fs';
import { parse } from 'csv-parse';
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.ASTRO_DB_REMOTE_URL ?? '',
  authToken: process.env.ASTRO_DB_APP_TOKEN,
});

async function importTracks() {
  const parser = fs.createReadStream('data/tracks2.tsv').pipe(
    parse({
      delimiter: '\t',
      columns: true,
      skip_empty_lines: true,
    })
  );

  const records = [];

  for await (const record of parser) {
    records.push({
      track_id: parseInt(record.track_id),
      name: record.name,
      artist: record.artist,
      album: record.album,
      genre: record.genre,
      duration: parseInt(record.duration),
      year: parseInt(record.year),
      date_added: new Date(record.date_added),
      play_count: record.play_count ? parseInt(record.play_count) : 0,
    });
  }

  try {
    await db.batch(
      records.map((record) => ({
        sql: 'INSERT INTO Tracks (track_id, name, artist, album, genre, duration, year, date_added, play_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        args: [
          record.track_id,
          record.name,
          record.artist,
          record.album,
          record.genre,
          record.duration,
          record.year,
          record.date_added.toISOString(),
          record.play_count,
        ],
      })),
      'write'
    );
    console.log(`Successfully imported ${records.length} tracks`);
  } catch (error) {
    console.error('Error importing tracks:', error);
  }
}

importTracks();
