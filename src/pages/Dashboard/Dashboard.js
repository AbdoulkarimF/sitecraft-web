import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/sites`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la récupération des sites');
      }

      console.log('Sites récupérés:', data.sites);
      setSites(data.sites || []);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600 mt-2">Bienvenue, {user?.username} !</p>
        </div>
        <Link
          to="/templates"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Créer un nouveau site
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {sites.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Vous n'avez pas encore de site
          </h3>
          <p className="text-gray-500 mb-6">
            Commencez par créer votre premier site en choisissant un template
          </p>
          <Link
            to="/templates"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Créer mon premier site
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <div
              key={site.id}
              className="border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{site.name}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <span className="font-medium">Template :</span> {site.template}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Composants :</span> {site.component_count || 0}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Articles :</span> {site.post_count || 0}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Statut :</span>{' '}
                    {site.published ? (
                      <span className="text-green-600">Publié</span>
                    ) : (
                      <span className="text-yellow-600">Brouillon</span>
                    )}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/editor/${site.id}`}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-center"
                  >
                    Modifier
                  </Link>
                  <Link
                    to={`/preview/${site.id}`}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-center"
                  >
                    Prévisualiser
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
