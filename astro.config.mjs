// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import { imageService } from '@unpic/astro/service';

import db from '@astrojs/db';

const isNetlify = process.env.NETLIFY;

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  output: 'static',
  adapter: netlify(),
  site: process.env.URL || process.env.DEPLOY_URL || 'http://localhost:4321',
  image: {
    service: imageService({
      fallbackService: isNetlify ? 'netlify' : 'astro',
    }),
  },
  integrations: [mdx(), sitemap(), db(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
