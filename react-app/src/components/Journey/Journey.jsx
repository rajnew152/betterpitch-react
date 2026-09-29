import kunalJaggiWebp from '../../assets/team/kunal-jaggi.webp';
import priteshJaiswalWebp from '../../assets/team/pritesh-jaiswal.webp';
import srishtiKhatriWebp from '../../assets/team/srishti-khatri.webp';

/*
 * Appended sections replicated from https://guillaumezhu.com/
 * 1. "Today / I bridge / the two." pinned sentence sequence
 * 2. "Toolkit" fanned card deck with the flip to the art-direction deck
 * Styles: css/journey-toolkit.css — logic: js/journey.js, js/toolkit.js
 */
export default function Journey() {
  return (
    <section id="section-journey" className="traj" aria-label="Journey">
      <div className="traj__pin-height">
        <div className="traj__container">
          <div className="traj__visuals" aria-hidden="true">
            <div className="traj__visual traj__visual--left" />
            <div className="traj__visual traj__visual--right" />
          </div>
          <div className="traj__center">
            <div className="traj__sentence is-today">Emotion</div>
            <div className="traj__sentence is-dialogue">meets</div>
            <div className="traj__sentence is-both">outcomes.</div>
          </div>
        </div>
        {/* Better Pitch team: "Meet the team" title over the pinned "outcomes." gradient, */}
        {/* then a kora-style single panel (kora.framer.media): the three members */}
        {/* listed on the left (click opens a profile dialog) and a "we're hiring" */}
        {/* card on the right (css/team.css, js/team.js). brand-content.js drops this */}
        {/* block inside #section-journey's pin height. */}
        <div className="traj__team" aria-label="The team behind Better Pitch">
          <div className="team-heading">
            <h2 className="team-heading__title">Meet the team</h2>
          </div>
          <div className="team-panel">
            <div className="team-panel__inner">
              <div className="team-list">
                <button type="button" className="team-row" data-member="m1" aria-haspopup="dialog">
                  <span className="team-row__ava">
                    <img src={kunalJaggiWebp} alt="" width="1200" height="1200" loading="lazy" decoding="async" />
                  </span>
                  {" "}
                  <span className="team-row__meta">
                    <strong>Kunal Jaggi</strong>
                    <em>{"Founder & CEO"}</em>
                  </span>
                  {" "}
                  <span className="team-row__num">01</span>
                  {" "}
                  <span className="team-row__plus" aria-hidden="true">+</span>
                </button>
                {" "}
                <button type="button" className="team-row" data-member="m2" aria-haspopup="dialog">
                  <span className="team-row__ava">
                    <img src={priteshJaiswalWebp} alt="" width="1200" height="675" loading="lazy" decoding="async" />
                  </span>
                  {" "}
                  <span className="team-row__meta">
                    <strong>Pritesh Jaiswal</strong>
                    <em>CTO</em>
                  </span>
                  {" "}
                  <span className="team-row__num">02</span>
                  {" "}
                  <span className="team-row__plus" aria-hidden="true">+</span>
                </button>
                {" "}
                <button type="button" className="team-row" data-member="m3" aria-haspopup="dialog">
                  <span className="team-row__ava">
                    <img src={srishtiKhatriWebp} alt="" width="1200" height="675" loading="lazy" decoding="async" />
                  </span>
                  {" "}
                  <span className="team-row__meta">
                    <strong>Srishti Khatri</strong>
                    <em>Head of Sales</em>
                  </span>
                  {" "}
                  <span className="team-row__num">03</span>
                  {" "}
                  <span className="team-row__plus" aria-hidden="true">+</span>
                </button>
              </div>
              {/* hiring card in the style of the hero's assistant cards: a careers */}
              {/* assistant message, a composer with quick replies, and an apply pill */}
              <aside className="team-hire" aria-label="We're hiring">
                <span className="team-hire__badge">
                  <span className="team-hire__pulse" aria-hidden="true" />
                  {"We’re hiring"}
                </span>
                <div className="team-hire__chat">
                  <div className="team-hire__msg">
                    <span className="team-hire__orb" aria-hidden="true" />
                    <div className="team-hire__bubble">
                      <div className="team-hire__from">Better Pitch · Careers</div>
                      {"Join us! We’re looking for ambitious people to help make every business call feel human."}
                    </div>
                  </div>
                  <div className="team-hire__typing" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="team-hire__composer">
                    <div className="team-hire__chips">
                      <a className="team-hire__chip" href="#section-footer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          <rect width="20" height="14" x="2" y="6" rx="2" />
                        </svg>
                        Open roles
                      </a>
                      <a className="team-hire__chip" href="#section-footer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                          <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                        </svg>
                        Send your CV
                      </a>
                      <a className="team-hire__chip" href="#section-footer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                        </svg>
                        Life at Better Pitch
                      </a>
                    </div>
                    <div className="team-hire__input">
                      <span className="team-hire__plus" aria-hidden="true">+</span>
                      <span className="team-hire__placeholder">Ask about a role…</span>
                      <span className="team-hire__wave" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </span>
                    </div>
                  </div>
                </div>
                <a className="team-hire__btn" href="#section-footer">
                  Apply now
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </aside>
            </div>
          </div>
          <div className="team-modal" role="dialog" aria-modal="true" aria-label="Team member profile" aria-hidden="true">
            <div className="team-modal__scrim" />
            <div className="team-modal__card">
              <button type="button" className="team-modal__close" aria-label="Close profile">×</button>
              <article className="team-modal__member" data-member="m1">
                <div className="team-modal__photo">
                  <img src={kunalJaggiWebp} alt="Kunal Jaggi" loading="lazy" decoding="async" />
                </div>
                <div className="team-modal__body">
                  <p className="team-modal__kicker">{"Founder & CEO"}</p>
                  <h3 className="team-modal__name">Kunal Jaggi</h3>
                  <p className="team-modal__bio">
                    The visionary architect scaling AI to the edges of telecommunications. He builds the bridge between legacy systems and the autonomous future. Kunal founded Better Pitch to give every business a voice that never sleeps — deploying complete calling workflows, from first dial to dashboard, now trusted by 2,000+ businesses.
                  </p>
                  <div className="team-modal__foot">
                    <div className="team-modal__socials">
                      <a href="https://x.com/" target="_blank" rel="noopener" aria-label="X">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M18.9 1.2h3.7l-8.2 9.3 9.6 12.3h-7.5l-5.9-7.5-6.7 7.5H.2l8.7-9.9L-.3 1.2h7.7l5.3 6.8zm-1.3 19.5h2L6.4 3.3H4.2z" />
                        </svg>
                      </a>
                      {" "}
                      <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.31h4.52V23H.24zM8.31 8.31h4.33v2h.06c.6-1.14 2.07-2.34 4.27-2.34 4.57 0 5.41 3.01 5.41 6.92V23h-4.52v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V23H8.31z" />
                        </svg>
                      </a>
                      {" "}
                      <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <path d="M16 11.37a4 4 0 1 1-7.9 1.26 4 4 0 0 1 7.9-1.26z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                      {" "}
                      <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a>
                    </div>
                    <div className="team-modal__email">
                      <span>Email</span>
                      <a href="mailto:kunal@betterpitch.ai">kunal@betterpitch.ai</a>
                    </div>
                  </div>
                </div>
              </article>
              <article className="team-modal__member" data-member="m2">
                <div className="team-modal__photo">
                  <img src={priteshJaiswalWebp} alt="Pritesh Jaiswal" loading="lazy" decoding="async" />
                </div>
                <div className="team-modal__body">
                  <p className="team-modal__kicker">CTO</p>
                  <h3 className="team-modal__name">Pritesh Jaiswal</h3>
                  <p className="team-modal__bio">
                    The technical mastermind behind the magic. He dreams in neural networks and engineers voice agents that don’t just speak — they understand. Pritesh leads the platform that answers in under 300 milliseconds across 100+ languages and dialects, and keeps 2M+ calls a month running without missing a beat.
                  </p>
                  <div className="team-modal__foot">
                    <div className="team-modal__socials">
                      <a href="https://x.com/" target="_blank" rel="noopener" aria-label="X">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M18.9 1.2h3.7l-8.2 9.3 9.6 12.3h-7.5l-5.9-7.5-6.7 7.5H.2l8.7-9.9L-.3 1.2h7.7l5.3 6.8zm-1.3 19.5h2L6.4 3.3H4.2z" />
                        </svg>
                      </a>
                      {" "}
                      <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.31h4.52V23H.24zM8.31 8.31h4.33v2h.06c.6-1.14 2.07-2.34 4.27-2.34 4.57 0 5.41 3.01 5.41 6.92V23h-4.52v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V23H8.31z" />
                        </svg>
                      </a>
                      {" "}
                      <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <path d="M16 11.37a4 4 0 1 1-7.9 1.26 4 4 0 0 1 7.9-1.26z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                      {" "}
                      <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a>
                    </div>
                    <div className="team-modal__email">
                      <span>Email</span>
                      <a href="mailto:pritesh@betterpitch.ai">pritesh@betterpitch.ai</a>
                    </div>
                  </div>
                </div>
              </article>
              <article className="team-modal__member" data-member="m3">
                <div className="team-modal__photo">
                  <img src={srishtiKhatriWebp} alt="Srishti Khatri" loading="lazy" decoding="async" />
                </div>
                <div className="team-modal__body">
                  <p className="team-modal__kicker">Head of Sales</p>
                  <h3 className="team-modal__name">Srishti Khatri</h3>
                  <p className="team-modal__bio">
                    A strategic sales leader driving revenue growth through high-impact partnerships and data-driven client acquisition. She excels at turning market opportunities into long-term commercial success, and has guided hundreds of Better Pitch deployments from first pilot to full production.
                  </p>
                  <div className="team-modal__foot">
                    <div className="team-modal__socials">
                      <a href="https://x.com/" target="_blank" rel="noopener" aria-label="X">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M18.9 1.2h3.7l-8.2 9.3 9.6 12.3h-7.5l-5.9-7.5-6.7 7.5H.2l8.7-9.9L-.3 1.2h7.7l5.3 6.8zm-1.3 19.5h2L6.4 3.3H4.2z" />
                        </svg>
                      </a>
                      {" "}
                      <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.31h4.52V23H.24zM8.31 8.31h4.33v2h.06c.6-1.14 2.07-2.34 4.27-2.34 4.57 0 5.41 3.01 5.41 6.92V23h-4.52v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V23H8.31z" />
                        </svg>
                      </a>
                      {" "}
                      <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <path d="M16 11.37a4 4 0 1 1-7.9 1.26 4 4 0 0 1 7.9-1.26z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                      {" "}
                      <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a>
                    </div>
                    <div className="team-modal__email">
                      <span>Email</span>
                      <a href="mailto:srishti@betterpitch.ai">srishti@betterpitch.ai</a>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
