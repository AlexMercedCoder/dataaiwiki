import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { existsSync, readFileSync } from 'node:fs';

// Real <lastmod> per URL path, written by scripts/normalize-wiki.mjs from the
// wiki's git history. URLs with no known date get no <lastmod>.
const LASTMOD_FILE = new URL('./src/data/wiki-lastmod.json', import.meta.url);
const lastmodByPath = existsSync(LASTMOD_FILE) ? JSON.parse(readFileSync(LASTMOD_FILE, 'utf8')) : {};

// https://astro.build/config
export default defineConfig({
  site: 'https://dataaiwiki.com',
  integrations: [
    sitemap({
      serialize(item) {
        const day = lastmodByPath[new URL(item.url).pathname];
        if (day) item.lastmod = day;
        else delete item.lastmod;
        return item;
      },
    }),
  ],
  vite: {
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js']
      }
    }
  }
});
