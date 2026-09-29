import { createRoot, hydrateRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import App from './App.jsx';

/* Commit synchronously: the behaviour scripts imported after this module in
   main.jsx query the DOM as soon as they evaluate, exactly like the static
   site's end-of-body <script> tags did.
   Production builds ship the page prerendered in index.html (scripts/prerender.js),
   so React hydrates it; `vite dev` has an empty #root and renders on the client. */
const container = document.getElementById('root');
if (container.firstElementChild) {
  flushSync(() => { hydrateRoot(container, <App />); });
} else {
  const root = createRoot(container);
  flushSync(() => root.render(<App />));
}
