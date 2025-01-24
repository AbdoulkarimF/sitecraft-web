import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const componentTypes = {
  hero: {
    name: 'Section Hero',
    icon: '🎯',
    defaultContent: {
      title: 'Titre principal',
      subtitle: 'Sous-titre accrocheur',
      buttonText: 'En savoir plus'
    }
  },
  about: {
    name: 'À propos',
    icon: '👋',
    defaultContent: {
      title: 'À propos de nous',
      content: 'Partagez votre histoire ici'
    }
  },
  services: {
    name: 'Services',
    icon: '⚡',
    defaultContent: {
      title: 'Nos Services',
      services: [
        { title: 'Service 1', description: 'Description du service 1' },
        { title: 'Service 2', description: 'Description du service 2' },
        { title: 'Service 3', description: 'Description du service 3' }
      ]
    }
  },
  contact: {
    name: 'Contact',
    icon: '📧',
    defaultContent: {
      title: 'Contactez-nous',
      email: 'email@example.com',
      phone: '+33 1 23 45 67 89'
    }
  }
};

function Editor() {
  const { siteId } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSite();
  }, [siteId]);

  const fetchSite = async () => {
    try {
      const response = await fetch(`/api/sites/${siteId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      setSite(data);
    } catch (err) {
      setError('Erreur lors du chargement du site');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(site.components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSite({ ...site, components: items });
    await saveSite({ ...site, components: items });
  };

  const saveSite = async (updatedSite) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/sites/${siteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedSite)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (err) {
      setError('Erreur lors de la sauvegarde du site');
    } finally {
      setSaving(false);
    }
  };

  const handleComponentEdit = (component, updatedContent) => {
    const updatedComponents = site.components.map(c =>
      c.id === component.id ? { ...c, content: updatedContent } : c
    );
    setSite({ ...site, components: updatedComponents });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar des composants */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900">Composants</h2>
          <div className="mt-4 space-y-2">
            {Object.entries(componentTypes).map(([type, info]) => (
              <div
                key={type}
                className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  const newComponent = {
                    id: Date.now(),
                    type,
                    content: info.defaultContent
                  };
                  setSite({
                    ...site,
                    components: [...site.components, newComponent]
                  });
                }}
              >
                <span className="mr-2">{info.icon}</span>
                {info.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone d'édition principale */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto py-8">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="components">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {site.components.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={String(component.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white rounded-lg shadow p-4"
                          onClick={() => setSelectedComponent(component)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">
                              {componentTypes[component.type].name}
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const newComponents = site.components.filter(
                                  c => c.id !== component.id
                                );
                                setSite({ ...site, components: newComponents });
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              Supprimer
                            </button>
                          </div>
                          {/* Aperçu du contenu */}
                          <div className="mt-2 text-sm text-gray-600">
                            {component.type === 'hero' && (
                              <div>
                                <h4>{component.content.title}</h4>
                                <p>{component.content.subtitle}</p>
                              </div>
                            )}
                            {/* Ajouter d'autres types de composants ici */}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* Panel d'édition du composant sélectionné */}
      {selectedComponent && (
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Éditer {componentTypes[selectedComponent.type].name}
          </h2>
          <div className="space-y-4">
            {Object.entries(selectedComponent.content).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">
                  {key}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const updatedContent = {
                      ...selectedComponent.content,
                      [key]: e.target.value
                    };
                    handleComponentEdit(selectedComponent, updatedContent);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Barre d'état */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {saving ? 'Sauvegarde en cours...' : 'Toutes les modifications sont enregistrées'}
          </div>
          <button
            onClick={() => window.open(`/preview/${siteId}`, '_blank')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Aperçu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
