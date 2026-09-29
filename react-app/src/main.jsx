/* Stylesheets, in the static site's <link> order. */
import './styles/fonts.css';
import './styles/tailwind.css';
import './styles/site.css';
import './styles/journey-toolkit.css';
import './styles/journey-fluid.css';
import './styles/manifesto.css';
import './styles/marquee-fill.css';
import './styles/team.css';
import './styles/testimonials.css';
import './styles/card-flip.css';
import './styles/brand.css';
import './styles/card-demo.css';
import './styles/hero-palette.css';
import './styles/particle-sphere.css';
import './styles/palette.css';
import './styles/perf.css';
import './styles/mobile.css';

/* 1. Render the page (synchronously). */
import './render.jsx';

/* 2. Behaviour scripts, in the static site's <script> order. ES modules
      evaluate depth-first in import order, so these run after the render. */
import './legacy/vendor.js';
import './legacy/lib/motion.js';
import './legacy/theme.js';
import './legacy/preloader.js';
import './legacy/menu.js';
import './legacy/waveform.js';
import './legacy/particle-sphere.js';
import './legacy/voice.js';
import './legacy/hero.js';
import './legacy/features.js';
import './legacy/manifesto.js';
import './legacy/marquee-fill.js';
import './legacy/gallery.js';
import './legacy/wheel.js';
import './legacy/faq.js';
import './legacy/roi.js';
import './legacy/footer.js';
import './legacy/footer-cta.js';
import './legacy/globe-3d.js';
import './legacy/journey.js';
import './legacy/journey-fluid.js';
import './legacy/team.js';
import './legacy/toolkit.js';
import './legacy/testimonials.js';
import './legacy/card-flip.js';
import './legacy/next.js';
import './legacy/section-nav.js';
import './legacy/chat.js';
import './legacy/smooth-scroll.js';
import './legacy/main.js';
import './legacy/card-demo.js';
import './legacy/section-seams.js';
import './legacy/header-contrast.js';

/* Performance: large below-the-fold CSS backgrounds (journey visuals, footer
   globe map) are attached under html.bp-loaded, i.e. once the window has
   loaded, so they no longer hold the load event (and with it the preloader). */
if (document.readyState === 'complete') document.documentElement.classList.add('bp-loaded');
else window.addEventListener('load', () => document.documentElement.classList.add('bp-loaded'), { once: true });
