import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const VersionHistory = ({ siteId }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [comparing, setComparing] = useState(false);

  useEffect(() => {
    fetchVersions();
  }, [siteId]);

  const fetchVersions = async () => {
    try {
      // Simuler un appel API
      const mockVersions = [
        {
          id: 1,
          timestamp: new Date(),
          author: 'John Doe',
          changes: ['Modification du header', 'Ajout d\'une section contact'],
          thumbnail: 'version1.jpg'
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 86400000),
          author: 'Jane Smith',
          changes: ['Mise à jour du style', 'Correction de bugs'],
          thumbnail: 'version2.jpg'
        }
      ];
      setVersions(mockVersions);
    } catch (error) {
      console.error('Erreur lors du chargement des versions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (versionId) => {
    try {
      setLoading(true);
      // Appel API pour restaurer la version
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Version restaurée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (version) => {
    setSelectedVersion(version);
    setComparing(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Historique des Versions
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Consultez et restaurez les versions précédentes de votre site
        </p>
      </div>

      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {versions.map((version) => (
            <li key={version.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-24 object-cover rounded"
                      src={version.thumbnail}
                      alt={`Version ${version.id}`}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      Version {version.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(version.timestamp, 'PPP à HH:mm', { locale: fr })}
                    </div>
                    <div className="text-sm text-gray-500">
                      Par {version.author}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCompare(version)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Comparer
                  </button>
                  <button
                    onClick={() => handleRestore(version.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Restaurer
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-500">
                  Modifications :
                  <ul className="mt-1 list-disc list-inside">
                    {version.changes.map((change, index) => (
                      <li key={index}>{change}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {comparing && selectedVersion && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Comparaison avec la version {selectedVersion.id}
              </h3>
              <button
                onClick={() => setComparing(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Fermer</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Version actuelle</h4>
                <div className="border rounded p-4">
                  {/* Aperçu de la version actuelle */}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Version {selectedVersion.id}</h4>
                <div className="border rounded p-4">
                  {/* Aperçu de la version sélectionnée */}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleRestore(selectedVersion.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Restaurer cette version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionHistory;
