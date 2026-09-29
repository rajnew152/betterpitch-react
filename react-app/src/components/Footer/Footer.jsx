import './Footer.css';

/*
 * Appended section 3 (replicated from guillaumezhu.com): the closing
 * sentence written along a curve, whose final dot reveals the CTA card
 */
export default function Footer() {
  return (
    <section id="section-next" className="nx" aria-label="Contact">
      <div className="nx__pin-height">
        <div className="nx__container">
          <svg className="nx__svg" fill="none" width="3898" height="891" viewBox="0 0 3898 891" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="nxTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="80%" stopColor="#f6c177" />
                <stop offset="85%" stopColor="#9b7cff" />
                <stop offset="100%" stopColor="#ff6b4a" />
              </linearGradient>
            </defs>
            <path id="nxPath" d="M0.398438 611.016C175.398 377.517 857.398 -285.484 1461.4 139.638C1911.53 456.46 2114.4 805.516 2679.4 611.016C3088.4 470.219 3704.54 -33.3124 4354.9 781.516C4700.9 1215.02 5305.6 1466.52 6108.4 328.516" />
            <text className="nx__text">
              <textPath id="nxTextPath" href="#nxPath" textAnchor="start">
                <tspan id="nxTextCream">Ready when you are,</tspan>
                {" "}
                <tspan id="nxTextGradientPart" fill="url(#nxTextGradient)">let’s put your calls to work.</tspan>
              </textPath>
            </text>
            <circle id="nxOrb" className="nx__orb" cx="0" cy="0" r="14" fill="#ff6b4a" />
          </svg>
          <p className="nx__sr-text">Ready when you are, let’s put your calls to work.</p>
          <div className="nx-footer" aria-label="Footer">
            {/* CTA card revealed by the orb (js/next.js): copy on the left, an interactive */}
            {/* particle sphere with the "AI" mark at the right (js/footer-cta.js, */}
            {/* js/particle-sphere.js), same as the hero's voice visual */}
            <div id="section-footer" className="bp-cta">
              <div className="bp-cta__copy">
                <p className="bp-cta__text">
                  <strong>Build with Better Pitch</strong>{" "}
                  Put natural voice AI agents on every customer call. Better Pitch runs your campaigns, inbound routing and follow-ups in 30+ languages, so your team closes more, faster.
                </p>
                <a className="bp-cta__btn" href="#hero">
                  Try it now
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                {/* the site's headline numbers, footer links and the legal / social bar */}
                <ul className="bp-cta__stats" aria-label="Better Pitch at a glance">
                  <li><strong>2,000+</strong><span>businesses on Better Pitch</span></li>
                  <li><strong>100+</strong><span>languages &amp; dialects</span></li>
                  <li><strong>&lt;300ms</strong><span>reply latency</span></li>
                  <li><strong>2M+</strong><span>calls every month</span></li>
                </ul>
                <nav className="bp-cta__links" aria-label="Footer">
                  <div>
                    <p>Product</p>
                    <ul>
                      <li><a href="#features">Why Better Pitch</a></li>
                      <li><a href="#section-cinematic-project">Industries</a></li>
                      <li><a href="#roi-calculator">ROI Calculator</a></li>
                      <li><a href="#testimonials">Results</a></li>
                    </ul>
                  </div>
                  <div>
                    <p>Company</p>
                    <ul>
                      <li><a href="#hero">About</a></li>
                      <li><a href="#section-journey">Team</a></li>
                      <li><a href="#section-footer">Careers</a></li>
                      <li><a href="#section-footer">Press</a></li>
                    </ul>
                  </div>
                  <div>
                    <p>Resources</p>
                    <ul>
                      <li><a href="#section-faq">FAQs</a></li>
                      <li><a href="#section-faq">Blog</a></li>
                      <li><a href="#roi-calculator">Pricing</a></li>
                      <li><a href="#section-footer">Privacy Policy</a></li>
                    </ul>
                  </div>
                </nav>
                <div className="bp-cta__base">
                  <span>© 2026 Better Pitch</span>
                  <span className="bp-cta__trust">SOC 2 · GDPR · HIPAA ready</span>
                  <span className="bp-cta__social">
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.31h4.52V23H.24zM8.31 8.31h4.33v2h.06c.6-1.14 2.07-2.34 4.27-2.34 4.57 0 5.41 3.01 5.41 6.92V23h-4.52v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V23H8.31z" /></svg>
                    </a>
                    <a href="https://x.com/" target="_blank" rel="noopener" aria-label="X">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 1.2h3.7l-8.2 9.3 9.6 12.3h-7.5l-5.9-7.5-6.7 7.5H.2l8.7-9.9L-.3 1.2h7.7l5.3 6.8zm-1.3 19.5h2L6.4 3.3H4.2z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37a4 4 0 1 1-7.9 1.26 4 4 0 0 1 7.9-1.26z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    </a>
                  </span>
                </div>
              </div>
              <div className="bp-cta__globe" aria-hidden="true">
                <div className="bp-sphere-grid" />
                <canvas className="bp-cta__canvas bp-sphere-canvas" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
