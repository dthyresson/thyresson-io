import { defineDb, defineTable, column, sql } from 'astro:db';

// https://astro.build/db/config

const Music = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    created_at: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    format: column.text(),
    artist: column.text(),
    title: column.text(),
    release_year: column.number(),
  },
  indexes: [
    {
      on: ['artist'],
    },
    {
      on: ['format'],
    },
    {
      on: ['artist', 'title'],
      unique: true,
    },
  ],
});

const Tracks = defineTable({
  columns: {
    track_id: column.number({ primaryKey: true }),
    name: column.text({ optional: true }),
    artist: column.text({ optional: true }),
    album: column.text({ optional: true }),
    genre: column.text({ optional: true }),
    duration: column.number({ optional: true }),
    year: column.number({ optional: true }),
    date_added: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    play_count: column.number({ default: 0 }),
  },
  indexes: [
    {
      on: ['artist'],
    },
    {
      on: ['album'],
    },
    {
      on: ['artist', 'name'],
      unique: true,
    },
  ],
});

export default defineDb({
  tables: { Music, Tracks },
});
