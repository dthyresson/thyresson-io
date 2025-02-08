// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  output: 'static',
  adapter: netlify(),
  site:
    process.env.URL ||
    process.env.DEPLOY_URL ||
    process.env.URL ||
    'http://localhost:4321',
  integrations: [mdx(), sitemap(), db()],
  vite: {
    plugins: [tailwindcss()],
  },
});