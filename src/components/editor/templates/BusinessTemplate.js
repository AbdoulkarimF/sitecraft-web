import React from 'react';

export const BusinessTemplate = {
  id: 'business',
  name: 'Site Entreprise',
  thumbnail: '/templates/business-preview.jpg',
  sections: [
    {
      id: 'hero',
      name: 'Hero Section',
      content: {
        title: 'Solutions Innovantes pour Votre Entreprise',
        subtitle: 'Transformez votre vision en réalité avec nos services professionnels',
        cta: 'Commencer maintenant',
        backgroundImage: '/templates/business/hero-bg.jpg'
      },
      styles: {
        textColor: 'text-white',
        backgroundColor: 'bg-indigo-900',
        height: 'h-screen'
      }
    },
    {
      id: 'services',
      name: 'Nos Services',
      content: {
        title: 'Nos Services',
        description: 'Découvrez comment nous pouvons vous aider à développer votre entreprise',
        services: [
          {
            icon: '💡',
            title: 'Stratégie Digitale',
            description: 'Développez votre présence en ligne avec une stratégie sur mesure'
          },
          {
            icon: '🚀',
            title: 'Innovation',
            description: 'Restez en avance avec les dernières technologies'
          },
          {
            icon: '📊',
            title: 'Analyse de Données',
            description: 'Prenez des décisions éclairées basées sur des données concrètes'
          }
        ]
      },
      styles: {
        backgroundColor: 'bg-white',
        padding: 'py-20'
      }
    },
    {
      id: 'about',
      name: 'À Propos',
      content: {
        title: 'À Propos de Nous',
        description: 'Une équipe passionnée dédiée à votre succès',
        image: '/templates/business/about.jpg',
        stats: [
          { number: '10+', label: 'Années d\'expérience' },
          { number: '500+', label: 'Clients satisfaits' },
          { number: '1000+', label: 'Projets réalisés' }
        ]
      },
      styles: {
        backgroundColor: 'bg-gray-50',
        padding: 'py-20'
      }
    },
    {
      id: 'contact',
      name: 'Contact',
      content: {
        title: 'Contactez-Nous',
        description: 'Prêt à commencer ? Contactez-nous dès aujourd\'hui',
        email: 'contact@example.com',
        phone: '+33 1 23 45 67 89',
        address: '123 rue Business, 75000 Paris'
      },
      styles: {
        backgroundColor: 'bg-white',
        padding: 'py-20'
      }
    }
  ],

  // Fonction de rendu du template
  render: (content, styles, isPreview = false) => {
    return (
      <div className={`business-template ${styles?.backgroundColor || 'bg-white'}`}>
        {/* Hero Section */}
        <section className={`relative ${styles?.height || 'h-screen'} flex items-center`}>
          {content.backgroundImage && (
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${content.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}
          <div className="relative z-10 container mx-auto px-6">
            <h1 className={`text-5xl font-bold mb-6 ${styles?.textColor || 'text-white'}`}>
              {content.title}
            </h1>
            <p className={`text-xl mb-8 ${styles?.textColor || 'text-white'}`}>
              {content.subtitle}
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700">
              {content.cta}
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section className={`${styles?.padding || 'py-20'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">{content.services?.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.services?.services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={`${styles?.backgroundColor || 'bg-gray-50'} ${styles?.padding || 'py-20'}`}>
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
                <h2 className="text-3xl font-bold mb-6">{content.about?.title}</h2>
                <p className="text-gray-600 mb-8">{content.about?.description}</p>
                <div className="grid grid-cols-3 gap-8">
                  {content.about?.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <img
                  src={content.about?.image}
                  alt="À propos"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`${styles?.backgroundColor || 'bg-white'} ${styles?.padding || 'py-20'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">{content.contact?.title}</h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  },

  // Éditeur de template
  editor: (content, styles, onUpdate) => {
    return (
      <div className="space-y-6">
        {/* Éditeur de Hero Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Section Hero</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sous-titre</label>
              <input
                type="text"
                value={content.subtitle}
                onChange={(e) => onUpdate({ subtitle: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Texte du bouton
              </label>
              <input
                type="text"
                value={content.cta}
                onChange={(e) => onUpdate({ cta: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Éditeur de style */}
        <div>
          <h3 className="text-lg font-medium mb-4">Style</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Couleur de fond
              </label>
              <select
                value={styles.backgroundColor}
                onChange={(e) => onUpdate({ styles: { ...styles, backgroundColor: e.target.value } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="bg-white">Blanc</option>
                <option value="bg-gray-50">Gris clair</option>
                <option value="bg-indigo-900">Indigo foncé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Couleur du texte
              </label>
              <select
                value={styles.textColor}
                onChange={(e) => onUpdate({ styles: { ...styles, textColor: e.target.value } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="text-white">Blanc</option>
                <option value="text-gray-900">Noir</option>
                <option value="text-indigo-600">Indigo</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BusinessTemplate;
