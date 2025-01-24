import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusIcon } from '@heroicons/react/24/outline';

const DragDropEditor = () => {
  const [components, setComponents] = useState([]);
  const [availableBlocks] = useState([
    { id: 'hero', title: 'Hero Section', type: 'hero' },
    { id: 'about', title: 'À Propos', type: 'about' },
    { id: 'services', title: 'Services', type: 'services' },
    { id: 'contact', title: 'Contact', type: 'contact' },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
  };

  const addComponent = (type) => {
    const newComponent = {
      id: `${type}-${Date.now()}`,
      type,
      content: {},
    };
    setComponents([...components, newComponent]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar avec les composants disponibles */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Composants</h2>
        <div className="space-y-2">
          {availableBlocks.map((block) => (
            <button
              key={block.id}
              onClick={() => addComponent(block.type)}
              className="w-full flex items-center p-2 rounded hover:bg-gray-100"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              {block.title}
            </button>
          ))}
        </div>
      </div>

      {/* Zone d'édition principale */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="editor">
          {(provided) => (
            <div
              className="flex-1 p-8"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {components.map((component, index) => (
                <Draggable
                  key={component.id}
                  draggableId={component.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 mb-4 rounded shadow-sm"
                    >
                      <ComponentRenderer type={component.type} />
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
  );
};

// Composant pour rendre les différents types de blocs
const ComponentRenderer = ({ type }) => {
  switch (type) {
    case 'hero':
      return <div className="min-h-[300px] bg-gray-50">Section Hero</div>;
    case 'about':
      return <div className="min-h-[200px] bg-gray-50">Section À Propos</div>;
    case 'services':
      return <div className="min-h-[250px] bg-gray-50">Section Services</div>;
    case 'contact':
      return <div className="min-h-[200px] bg-gray-50">Section Contact</div>;
    default:
      return null;
  }
};

export default DragDropEditor;
