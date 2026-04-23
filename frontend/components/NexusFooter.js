import { Twitter, Instagram, Youtube, Facebook, Send } from "lucide-react";

const footerLinks = {
  About: ["Our Story", "Careers", "Press", "Blog"],
  Products: ["Headphones", "Earbuds", "Speakers", "Smartwatches", "Accessories"],
  Support: ["Help Center", "Track Order", "Returns", "Warranty", "Contact Us"],
  Company: ["Investors", "Affiliates", "Terms of Service", "Privacy Policy"],
};

const paymentIcons = ["VISA", "MC", "UPI", "AMEX", "GPay", "PayTM"];

export default function NexusFooter() {
  return (
    <footer className="nexus-footer">
      <div className="nexus-footer-inner">

        {/* Newsletter */}
        <div className="nexus-footer-newsletter">
          <div>
            <h3 className="nexus-footer-newsletter-title">Stay in the Loop</h3>
            <p className="nexus-footer-newsletter-sub">Get exclusive drops, offers, and updates.</p>
          </div>
          <form className="nexus-footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="nexus-footer-email-input"
              required
            />
            <button type="submit" className="nexus-footer-subscribe-btn">
              <Send size={18} /> Subscribe
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="nexus-footer-links-grid">
          {/* Brand col */}
          <div className="nexus-footer-brand-col">
            <div className="nexus-footer-logo">
              <span className="nexus-logo-icon">N</span>
              <span className="nexus-logo-text">NEXUS</span>
            </div>
            <p className="nexus-footer-brand-desc">
              Born from the streets. Built for the bold. NEXUS Audio is for those who refuse to compromise on sound.
            </p>
            <div className="nexus-footer-socials">
              <a href="#" className="nexus-footer-social" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="nexus-footer-social" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="nexus-footer-social" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="#" className="nexus-footer-social" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="nexus-footer-col">
              <h4 className="nexus-footer-col-title">{section}</h4>
              <ul className="nexus-footer-col-links">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="nexus-footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="nexus-footer-bottom">
          <p className="nexus-footer-copyright">
            © 2025 NEXUS Audio Pvt. Ltd. All rights reserved.
          </p>
          <div className="nexus-footer-payments">
            {paymentIcons.map((icon) => (
              <span key={icon} className="nexus-payment-icon">{icon}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
