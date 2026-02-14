import React from 'react';

type AdSize = 'leaderboard' | 'rectangle' | 'mobile-banner';

interface AdSlotProps {
  size: AdSize;
  className?: string;
}

const sizeConfig: Record<AdSize, { width: string; height: string; label: string }> = {
  'leaderboard': { width: '728px', height: '90px', label: '728x90' },
  'rectangle': { width: '300px', height: '250px', label: '300x250' },
  'mobile-banner': { width: '320px', height: '100px', label: '320x100' },
};

const AdSlot: React.FC<AdSlotProps> = ({ size, className = '' }) => {
  const config = sizeConfig[size];

  return (
    <div
      className={`flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded ${className}`}
      style={{
        maxWidth: config.width,
        height: config.height,
        width: '100%'
      }}
      aria-label="Advertisement"
      role="complementary"
    >
      <span className="text-gray-400 text-sm">
        Ad Space ({config.label})
      </span>
    </div>
  );
};

export default AdSlot;
