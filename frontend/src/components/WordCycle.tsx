import React, { useState, useEffect } from 'react';

const WORDS = ["Diversify", "Expand", "Change"];
const TYPING_SPEED = 120;
const PAUSE_DURATION = 1500;
const SLIDE_ANIMATION_DURATION = 500;

const WordCycle: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'sliding'>('typing');

  useEffect(() => {
    switch (phase) {
      case 'typing': {
        if (displayedText.length < WORDS[wordIndex].length) {
          const typingTimer = setTimeout(() => {
            setDisplayedText(WORDS[wordIndex].substring(0, displayedText.length + 1));
          }, TYPING_SPEED);
          return () => clearTimeout(typingTimer);
        } else {
          setPhase('pausing');
        }
        break;
      }
      case 'pausing': {
        const pauseTimer = setTimeout(() => {
          setPhase('sliding');
        }, PAUSE_DURATION);
        return () => clearTimeout(pauseTimer);
      }
      case 'sliding': {
        const slideTimer = setTimeout(() => {
          setWordIndex((prevIndex) => (prevIndex + 1) % WORDS.length);
          setDisplayedText('');
          setPhase('typing');
        }, SLIDE_ANIMATION_DURATION);
        return () => clearTimeout(slideTimer);
      }
    }
  }, [displayedText, wordIndex, phase]);

  return (
    <div className="h-24 md:h-28 overflow-hidden">
      <div
        className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-stone-900 transition-all duration-500 ease-in-out ${
          phase === 'sliding' ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
        }`}
      >
        <span>{displayedText}</span>
        <span className={`border-r-4 border-stone-900 ml-1 animate-pulse ${
            phase !== 'typing' ? 'opacity-0' : 'opacity-100'
          }`}></span>
      </div>
    </div>
  );
};

export default WordCycle;
