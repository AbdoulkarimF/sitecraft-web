import React from 'react';
import { templates } from '../../templates';

const TemplateSelector = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">
          Choisissez votre Template
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(templates).map(([key, template]) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=Preview+Not+Available';
                  }}
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <div className="space-y-4">
                  <button
                    onClick={() => onSelect(key, template)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Utiliser ce template
                  </button>
                  
                  <button
                    onClick={() => window.open(`/preview/${key}`, '_blank')}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    Aperçu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
