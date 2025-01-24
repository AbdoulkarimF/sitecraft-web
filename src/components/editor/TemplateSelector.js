import React, { useState } from 'react';
import { BusinessTemplate } from './templates/BusinessTemplate';
import { PortfolioTemplate } from './templates/PortfolioTemplate';

const templates = [
  BusinessTemplate,
  PortfolioTemplate,
  // Ajoutez d'autres templates ici
];

const TemplateSelector = ({ onSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSelect = (template) => {
    setSelectedTemplate(template);
    setPreviewMode(true);
  };

  const handleConfirm = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
    }
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Choisir un Template</h2>
        <p className="text-gray-600">
          Sélectionnez un template pour commencer votre site
        </p>
      </div>

      <div className="flex-1 overflow-auto">
        {!previewMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSelect(template)}
              >
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {template.sections.length} sections incluses
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-auto">
              {selectedTemplate?.render(
                selectedTemplate.sections[0].content,
                selectedTemplate.sections[0].styles,
                true
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={() => setPreviewMode(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ← Retour
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Utiliser ce template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
