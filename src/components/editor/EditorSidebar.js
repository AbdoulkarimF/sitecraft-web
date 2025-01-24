import React from 'react';
import { PlusIcon, PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';

const EditorSidebar = ({ sections, onAddSection, onEditSection, onDeleteSection, onPreview }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Sections</h2>
        <button
          onClick={onAddSection}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
          title="Ajouter une section"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <span className="font-medium text-gray-700">{section.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEditSection(section.id)}
                className="p-1 text-gray-500 hover:text-indigo-600"
                title="Modifier"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => onPreview(section.id)}
                className="p-1 text-gray-500 hover:text-indigo-600"
                title="Prévisualiser"
              >
                <EyeIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteSection(section.id)}
                className="p-1 text-gray-500 hover:text-red-600"
                title="Supprimer"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorSidebar;
