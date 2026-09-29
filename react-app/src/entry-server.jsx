import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/* Build-time prerender (scripts/prerender.js): the page's HTML is shipped in
   index.html so it paints before any JavaScript runs, then hydrated. */
export function render() {
  return renderToString(<App />);
}
