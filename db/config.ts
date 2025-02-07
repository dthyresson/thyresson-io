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

export default defineDb({
  tables: { Music }
});
