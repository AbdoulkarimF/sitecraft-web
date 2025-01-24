import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [siteName, setSiteName] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${API_URL}/api/templates`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la récupération des templates');
      }

      setTemplates(data.templates || []);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSite = async (templateId) => {
    if (!siteName.trim()) {
      setError('Le nom du site est requis');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour créer un site');
      }

      const response = await fetch(`${API_URL}/api/sites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: siteName,
          template: templateId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Token invalide, déconnexion de l'utilisateur
          logout();
          navigate('/login');
          return;
        }
        throw new Error(data.error || 'Erreur lors de la création du site');
      }

      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur lors de la création du site:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Choisir un template</h1>
        <div className="mb-4">
          <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
            Nom du site
          </label>
          <input
            type="text"
            id="siteName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Mon super site"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <button
                onClick={() => handleCreateSite(template.id)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Utiliser ce template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
