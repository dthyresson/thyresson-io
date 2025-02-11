// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  output: 'static',
  adapter: netlify(),
  site: process.env.URL || process.env.DEPLOY_URL || 'http://localhost:4321',
  integrations: [mdx(), sitemap(), db(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
