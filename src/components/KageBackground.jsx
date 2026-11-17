'use client';

import { useState, useEffect } from 'react';

export default function KageBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="kage-bg-fallback" />;
  }

  return (
    <div className="kage-bg-wrap" aria-hidden="true">
      <iframe
        src="/landing-pages/kage.html?bg=1"
        title="Kyoto 3D Scene"
        className="kage-bg-iframe"
        loading="eager"
      />
    </div>
  );
}
