import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { debounce } from 'lodash';
import EditorToolbar from './EditorToolbar';
import EditorSidebar from './EditorSidebar';
import { sectionTemplates } from './SectionTemplates';
import { useAuth } from '../../contexts/AuthContext';

const SiteEditor = ({ siteId }) => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { currentUser } = useAuth();

  // Chargement initial des données du site
  useEffect(() => {
    const loadSiteData = async () => {
      try {
        const response = await fetch(`/api/sites/${siteId}`);
        const data = await response.json();
        setSections(data.sections || []);
      } catch (error) {
        console.error('Erreur lors du chargement du site:', error);
      }
    };

    if (siteId) {
      loadSiteData();
    }
  }, [siteId]);

  // Sauvegarde automatique avec debounce
  const saveChanges = useCallback(
    debounce(async (updatedSections) => {
      try {
        setIsSaving(true);
        await fetch(`/api/sites/${siteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`
          },
          body: JSON.stringify({ sections: updatedSections })
        });
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
      } finally {
        setIsSaving(false);
      }
    }, 2000),
    [siteId, currentUser]
  );

  // Gestionnaire de drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [reorderedSection] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedSection);

    setSections(newSections);
    saveChanges(newSections);
  };

  // Ajout d'une nouvelle section
  const handleAddSection = (templateId) => {
    const template = sectionTemplates[templateId];
    const newSection = {
      id: Date.now().toString(),
      type: templateId,
      content: { ...template.defaultContent },
      styles: { ...template.defaultStyles }
    };

    const newSections = [...sections, newSection];
    setSections(newSections);
    saveChanges(newSections);
  };

  // Mise à jour d'une section
  const handleUpdateSection = (sectionId, updates) => {
    const newSections = sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    );
    setSections(newSections);
    saveChanges(newSections);
  };

  // Suppression d'une section
  const handleDeleteSection = (sectionId) => {
    const newSections = sections.filter(section => section.id !== sectionId);
    setSections(newSections);
    saveChanges(newSections);
  };

  // Duplication d'une section
  const handleDuplicateSection = (sectionId) => {
    const sectionToDuplicate = sections.find(section => section.id === sectionId);
    if (!sectionToDuplicate) return;

    const duplicatedSection = {
      ...sectionToDuplicate,
      id: Date.now().toString()
    };

    const newSections = [...sections, duplicatedSection];
    setSections(newSections);
    saveChanges(newSections);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <EditorSidebar
        sections={sections}
        templates={sectionTemplates}
        onAddSection={handleAddSection}
        onSelectSection={setSelectedSection}
      />

      <div className="flex-1 flex flex-col">
        <EditorToolbar
          isSaving={isSaving}
          previewMode={previewMode}
          onTogglePreview={() => setPreviewMode(!previewMode)}
          onSave={() => saveChanges(sections)}
          onPublish={() => {/* Logique de publication */}}
        />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="site-sections">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 overflow-y-auto bg-gray-50 p-8"
              >
                {sections.map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`mb-8 ${
                          snapshot.isDragging ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="group relative bg-white rounded-lg shadow-sm">
                          {/* Barre d'outils de section */}
                          <div className="absolute top-0 right-0 hidden group-hover:flex items-center space-x-2 p-2 bg-white rounded-tr-lg">
                            <button
                              {...provided.dragHandleProps}
                              className="p-2 hover:bg-gray-100 rounded"
                              title="Déplacer"
                            >
                              ⋮⋮
                            </button>
                            <button
                              onClick={() => handleDuplicateSection(section.id)}
                              className="p-2 hover:bg-gray-100 rounded"
                              title="Dupliquer"
                            >
                              📋
                            </button>
                            <button
                              onClick={() => setSelectedSection(section)}
                              className="p-2 hover:bg-gray-100 rounded"
                              title="Éditer"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteSection(section.id)}
                              className="p-2 hover:bg-red-100 text-red-600 rounded"
                              title="Supprimer"
                            >
                              🗑️
                            </button>
                          </div>

                          {/* Contenu de la section */}
                          <div
                            className={`p-6 ${
                              selectedSection?.id === section.id
                                ? 'ring-2 ring-indigo-500'
                                : ''
                            }`}
                          >
                            {renderSection(section, previewMode)}
                          </div>
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

      {/* Panneau d'édition de section */}
      {selectedSection && (
        <div className="w-80 border-l border-gray-200 bg-white p-6 overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">Édition de section</h3>
          <SectionEditor
            section={selectedSection}
            onUpdate={(updates) => handleUpdateSection(selectedSection.id, updates)}
            onClose={() => setSelectedSection(null)}
          />
        </div>
      )}
    </div>
  );
};

// Fonction de rendu des sections
const renderSection = (section, isPreview) => {
  const template = sectionTemplates[section.type];
  if (!template) return null;

  return template.render(section.content, section.styles, isPreview);
};

// Composant d'édition de section
const SectionEditor = ({ section, onUpdate, onClose }) => {
  const template = sectionTemplates[section.type];
  if (!template) return null;

  return (
    <div className="space-y-6">
      {template.editor(section.content, section.styles, onUpdate)}
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
      >
        Fermer
      </button>
    </div>
  );
};

export default SiteEditor;
