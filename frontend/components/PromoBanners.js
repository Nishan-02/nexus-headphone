export default function PromoBanners() {
  return (
    <section className="nexus-promo-section">
      <div className="nexus-promo-grid">
        <a href="#" className="nexus-promo-card nexus-promo-card--1">
          <img
            src="/images/promo1.png"
            alt="AirDopes Pro Max — Up to 48H Playtime"
            loading="lazy"
            className="nexus-promo-img"
            width={800}
            height={300}
          />
          <div className="nexus-promo-overlay">
            <div className="nexus-promo-content">
              <span className="nexus-promo-badge">NEW DROP</span>
              <h3 className="nexus-promo-title">AirDopes Pro Max</h3>
              <p className="nexus-promo-sub">Up to 48H Playtime · IPX7 Rated</p>
              <span className="nexus-promo-cta">Shop Now →</span>
            </div>
          </div>
        </a>

        <a href="#" className="nexus-promo-card nexus-promo-card--2">
          <img
            src="/images/promo2.png"
            alt="NEXUS Soundbar — Thunderous Bass"
            loading="lazy"
            className="nexus-promo-img"
            width={800}
            height={300}
          />
          <div className="nexus-promo-overlay">
            <div className="nexus-promo-content">
              <span className="nexus-promo-badge nexus-promo-badge--blue">FEATURED</span>
              <h3 className="nexus-promo-title">NEXUS Soundbar</h3>
              <p className="nexus-promo-sub">Thunderous Bass · 300W Output</p>
              <span className="nexus-promo-cta">Explore →</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
