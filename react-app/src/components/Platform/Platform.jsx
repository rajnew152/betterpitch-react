import agniAgentBuilderSvg from '../../assets/toolkit/agni-agent-builder.svg';
import agniKnowledgeBaseSvg from '../../assets/toolkit/agni-knowledge-base.svg';
import agniToolsSvg from '../../assets/toolkit/agni-tools.svg';
import agniCallingSvg from '../../assets/toolkit/agni-calling.svg';
import agniAnalyticsSvg from '../../assets/toolkit/agni-analytics.svg';
import agniWebhooksSvg from '../../assets/toolkit/agni-webhooks.svg';
import agniLanguagesSvg from '../../assets/toolkit/agni-languages.svg';
import transitionSvg from '../../assets/toolkit/transition.svg';

export default function Platform() {
  return (
    <section id="section-toolkit" className="tk tk--art-only" aria-label="Toolkit">
      <div className="tk__pin-height">
        <div className="tk__container">
          <div className="tk__header">
            <h2 className="tk__title">Platform</h2>
            <div className="tk__subtitle-wrap">
              <h3 className="tk__subtitle tk__subtitle--art">Enterprise AI deployment · India-native</h3>
            </div>
          </div>
          {/* art-direction deck */}
          <div className="tk__wheel tk__wheel--art">
            <div className="tk__slot">
              <div className="tk-card">
                <div className="tk-card__motion tk-flip" data-flip="agni-agent-builder">
                  <div className="tk-flip__inner">
                    <img className="tk-flip__face" src={agniAgentBuilderSvg} loading="lazy" decoding="async" alt="Agent Builder — prompts, voices and accents" draggable="false" />
                    <div className="tk-flip__face tk-flip__back">
                      <p className="tk-flip__title">Agent Builder</p>
                      <p className="tk-flip__text">
                        Describe your agent in plain language: pick its voice, accent and persona, set goals and guardrails, and test it live before a single customer call.
                      </p>
                      <p className="tk-flip__hint">Tap to flip back</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tk__slot">
              <div className="tk-card">
                <div className="tk-card__motion tk-flip" data-flip="agni-knowledge-base">
                  <div className="tk-flip__inner">
                    <img className="tk-flip__face" src={agniKnowledgeBaseSvg} loading="lazy" decoding="async" alt="Knowledge Base — FAQs, policies and pricing" draggable="false" />
                    <div className="tk-flip__face tk-flip__back">
                      <p className="tk-flip__title">Knowledge Base</p>
                      <p className="tk-flip__text">
                        Upload FAQs, policies, price lists and PDFs. The agent answers from your own documents, so every reply stays accurate and on-brand.
                      </p>
                      <p className="tk-flip__hint">Tap to flip back</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tk__slot">
              <div className="tk-card">
                <div className="tk-card__motion tk-flip" data-flip="agni-tools">
                  <div className="tk-flip__inner">
                    <img className="tk-flip__face" src={agniToolsSvg} loading="lazy" decoding="async" alt="Tools — transfers, APIs and IVRs" draggable="false" />
                    <div className="tk-flip__face tk-flip__back">
                      <p className="tk-flip__title">Tools</p>
                      <p className="tk-flip__text">
                        Warm-transfer to a human, trigger your APIs mid-call, navigate IVRs and send SMS or WhatsApp follow-ups, all as actions the agent takes.
                      </p>
                      <p className="tk-flip__hint">Tap to flip back</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tk__slot">
              <div className="tk-card">
                <div className="tk-card__motion tk-flip" data-flip="agni-calling">
                  <div className="tk-flip__inner">
                    <img className="tk-flip__face" src={agniCallingSvg} loading="lazy" decoding="async" alt="Calling — inbound and outbound" draggable="false" />
                    <div className="tk-flip__face tk-flip__back">
                      <p className="tk-flip__title">Calling</p>
                      <p className="tk-flip__text">
                        Run outbound campaigns and answer inbound lines at scale, with retry rules, calling windows and DND compliance built in.
                      </p>
                      <p className="tk-flip__hint">Tap to flip back</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tk__slot">
              <div className="tk-card">
                <div className="tk-card__motion tk-flip" data-flip="agni-analytics">
                  <div className="tk-flip__inner">
                    <img className="tk-flip__face" src={agniAnalyticsSvg} loading="lazy" decoding="async" alt="Call Analytics — transcripts and sentiment" draggable="false" />
                    <div className="tk-flip__face tk-flip__back">
                      <p className="tk-flip__title">Call Analytics</p>
                      <p className="tk-flip__text">
                        Every call is recorded, transcribed and scored for sentiment, intent and outcome, so you know what happened and what to do next.
                      </p>
                      <p className="tk-flip__hint">Tap to flip back</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tk__slot">
              <div className="tk-card">
                <div className="tk-card__motion tk-flip" data-flip="agni-webhooks">
                  <div className="tk-flip__inner">
                    <img className="tk-flip__face" src={agniWebhooksSvg} loading="lazy" decoding="async" alt="API and Webhooks — CRM and calendar sync" draggable="false" />
                    <div className="tk-flip__face tk-flip__back">
                      <p className="tk-flip__title">{"API & Webhooks"}</p>
                      <p className="tk-flip__text">
                        Push call outcomes to your CRM, book slots in your calendar and stream live events to your own stack as each call happens.
                      </p>
                      <p className="tk-flip__hint">Tap to flip back</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tk__slot">
              <div className="tk-card">
                <div className="tk-card__motion tk-flip" data-flip="agni-languages">
                  <div className="tk-flip__inner">
                    <img className="tk-flip__face" src={agniLanguagesSvg} loading="lazy" decoding="async" alt="30+ Languages — Hinglish-native, sub-300ms" draggable="false" />
                    <div className="tk-flip__face tk-flip__back">
                      <p className="tk-flip__title">30+ Languages</p>
                      <p className="tk-flip__text">Hindi, Hinglish, Tamil, Telugu and more, with natural code-switching mid-sentence and replies in under 300 ms.</p>
                      <p className="tk-flip__hint">Tap to flip back</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tk__slot tk__slot--cream">
              <div className="tk-card tk-card--transition">
                <img className="tk-card__motion" src={transitionSvg} alt="" draggable="false" loading="lazy" decoding="async" />
                {" "}
                <canvas className="tk-card__cream tk-card__motion" aria-hidden="true" />
              </div>
            </div>
          </div>
          {/* "Now see what every call is worth." opens inside the transition card: */}
          {/* js/toolkit.js clips this layer to the card while it fills and grows, */}
          {/* then slides the sentence across the stage (css/manifesto.css) */}
          {/* the stage's own background, clipped to the card: the card reads as a */}
          {/* window onto the stage instead of a solid slab */}
          <div className="tk__cover-bg" aria-hidden="true" />
          <div className="tk__cover mf__container" aria-label="Manifesto">
            <p className="mf__text">Now see what every call is worth.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
