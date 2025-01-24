import React from 'react';

const ServicesSection = ({ content, onEdit }) => {
  const defaultContent = {
    title: 'Nos Services',
    subtitle: 'Découvrez notre gamme complète de services professionnels',
    services: [
      {
        id: 1,
        title: 'Design Web',
        description: 'Création de sites web modernes et responsifs',
        icon: '🎨'
      },
      {
        id: 2,
        title: 'Développement',
        description: 'Solutions sur mesure pour votre entreprise',
        icon: '💻'
      },
      {
        id: 3,
        title: 'Marketing Digital',
        description: 'Stratégies marketing pour booster votre présence en ligne',
        icon: '📈'
      },
      {
        id: 4,
        title: 'Support 24/7',
        description: 'Assistance technique disponible en permanence',
        icon: '🔧'
      }
    ]
  };

  const { title, subtitle, services } = { ...defaultContent, ...content };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl font-bold mb-4"
            contentEditable
            onBlur={(e) => onEdit({ ...content, title: e.target.textContent })}
          >
            {title}
          </h2>
          <p 
            className="text-gray-600"
            contentEditable
            onBlur={(e) => onEdit({ ...content, subtitle: e.target.textContent })}
          >
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 
                className="text-xl font-semibold mb-3"
                contentEditable
                onBlur={(e) => {
                  const updatedServices = services.map(s => 
                    s.id === service.id ? { ...s, title: e.target.textContent } : s
                  );
                  onEdit({ ...content, services: updatedServices });
                }}
              >
                {service.title}
              </h3>
              <p 
                className="text-gray-600"
                contentEditable
                onBlur={(e) => {
                  const updatedServices = services.map(s => 
                    s.id === service.id ? { ...s, description: e.target.textContent } : s
                  );
                  onEdit({ ...content, services: updatedServices });
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
