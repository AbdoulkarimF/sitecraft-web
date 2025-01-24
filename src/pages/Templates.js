import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const templates = [
  {
    id: 'portfolio',
    name: 'Portfolio Professionnel',
    description: 'Parfait pour les créatifs et les professionnels',
    image: '/templates/portfolio.jpg',
    sections: ['hero', 'about', 'projects', 'contact']
  },
  {
    id: 'business',
    name: 'Site Entreprise',
    description: 'Idéal pour les entreprises et startups',
    image: '/templates/business.jpg',
    sections: ['hero', 'services', 'testimonials', 'contact']
  },
  {
    id: 'blog',
    name: 'Blog Personnel',
    description: 'Pour partager vos histoires et articles',
    image: '/templates/blog.jpg',
    sections: ['hero', 'posts', 'about', 'newsletter']
  }
];

function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [siteName, setSiteName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateSite = async () => {
    if (!selectedTemplate || !siteName.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: siteName,
          templateId: selectedTemplate.id
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      navigate(`/editor/${data.siteId}`);
    } catch (error) {
      console.error('Erreur lors de la création du site:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Choisissez un modèle pour votre site
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-shadow hover:shadow-lg ${
              selectedTemplate?.id === template.id ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                src={template.image}
                alt={template.name}
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Configurez votre site
          </h2>
          <div className="max-w-md">
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
              Nom de votre site
            </label>
            <input
              type="text"
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Mon super site"
            />
            <button
              onClick={handleCreateSite}
              disabled={loading || !siteName.trim()}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {loading ? 'Création...' : 'Créer mon site'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Templates;
