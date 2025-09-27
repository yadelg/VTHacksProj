import React from 'react';

const icons = [
  { emoji: '🇮🇹', style: { top: '20%', left: '10%', animationDelay: '0s', animationDuration: '8s', fontSize: '2rem' } },
  { emoji: '🇯🇵', style: { top: '30%', left: '85%', animationDelay: '2s', animationDuration: '10s', fontSize: '3rem' } },
  { emoji: '🇲🇽', style: { top: '70%', left: '15%', animationDelay: '1s', animationDuration: '9s', fontSize: '2.5rem' } },
  { emoji: '🇮🇳', style: { top: '80%', left: '90%', animationDelay: '3s', animationDuration: '7s', fontSize: '2.8rem' } },
  { emoji: '🍜', style: { top: '50%', left: '50%', animationDelay: '0.5s', animationDuration: '12s', fontSize: '2rem' } },
  { emoji: '🌮', style: { top: '15%', left: '60%', animationDelay: '2.5s', animationDuration: '8s', fontSize: '2.2rem' } },
];

const FloatingIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10" aria-hidden="true">
      {icons.map((icon, index) => (
        <span
          key={index}
          className="absolute block animate-float opacity-20"
          style={icon.style}
        >
          {icon.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingIcons;
