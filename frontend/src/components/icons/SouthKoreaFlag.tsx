import React from 'react';

export const SouthKoreaFlag: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-full h-full rounded-sm">
    <rect width="900" height="600" fill="#ffffff"/>
    <circle cx="450" cy="300" r="100" fill="#003478"/>
    <path d="M450 200 a100 100 0 0 1 0 200 a100 100 0 0 1 0 -200" fill="#c60c30"/>
    {/* Taeguk trigrams */}
    <rect x="150" y="50" width="60" height="15" fill="#000"/>
    <rect x="690" y="50" width="60" height="15" fill="#000"/>
    <rect x="150" y="535" width="60" height="15" fill="#000"/>
    <rect x="690" y="535" width="60" height="15" fill="#000"/>
  </svg>
);