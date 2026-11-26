'use client';

import { useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolio';

export default function KageLandingPage() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const syncData = () => {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage({ type: 'INIT_PORTFOLIO', portfolioData }, '*');

      const initialProj = new URLSearchParams(window.location.search).get('project');
      if (initialProj) {
        win.postMessage({ type: 'OPEN_PROJECT', projectId: initialProj }, '*');
      }
    };

    const onMessage = (ev) => {
      if (!ev.data || typeof ev.data !== 'object') return;
      if (ev.data.type === 'PROJECT_OPEN' && ev.data.projectId) {
        const u = new URL(window.location.href);
        if (u.searchParams.get('project') !== ev.data.projectId) {
          u.searchParams.set('project', ev.data.projectId);
          window.history.pushState({ projectId: ev.data.projectId }, '', u.pathname + u.search + u.hash);
        }
      } else if (ev.data.type === 'PROJECT_CLOSE') {
        const u = new URL(window.location.href);
        if (u.searchParams.has('project')) {
          u.searchParams.delete('project');
          window.history.pushState(null, '', u.pathname + u.search + u.hash);
        }
      }
    };

    const onPopState = () => {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      const proj = new URLSearchParams(window.location.search).get('project');
      if (proj) {
        win.postMessage({ type: 'OPEN_PROJECT', projectId: proj }, '*');
      } else {
        win.postMessage({ type: 'CLOSE_PROJECT' }, '*');
      }
    };

    window.addEventListener('message', onMessage);
    window.addEventListener('popstate', onPopState);

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', syncData);
      syncData();
    }

    return () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('popstate', onPopState);
      if (iframe) iframe.removeEventListener('load', syncData);
    };
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
