// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import { imageService } from '@unpic/astro/service';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  output: 'static',
  compressHTML: true,
  session: false,
  adapter: netlify({
    devFeatures: {
      environmentVariables: false,
      images: true,
      edgeFunctions: false,
    },
  }),
  site: process.env.URL || process.env.DEPLOY_URL || 'http://localhost:4321',
  image: {
    service: imageService({
      placeholder: 'blurhash',
    }),
  },
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
