import React from 'react';

const AboutSection = ({ content, onEdit }) => {
  const defaultContent = {
    title: 'À Propos de Nous',
    description: 'Nous sommes une entreprise passionnée par l'innovation et l'excellence.',
    features: [
      {
        id: 1,
        title: 'Notre Mission',
        description: 'Fournir des solutions innovantes',
        icon: '🎯'
      },
      {
        id: 2,
        title: 'Notre Vision',
        description: 'Devenir leader dans notre domaine',
        icon: '👁️'
      },
      {
        id: 3,
        title: 'Nos Valeurs',
        description: 'Intégrité, Excellence, Innovation',
        icon: '⭐'
      }
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
  };

  const { title, description, features, image } = { ...defaultContent, ...content };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className="text-3xl font-bold mb-6"
              contentEditable
              onBlur={(e) => onEdit({ ...content, title: e.target.textContent })}
            >
              {title}
            </h2>
            <p 
              className="text-gray-600 mb-8"
              contentEditable
              onBlur={(e) => onEdit({ ...content, description: e.target.textContent })}
            >
              {description}
            </p>
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start">
                  <span className="text-2xl mr-4">{feature.icon}</span>
                  <div>
                    <h3 
                      className="font-semibold mb-2"
                      contentEditable
                      onBlur={(e) => {
                        const updatedFeatures = features.map(f => 
                          f.id === feature.id ? { ...f, title: e.target.textContent } : f
                        );
                        onEdit({ ...content, features: updatedFeatures });
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="text-gray-600"
                      contentEditable
                      onBlur={(e) => {
                        const updatedFeatures = features.map(f => 
                          f.id === feature.id ? { ...f, description: e.target.textContent } : f
                        );
                        onEdit({ ...content, features: updatedFeatures });
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[400px]">
            <img
              src={image}
              alt="About Us"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
