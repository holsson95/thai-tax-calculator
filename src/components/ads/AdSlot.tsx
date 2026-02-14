import React, { useEffect, useRef } from 'react';

const ADSENSE_PUBLISHER_ID = 'ca-pub-4471962643516217';

// Declare adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdSize = 'leaderboard' | 'rectangle' | 'mobile-banner';

interface AdSlotProps {
  size: AdSize;
  adSlot: string; // Your AdSense ad unit slot ID
  className?: string;
}

const sizeConfig: Record<AdSize, { width: number; height: number }> = {
  'leaderboard': { width: 728, height: 90 },
  'rectangle': { width: 300, height: 250 },
  'mobile-banner': { width: 320, height: 100 },
};

const AdSlot: React.FC<AdSlotProps> = ({ size, adSlot, className = '' }) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);
  const config = sizeConfig[size];

  useEffect(() => {
    // Only load ad once per component instance
    if (isAdLoaded.current) return;

    try {
      if (adRef.current && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        maxWidth: config.width,
        minHeight: config.height,
        width: '100%'
      }}
      aria-label="Advertisement"
      role="complementary"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: config.width,
          height: config.height,
        }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={adSlot}
      />
    </div>
  );
};

export default AdSlot;
