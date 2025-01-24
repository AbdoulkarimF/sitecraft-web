import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EditorCanvas = ({ sections, onSectionDrop }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onSectionDrop(result.source.index, result.destination.index);
  };

  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="max-w-4xl mx-auto space-y-8"
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-white rounded-lg shadow-sm p-6 ${
                        snapshot.isDragging ? 'shadow-lg' : ''
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-4">{section.name}</h3>
                      {renderSectionContent(section)}
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

const renderSectionContent = (section) => {
  switch (section.type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <input
            type="text"
            className="w-full text-4xl font-bold border-none focus:ring-0"
            placeholder="Titre principal"
            value={section.content.title}
          />
          <input
            type="text"
            className="w-full text-xl text-gray-600 border-none focus:ring-0"
            placeholder="Sous-titre"
            value={section.content.subtitle}
          />
          <input
            type="text"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md"
            placeholder="Texte du bouton"
            value={section.content.cta}
          />
        </div>
      );

    case 'text':
      return (
        <textarea
          className="w-full min-h-[200px] border-none focus:ring-0"
          placeholder="Votre contenu ici..."
          value={section.content.text}
        />
      );

    case 'gallery':
      return (
        <div className="grid grid-cols-3 gap-4">
          {section.content.images.map((image, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1">
              <img
                src={image.url}
                alt={image.alt}
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      );

    default:
      return <p>Type de section non pris en charge</p>;
  }
};

export default EditorCanvas;
