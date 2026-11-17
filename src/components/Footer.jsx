'use client';

import { portfolioData } from '../data/portfolio';

export default function Footer() {
  const { footer } = portfolioData;

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img
            src={footer.logo}
            alt="Sakura Logo"
            className="footer-logo"
            width="46"
            height="46"
          />
          <p className="footer-desc">{footer.description}</p>
        </div>

        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <span className="footer-motto-jp">{footer.mottoJp}</span>
          <span>{footer.tags}</span>
        </div>
      </div>
    </footer>
  );
}
