'use client';

import { useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolio';

export default function KageLandingPage() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const syncData = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: 'INIT_PORTFOLIO', portfolioData },
          '*'
        );
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', syncData);
      syncData();
      return () => iframe.removeEventListener('load', syncData);
    }
  }, []);

  return (
    <div className="kage-container">
      <iframe
        ref={iframeRef}
        src="/landing-pages/kage.html"
        title="Arifah Machi Portfolio"
        className="kage-iframe"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
      />
    </div>
  );
}
