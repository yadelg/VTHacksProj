import React from 'react';
import AnimatedHeroText from './components/AnimatedHeroText';
import FeaturesSection from './components/FeaturesSection';
import { HorizontalFlagStrip } from './components/FlagBorder';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

const App: React.FC = () => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // restore scroll on unmount
    };
  }, []);
  return (
    <div className="bg-red-100 text-black min-h-screen flex flex-col font-sans ">

      {/* Padded Content Wrapper */}
      <div className="relative flex-grow flex flex-col px-6 md:px-6 w-full max-w-7xl mx-auto">
        {/* Bordered Main Content Area */}
        <div className="flex-grow flex flex-col min-h-0">
          <HorizontalFlagStrip />

          <div className="flex-grow flex min-h-0">
            <main className="flex-grow flex flex-col justify-center p-4 md:p-6">
              <section className="container mx-auto w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-16">
                
                {/* Left Column: Hero Text */}
                <div className="w-full lg:w-1/2 max-w-2xl text-center lg:text-left">
                  <AnimatedHeroText />
                  <h2
                    className="text-3xl sm:text-4xl text-black animate-fade-in-up font-cursive font-bold"
                    style={{ animationDelay: '0.5s' }}
                  >
                    𝒴ℴ𝓊𝓇 𝒫𝒶𝓁𝒶𝓉ℯ with <img src="../logo/globaleats.png" width="20px" height="20px"/>
                  </h2>
                  
                  <Link to="/form">
                    <button
                      className="group mt-6 relative overflow-hidden text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 animate-fade-in-up bg-black animate-pulse-shadow"
                      style={{ animationDelay: '1s' }}
                    >
                      <span className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-x-4">
                        Get Started!
                      </span>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-8 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 text-2xl">
                        😋
                      </span>
                    </button>
                  </Link>
                </div>

                {/* Right Column: Features Grid */}
                <div className="w-full lg:w-1/2 max-w-2xl">
                  <FeaturesSection />
                </div>

              </section>
            </main>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;
