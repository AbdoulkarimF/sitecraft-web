import React from 'react';
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  EyeIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const EditorToolbar = ({ onSave, onPreview, onPublish, onSettings, isSaving }) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onSave}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSaving
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={isSaving}
        >
          {isSaving ? (
            <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <CloudArrowUpIcon className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>

        <button
          onClick={onPreview}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <EyeIcon className="w-4 h-4 mr-2" />
          Prévisualiser
        </button>

        <button
          onClick={onPublish}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          Publier
        </button>
      </div>

      <button
        onClick={onSettings}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
      >
        <Cog6ToothIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default EditorToolbar;
