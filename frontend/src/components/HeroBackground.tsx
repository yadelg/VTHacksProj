import React from 'react';

const images = [
  'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=2942&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595295333158-4742f28f5de8?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585937421612-70a05835606b?q=80&w=2857&auto=format&fit=crop',
];

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden">
            <img 
              src={src} 
              alt={`Cuisine photo ${index + 1}`}
              className="w-full h-full object-cover animate-kenburns"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroBackground;