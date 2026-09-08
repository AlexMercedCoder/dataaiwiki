import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dataaiwiki.com',
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = new Date();
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
