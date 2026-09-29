export default function Testimonials() {
  return (
    <section id="testimonials" className="tw" aria-label="Testimonials">
      {/* Results as a slothUI-style testimonial wall (dribbble.com/shots/24428142): */}
      {/* one viewport tall, intro copy on the left, four card columns on the right */}
      {/* drifting vertically in alternating directions (up / down / up / down). Styles in */}
      {/* css/testimonials.css; the seamless loop (each column's card set is cloned */}
      {/* until it covers the wall) in js/testimonials.js. */}
      <div className="tw__stage">
        <div className="tw__intro">
          <span className="tw__chip">Testimonials</span>
          <h2 className="tw__title">Results from live calls</h2>
          <p className="tw__lead">Real outcomes from live Better Pitch calls across sales, support and collections — revenue recovered, bookings made and no-shows cut.</p>
          <div className="tw__rating">
            <span className="tw-stars" aria-label="Rated 4.9 out of 5">★★★★★</span>
            <span className="tw__rating-note">4.9/5 across live deployments</span>
          </div>
          <p className="tw__trust">Trusted by 2,000+ businesses</p>
        </div>
        <div className="tw__wall">
          <div className="tw__col tw__col--up" style={{ "--tw-dur": "48s", "--tw-off": "-9s" }}>
            <div className="tw__track lia-slide-track">
              <div className="tw__set">
                <article className="tw-card tw-card--intro">
                  <span className="tw-tag">Testimonials</span>
                  <h3 className="tw-heading">What our customers say</h3>
                  <p className="tw-text">Real outcomes from live Better Pitch calls across 2,000+ businesses. No lab demos.</p>
                </article>
                <article className="tw-card tw-card--quote">
                  <div className="tw-stars" aria-label="Rated 5 out of 5">★★★★★</div>
                  <p className="tw-quote">“Every site-visit lead called back, qualified and followed up automatically. Three properties closed in month one.”</p>
                  <footer className="tw-who">
                    <span className="tw-ava tw-ava--a">IR</span>
                    <span className="tw-who__meta">
                      <strong>Imperial Realty</strong>
                      <em>Real Estate</em>
                    </span>
                  </footer>
                </article>
                <article className="tw-card tw-card--stat tw-card--grad">
                  <p className="tw-kicker">D2C · E-commerce</p>
                  <p className="tw-big">3.2× revenue recovered</p>
                  <span className="tw-pill">D2C Brand</span>
                  <p className="tw-note">COD confirmation, cart recovery and NDR calls — handled by phone, day and night.</p>
                </article>
                <article className="tw-card tw-card--quote">
                  <div className="tw-stars" aria-label="Rated 5 out of 5">★★★★★</div>
                  <p className="tw-quote">“Stays confirmed, pre-arrival questions answered and upgrades sold in each guest’s own language.”</p>
                  <footer className="tw-who">
                    <span className="tw-ava tw-ava--c">BH</span>
                    <span className="tw-who__meta">
                      <strong>Boutique Hotel Group</strong>
                      <em>Hospitality</em>
                    </span>
                  </footer>
                </article>
              </div>
            </div>
          </div>
          <div className="tw__col tw__col--down" style={{ "--tw-dur": "62s", "--tw-off": "-21s" }}>
            <div className="tw__track lia-slide-track">
              <div className="tw__set">
                <article className="tw-card tw-card--stat tw-card--plum">
                  <p className="tw-kicker">BFSI · Collections</p>
                  <p className="tw-big">40% higher EMI recovery</p>
                  <span className="tw-pill">NBFC Lender</span>
                  <p className="tw-note">2M+ calls a month at ₹400 per recovery, zero compliance violations.</p>
                </article>
                <article className="tw-card tw-card--quote">
                  <p className="tw-quote">“Every lead qualified by phone and the hottest routed straight to sales — a major distributor signed during the pilot.”</p>
                  <footer className="tw-who">
                    <span className="tw-ava tw-ava--b">PH</span>
                    <span className="tw-who__meta">
                      <strong>Publishing House</strong>
                      <em>Publishing</em>
                    </span>
                  </footer>
                </article>
                <article className="tw-card tw-card--intro">
                  <span className="tw-tag">Testimonials</span>
                  <h3 className="tw-heading">What people say</h3>
                  <p className="tw-text">You can hear it on the very first call — natural, fast and on-script.</p>
                  <div className="tw-stars" aria-label="Rated 5 out of 5">★★★★★</div>
                  <p className="tw-text">“Course counselling and demo-class bookings handled on the very first call, at any hour.”</p>
                </article>
                <article className="tw-card tw-card--quote">
                  <p className="tw-quote">
                    “Empty slots cost clinics every day. Every appointment is confirmed by phone and cancellations rescheduled before the slot is lost.”
                  </p>
                  <footer className="tw-who">
                    <span className="tw-ava tw-ava--f">CN</span>
                    <span className="tw-who__meta">
                      <strong>Clinic Network</strong>
                      <em>Healthcare</em>
                    </span>
                  </footer>
                </article>
              </div>
            </div>
          </div>
          <div className="tw__col tw__col--up" style={{ "--tw-dur": "54s", "--tw-off": "-33s" }}>
            <div className="tw__track lia-slide-track">
              <div className="tw__set">
                <article className="tw-card tw-card--mark">
                  <span className="tw-mark" aria-hidden="true">”</span>
                  <p className="tw-quote">Enquiries arrived at night and were cold by morning. Better Pitch calls within minutes and books demo classes around the clock.</p>
                  <footer className="tw-who">
                    <span className="tw-ava tw-ava--d">EI</span>
                    <span className="tw-who__meta">
                      <strong>EdTech Institute</strong>
                      <em>Education</em>
                    </span>
                  </footer>
                </article>
                <article className="tw-card tw-card--stat tw-card--pink">
                  <p className="tw-kicker">Healthcare</p>
                  <p className="tw-big">No-shows cut across clinics</p>
                  <span className="tw-pill">Clinic Network</span>
                  <p className="tw-note">Appointments confirmed, reminded and rescheduled before the slot is lost.</p>
                </article>
                <article className="tw-card tw-card--quote">
                  <div className="tw-stars" aria-label="Rated 5 out of 5">★★★★★</div>
                  <p className="tw-quote">“EMI reminders in each borrower’s language, inside compliant calling windows, with every promise-to-pay logged.”</p>
                  <footer className="tw-who">
                    <span className="tw-ava tw-ava--e">NL</span>
                    <span className="tw-who__meta">
                      <strong>NBFC Lender</strong>
                      <em>Collections</em>
                    </span>
                  </footer>
                </article>
                <article className="tw-card tw-card--stat tw-card--violet">
                  <p className="tw-kicker">Platform</p>
                  <p className="tw-big">2,000+ businesses live</p>
                  <span className="tw-pill">Better Pitch</span>
                  <p className="tw-note">Sales, support and collections workflows deployed and run for you.</p>
                </article>
              </div>
            </div>
          </div>
          <div className="tw__col tw__col--down" style={{ "--tw-dur": "58s", "--tw-off": "-14s" }}>
            <div className="tw__track lia-slide-track">
              <div className="tw__set">
                <article className="tw-card tw-card--quote">
                  <div className="tw-stars" aria-label="Rated 5 out of 5">★★★★★</div>
                  <p className="tw-quote">“Customers switch between Hindi and English mid-sentence and the agent simply keeps up. Our support queue finally shrank.”</p>
                  <footer className="tw-who">
                    <span className="tw-ava tw-ava--b">CE</span>
                    <span className="tw-who__meta">
                      <strong>Consumer Electronics</strong>
                      <em>Support</em>
                    </span>
                  </footer>
                </article>
                <article className="tw-card tw-card--stat tw-card--grad">
                  <p className="tw-kicker">Real Estate</p>
                  <p className="tw-big">5× more site visits</p>
                  <span className="tw-pill">Property Developer</span>
                  <p className="tw-note">Every lead called back in under 4 minutes, intent qualified and the visit booked.</p>
                </article>
                <article className="tw-card tw-card--intro">
                  <span className="tw-tag">Testimonials</span>
                  <h3 className="tw-heading">Loved by teams</h3>
                  <p className="tw-text">Sales, support and collections teams hand the repetitive calls to Better Pitch and keep the conversations that matter.</p>
                </article>
                <article className="tw-card tw-card--quote">
                  <p className="tw-quote">“Renewal reminders go out on time, every policyholder hears their own language and every callback is logged.”</p>
                  <footer className="tw-who">
                    <span className="tw-ava tw-ava--d">IB</span>
                    <span className="tw-who__meta">
                      <strong>Insurance Broker</strong>
                      <em>Insurance</em>
                    </span>
                  </footer>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
