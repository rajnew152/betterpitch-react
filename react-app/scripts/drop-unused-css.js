/* PostCSS plugin (production builds): drops rules of one stylesheet whose
   classes are never used by this page.

   tailwind.css is the reference site's whole compiled stylesheet, and more
   than half of it styles pages/components that are not on this page. A rule
   is kept when at least one of its selectors can match: every class it
   requires appears as a token somewhere in the markup or in the behaviour
   scripts (which also covers the classes those scripts add at runtime).
   Classes inside :not(...) are not required; class-less selectors (html,
   [type=button], ::selection, …) are always kept. */
import fs from 'node:fs';
import path from 'node:path';

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);

export default function dropUnusedCss({ file, sources }) {
  let tokens = null;
  const loadTokens = () => {
    tokens = new Set();
    for (const src of sources) {
      const files = fs.statSync(src).isDirectory() ? walk(src).filter((f) => /\.(jsx?|html)$/.test(f)) : [src];
      for (const f of files) for (const t of fs.readFileSync(f, 'utf8').split(/[\s"'`<>{}]+/)) tokens.add(t);
    }
  };
  const unescape = (s) => s.replace(/\\(.)/g, '$1');
  const stripNot = (sel) => { let prev; do { prev = sel; sel = sel.replace(/:not\([^()]*\)/g, ''); } while (sel !== prev); return sel; };
  const canMatch = (sel) => [...stripNot(sel).matchAll(/\.((?:\\.|[\w-])+)/g)].every((m) => tokens.has(unescape(m[1])));

  return {
    postcssPlugin: 'drop-unused-css',
    OnceExit(root) {
      if (path.resolve(root.source?.input.file || '') !== path.resolve(file)) return;
      loadTokens();
      root.walkRules((rule) => {
        if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
        if (!rule.selectors.some(canMatch)) rule.remove();
      });
      /* at-rules left empty (@media, @supports, @layer …) */
      let removed;
      do {
        removed = false;
        root.walkAtRules((at) => { if (at.nodes && at.nodes.length === 0) { at.remove(); removed = true; } });
      } while (removed);
    },
  };
}
dropUnusedCss.postcss = true;
