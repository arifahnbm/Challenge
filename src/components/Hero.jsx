'use client';

import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import StampButtons from './StampButtons';
import ProfileCard from './ProfileCard';

export default function Hero() {
  const { hero } = portfolioData;

  // Greeting rotator state
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [greetingAnim, setGreetingAnim] = useState('slide-in');

  // Role rotator state
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleAnim, setRoleAnim] = useState('slide-in');

  // Scroll exit state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Greeting rotation every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingAnim('slide-out');
      setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % hero.greetings.length);
        setGreetingAnim('slide-in');
      }, 350);
    }, 3000);
    return () => clearInterval(timer);
  }, [hero.greetings.length]);

  // Role rotation every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleAnim('slide-out');
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % hero.roles.length);
        setRoleAnim('slide-in');
      }, 350);
    }, 3000);
    return () => clearInterval(timer);
  }, [hero.roles.length]);

  // Handle smooth scroll-driven exit of hero elements
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight || 800;
          // Exit spans over the first ~55% of viewport scroll
          const exitSpan = Math.max(1, vh * 0.55);
          const t = Math.min(1, Math.max(0, window.scrollY / exitSpan));
          setScrollProgress(t);

          // Forward scroll to background 3D scene (drives camera progression)
          const iframe = document.querySelector('.kage-bg-iframe');
          if (iframe && iframe.contentWindow) {
            const totalScrollable = Math.max(1, document.documentElement.scrollHeight - vh);
            const overallRatio = Math.min(1, Math.max(0, window.scrollY / totalScrollable));
            iframe.contentWindow.postMessage({ type: 'SYNC_SCROLL', prog: overallRatio * 4.5 }, '*');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Gentle exit calculations
  // 1. Profile card: dissolves first with soft blur
  const cardT = Math.min(1, Math.max(0, scrollProgress / 0.42));
  const cardOpacity = (1 - cardT).toFixed(3);
  const cardBlur = (cardT * 12).toFixed(1);
  const cardShift = (cardT * 15).toFixed(1);

  // 2. Hero foot (role cue & stamps): dissolves second
  const footT = Math.min(1, Math.max(0, (scrollProgress - 0.10) / 0.48));
  const footOpacity = (1 - footT).toFixed(3);
  const footShift = (footT * 18).toFixed(1);

  // 3. Hero top (greeting, headline & bio): dissolves third
  const topT = Math.min(1, Math.max(0, (scrollProgress - 0.20) / 0.52));
  const topOpacity = (1 - topT).toFixed(3);
  const topShift = (topT * 24).toFixed(1);

  const isHeroActive = scrollProgress < 0.95;

  return (
    <section
      className="hero-section"
      id="hero"
      style={{
        pointerEvents: isHeroActive ? 'auto' : 'none',
      }}
    >
      <div className="hero-content">
        <div
          className="hero-top"
          style={{
            opacity: topOpacity,
            transform: `translate3d(0, ${topShift}px, 0)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            pointerEvents: topOpacity > 0.05 ? 'auto' : 'none',
          }}
        >
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            {hero.chapter}
          </div>

          <h1 className="hero-headline">
            <span className="headline-line">
              <span className={`rotating-greeting ${greetingAnim}`}>
                {hero.greetings[greetingIndex]}
              </span>
            </span>
            <span className="headline-line">
              <span className="headline-name">{hero.name}</span>
            </span>
          </h1>

          <p className="hero-bio">{hero.bio}</p>
        </div>

        <div
          className="hero-foot"
          style={{
            opacity: footOpacity,
            transform: `translate3d(0, ${footShift}px, 0)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            pointerEvents: footOpacity > 0.05 ? 'auto' : 'none',
          }}
        >
          {/* Rotating Role Cue */}
          <div className="hero-role-cue">
            <span className="role-track-wrap">
              <span className={`role-rotator-text ${roleAnim}`}>
                {hero.roles[roleIndex]}
              </span>
            </span>
            <span className="cue-track">
              <i />
            </span>
          </div>

          {/* 3 Japanese Stamp Buttons (CV, GitHub, LinkedIn) */}
          <StampButtons />
        </div>
      </div>

      {/* Arifah Washi Photo Card with Soft Blur & Dissolve */}
      <div
        className="hero-card-wrapper"
        style={{
          opacity: cardOpacity,
          filter: cardBlur > 0.1 ? `blur(${cardBlur}px)` : 'none',
          transform: `translate3d(0, ${cardShift}px, 0)`,
          transition: 'opacity 0.15s ease-out, transform 0.15s ease-out, filter 0.15s ease-out',
          pointerEvents: cardOpacity > 0.05 ? 'auto' : 'none',
        }}
      >
        <ProfileCard />
      </div>
    </section>
  );
}
