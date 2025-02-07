import { db, Music } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Music).values([
    {
      format: 'LP',
      artist: 'New Order',
      title: 'Power, Corruption & Lies',
      release_year: 1983,
    },
    {
      format: 'LP',
      artist: 'New Order',
      title: 'Low-Life',
      release_year: 1985,
    },
    {
      format: 'LP',
      artist: 'New Order',
      title: 'Brotherhood',
      release_year: 1986,
    },
    {
      format: 'LP',
      artist: 'New Order',
      title: 'Substance',
      release_year: 1987,
    },
    {
      format: 'LP',
      artist: 'New Order',
      title: 'Technique',
      release_year: 1989,
    },
  ]);
}
