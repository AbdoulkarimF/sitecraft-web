import React from 'react';

export const sectionTemplates = {
  hero: {
    name: 'Section Héro',
    icon: 'SparklesIcon',
    defaultContent: {
      title: 'Titre principal',
      subtitle: 'Sous-titre accrocheur',
      cta: 'En savoir plus',
      backgroundImage: '',
    },
    preview: (
      <div className="relative bg-indigo-800 text-white py-24 px-8">
        <h1 className="text-4xl font-bold mb-4">Titre principal</h1>
        <p className="text-xl mb-8">Sous-titre accrocheur</p>
        <button className="bg-white text-indigo-800 px-6 py-3 rounded-md">
          En savoir plus
        </button>
      </div>
    ),
  },

  features: {
    name: 'Fonctionnalités',
    icon: 'ViewColumnsIcon',
    defaultContent: {
      title: 'Nos fonctionnalités',
      features: [
        {
          title: 'Fonctionnalité 1',
          description: 'Description de la fonctionnalité 1',
          icon: 'LightBulbIcon',
        },
        {
          title: 'Fonctionnalité 2',
          description: 'Description de la fonctionnalité 2',
          icon: 'ShieldCheckIcon',
        },
        {
          title: 'Fonctionnalité 3',
          description: 'Description de la fonctionnalité 3',
          icon: 'ChartBarIcon',
        },
      ],
    },
    preview: (
      <div className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Nos fonctionnalités</h2>
        <div className="grid grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Fonctionnalité {i}</h3>
              <p className="text-gray-600">Description de la fonctionnalité {i}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  testimonials: {
    name: 'Témoignages',
    icon: 'ChatBubbleBottomCenterTextIcon',
    defaultContent: {
      title: 'Ce que disent nos clients',
      testimonials: [
        {
          quote: 'Un excellent service !',
          author: 'Jean Dupont',
          role: 'CEO, Entreprise',
          avatar: '',
        },
        {
          quote: 'Exactement ce dont nous avions besoin.',
          author: 'Marie Martin',
          role: 'Designer, Studio',
          avatar: '',
        },
      ],
    },
    preview: (
      <div className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce que disent nos clients
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">
                "Un excellent service ! Exactement ce dont nous avions besoin."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Jean Dupont</p>
                  <p className="text-sm text-gray-500">CEO, Entreprise</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  pricing: {
    name: 'Tarifs',
    icon: 'CurrencyEuroIcon',
    defaultContent: {
      title: 'Nos tarifs',
      description: 'Choisissez le plan qui vous convient',
      plans: [
        {
          name: 'Basic',
          price: '9.99',
          currency: '€',
          period: 'mois',
          features: [
            'Fonctionnalité 1',
            'Fonctionnalité 2',
            'Fonctionnalité 3',
          ],
        },
        {
          name: 'Pro',
          price: '29.99',
          currency: '€',
          period: 'mois',
          features: [
            'Tout du plan Basic',
            'Fonctionnalité 4',
            'Fonctionnalité 5',
          ],
        },
      ],
    },
    preview: (
      <div className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Nos tarifs</h2>
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-lg p-8">
              <h3 className="font-bold text-xl mb-4">
                {i === 1 ? 'Basic' : 'Pro'}
              </h3>
              <p className="text-3xl font-bold mb-6">
                {i === 1 ? '9.99' : '29.99'}€
                <span className="text-base font-normal text-gray-500">/mois</span>
              </p>
              <ul className="space-y-4 mb-8">
                {[1, 2, 3].map((j) => (
                  <li key={j} className="flex items-center">
                    <span className="w-4 h-4 bg-green-100 rounded-full mr-2" />
                    Fonctionnalité {j}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-md bg-indigo-600 text-white">
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  contact: {
    name: 'Contact',
    icon: 'EnvelopeIcon',
    defaultContent: {
      title: 'Contactez-nous',
      description: 'Nous sommes là pour vous aider',
      email: 'contact@example.com',
      phone: '+33 1 23 45 67 89',
      address: '123 rue Example, 75000 Paris',
    },
    preview: (
      <div className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md"
                rows={4}
                placeholder="Votre message"
              />
            </div>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-md">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    ),
  },
};

export default sectionTemplates;
