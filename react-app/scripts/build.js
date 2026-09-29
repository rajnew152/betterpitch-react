/* Production build (npm run build), shell-independent:
   1. client bundle            -> dist/
   2. server render entry      -> dist-ssr/ (temporary)
   3. prerender the page HTML into dist/index.html (scripts/prerender.js) */
import { build } from 'vite';

await build();
await build({ build: { ssr: 'src/entry-server.jsx', outDir: 'dist-ssr', emptyOutDir: true } });
await import('./prerender.js');
