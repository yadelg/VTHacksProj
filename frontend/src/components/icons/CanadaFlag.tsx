import React from 'react';

export const CanadaFlag: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" className="w-full h-full rounded-sm">
    <rect width="250" height="500" fill="#ff0000"/>
    <rect x="750" width="250" height="500" fill="#ff0000"/>
    <rect x="250" width="500" height="500" fill="#ffffff"/>
    <polygon
      points="500,100 520,180 600,180 540,230 560,310 500,260 440,310 460,230 400,180 480,180"
      fill="#ff0000"
    />
  </svg>
);