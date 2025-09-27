import React from 'react';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="text-gray-500 hover:text-black transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (

    <div>
    </div>
  );
};

export default Footer;