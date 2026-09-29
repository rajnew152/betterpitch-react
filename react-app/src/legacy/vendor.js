/* GSAP 3.15 + ScrollTrigger from npm (same version as the static site's
   js/vendor/ copies), exposed as the globals the behaviour scripts expect. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

/* Performance: drop redundant ScrollTrigger.refresh() calls.
   During start-up several scripts ask for a full refresh at the same moment
   (three fonts.ready callbacks, two rAF callbacks, and main.js's "load"
   listener right after ScrollTrigger's own load refresh). Each one re-measures
   every pinned scene (hundreds of ms of forced layout on a phone).
   A refresh is skipped only when it would recompute exactly the same thing:
   another refresh finished earlier in the same task, the viewport size is
   unchanged, and not a single DOM mutation happened since (MutationObserver).
   The observer is attached only for the rest of that task. */
(function coalesceRefreshes() {
  const refresh = ScrollTrigger.refresh;
  const mo = new MutationObserver(() => {});
  let armed = false, vw = 0, vh = 0;
  function onRefreshed() {
    // "refresh" is dispatched last and this listener is kept after the page's
    // own "refresh" listeners: the DOM is now the settled result of the refresh
    mo.takeRecords();
    vw = window.innerWidth; vh = window.innerHeight;
    if (armed) return;
    armed = true;
    mo.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
    setTimeout(() => { armed = false; mo.disconnect(); }, 0);
  }
  function keepLast() {
    ScrollTrigger.removeEventListener('refresh', onRefreshed);
    ScrollTrigger.addEventListener('refresh', onRefreshed);
  }
  keepLast();
  window.addEventListener('load', keepLast, { capture: true, once: true }); // before ScrollTrigger's own load refresh
  ScrollTrigger.refresh = function () {
    if (armed && window.innerWidth === vw && window.innerHeight === vh && !mo.takeRecords().length) return;
    keepLast();
    return refresh.apply(this, arguments);
  };
})();
