import React from 'react';
import { ItalyFlag } from './icons/ItalyFlag';
import { JapanFlag } from './icons/JapanFlag';
import { MexicoFlag } from './icons/MexicoFlag';
import { IndiaFlag } from './icons/IndiaFlag';

interface FeatureCardProps {
  flag: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ flag, title, description, imageUrl }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group border border-gray-200">
    <div className="overflow-hidden h-32">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
    </div>
    <div className="p-4 text-black">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-4 flex-shrink-0">{flag}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  </div>
);

const FeaturesSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FeatureCard 
        flag={<MexicoFlag />} 
        title="Mexican" 
        description="Vibrant and bold flavors." 
        imageUrl="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=2942&auto=format&fit=crop"
      />
      <FeatureCard 
        flag={<JapanFlag />} 
        title="Japanese" 
        description="Subtle, elegant, and umami-rich." 
        imageUrl="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2940&auto=format&fit=crop"
      />
      <FeatureCard 
        flag={<ItalyFlag />} 
        title="Italian" 
        description="Comforting and timeless recipes." 
        imageUrl="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2835&auto=format&fit=crop"
      />
      <FeatureCard 
        flag={<IndiaFlag />} 
        title="Indian" 
        description="Aromatic spices and complex curries." 
        imageUrl="logo/biryani.jpg"
      />
    </div>
  );
};

export default FeaturesSection;