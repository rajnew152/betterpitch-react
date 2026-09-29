import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dropUnusedCss from './scripts/drop-unused-css.js';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig(({ command }) => ({
  /* relative URLs, so dist/ works from any path (like the static site) */
  base: './',
  plugins: [react()],
  css: {
    postcss: {
      /* production: drop the rules of tailwind.css that nothing on the page uses */
      plugins: command === 'build'
        ? [dropUnusedCss({ file: here('src/styles/tailwind.css'), sources: [here('index.html'), here('src')] })]
        : [],
    },
  },
  experimental: {
    /* Assets imported from JS are referenced as "./assets/…" (relative to the
       page, which sits at the root of dist/) in both the client bundle and the
       prerendered HTML (scripts/prerender.js), so hydration sees identical
       src/href strings. CSS keeps Vite's default file-relative URLs. */
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') return './' + filename;
      return { relative: true };
    },
  },
}));
