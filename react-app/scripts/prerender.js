/* Build step 3/3: render <App /> to HTML (from the SSR build in dist-ssr/)
   and put it inside dist/index.html's #root, so the page's markup is in the
   document itself — as on the static site — and React hydrates it. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ssrDir = path.join(root, 'dist-ssr');
const indexFile = path.join(root, 'dist', 'index.html');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
/* React adds <link rel="preload" as="image"> hints for eager <img>s ahead of
   the markup; they are not part of the component tree and the static site
   never had them, so they are dropped. */
const appHtml = render().replace(/^(?:<link rel="preload" as="image"[^>]*\/>)+/, '');

const MARK = '<div id="root" style="display:contents"></div>';
const html = fs.readFileSync(indexFile, 'utf8');
if (!html.includes(MARK)) throw new Error('prerender: #root placeholder not found in dist/index.html');
fs.writeFileSync(indexFile, html.replace(MARK, () => `<div id="root" style="display:contents">${appHtml}</div>`));
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: ${(appHtml.length / 1024).toFixed(0)} kB of markup written to dist/index.html`);
