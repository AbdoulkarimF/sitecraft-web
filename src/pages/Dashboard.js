import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/sites', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      setSites(data.sites);
    } catch (err) {
      setError('Erreur lors du chargement de vos sites');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <Link
          to="/templates"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Créer un nouveau site
        </Link>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {sites.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              Vous n'avez pas encore créé de site. 
              <Link to="/templates" className="text-indigo-600 hover:text-indigo-500 ml-1">
                Commencer maintenant
              </Link>
            </li>
          ) : (
            sites.map((site) => (
              <li key={site.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{site.name}</h3>
                    <p className="text-sm text-gray-500">{site.description}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      to={`/editor/${site.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Modifier
                    </Link>
                    <a
                      href={site.publishedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Voir le site
                    </a>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
