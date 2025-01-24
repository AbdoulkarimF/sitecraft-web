import React from 'react';

const HeroSection = ({ content, onEdit }) => {
  const defaultContent = {
    title: 'Titre Principal',
    subtitle: 'Sous-titre accrocheur',
    buttonText: 'En savoir plus',
    backgroundImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
  };

  const { title, subtitle, buttonText, backgroundImage } = { ...defaultContent, ...content };

  return (
    <div 
      className="relative h-[500px] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl text-white">
          <h1 
            className="text-5xl font-bold mb-4"
            contentEditable={true}
            onBlur={(e) => onEdit({ ...content, title: e.target.textContent })}
          >
            {title}
          </h1>
          <p 
            className="text-xl mb-8"
            contentEditable={true}
            onBlur={(e) => onEdit({ ...content, subtitle: e.target.textContent })}
          >
            {subtitle}
          </p>
          <button 
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            contentEditable={true}
            onBlur={(e) => onEdit({ ...content, buttonText: e.target.textContent })}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
