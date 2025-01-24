import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SiteService from '../../services/SiteService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Dashboard() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchSites();
  }, [user, navigate]);

  const fetchSites = async () => {
    try {
      setLoading(true);
      setError('');
      const fetchedSites = await SiteService.fetchSites();
      setSites(fetchedSites || []);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Une erreur est survenue lors du chargement de vos sites.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Redirection gérée dans useEffect
  }

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
          <p className="text-gray-600 mt-2">Bienvenue, {user.username || 'utilisateur'} !</p>
        </div>
        <Link
          to="/new-site"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Créer un nouveau site
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {sites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Vous n'avez pas encore créé de site</h2>
          <p className="text-gray-600 mb-6">
            Commencez par créer votre premier site en cliquant sur le bouton ci-dessous
          </p>
          <Link
            to="/new-site"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Commencer maintenant
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{site.name}</h3>
              <p className="text-gray-600 mb-4">{site.description}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/editor/${site.id}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Modifier
                </Link>
                <span className="text-sm text-gray-500">
                  Mis à jour le {new Date(site.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
