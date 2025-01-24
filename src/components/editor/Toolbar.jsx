import React from 'react';
import {
  PencilIcon,
  PhotoIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

const Toolbar = ({ onEdit, onDelete, onMoveUp, onMoveDown, position = 'top' }) => {
  return (
    <div className={`
      absolute ${position === 'top' ? '-top-4' : '-bottom-4'} left-1/2 transform -translate-x-1/2
      bg-white shadow-lg rounded-lg px-2 py-1 flex items-center space-x-2
      opacity-0 group-hover:opacity-100 transition-opacity
    `}>
      <button
        onClick={onEdit}
        className="p-1 hover:bg-gray-100 rounded"
        title="Éditer"
      >
        <PencilIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => {}} // Pour l'upload d'image
        className="p-1 hover:bg-gray-100 rounded"
        title="Changer l'image"
      >
        <PhotoIcon className="h-4 w-4" />
      </button>
      <button
        onClick={onMoveUp}
        className="p-1 hover:bg-gray-100 rounded"
        title="Déplacer vers le haut"
      >
        <ArrowUpIcon className="h-4 w-4" />
      </button>
      <button
        onClick={onMoveDown}
        className="p-1 hover:bg-gray-100 rounded"
        title="Déplacer vers le bas"
      >
        <ArrowDownIcon className="h-4 w-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-1 hover:bg-gray-100 rounded text-red-500"
        title="Supprimer"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toolbar;
