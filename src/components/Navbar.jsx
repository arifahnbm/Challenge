'use client';

import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { brand, navigation } = portfolioData;

  return (
    <header className={`nav-bar ${scrolled ? 'nav-stuck' : ''} ${menuOpen ? 'nav-open' : ''}`}>
      <a href="#top" className="nav-brand">
        <img
          src={brand.logo}
          alt={brand.name}
          className="brand-logo"
          width="34"
          height="34"
        />
        <div className="brand-text">
          <b>{brand.name}</b>
          <i>{brand.sub}</i>
        </div>
      </a>

      <nav className={`nav-links ${menuOpen ? 'is-active' : ''}`}>
        {navigation.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            <span>{item.label}</span>
            <span className="nav-link-jp">{item.jp}</span>
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={`nav-burger ${menuOpen ? 'active' : ''}`}
        aria-label="Toggle Navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
