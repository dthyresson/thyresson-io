import fs from 'node:fs';
import { parse } from 'csv-parse';
import { db, Tracks } from 'astro:db';

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
    await db.insert(Tracks).values(records);
    console.log(`Successfully imported ${records.length} tracks`);
  } catch (error) {
    console.error('Error importing tracks:', error);
  }
}

importTracks();
