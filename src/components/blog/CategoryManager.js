import React, { useState, useEffect } from 'react';

const CategoryManager = ({ onCategoryChange, onTagChange, initialCategories = [], initialTags = [] }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [tags, setTags] = useState(initialTags);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (onCategoryChange) {
      onCategoryChange(categories);
    }
  }, [categories, onCategoryChange]);

  useEffect(() => {
    if (onTagChange) {
      onTagChange(tags);
    }
  }, [tags, onTagChange]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveCategory = (category) => {
    setCategories(categories.filter(c => c !== category));
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="space-y-6">
      {/* Gestionnaire de catégories */}
      <div>
        <h3 className="text-lg font-medium mb-4">Catégories</h3>
        <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nouvelle catégorie"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Ajouter
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
            >
              <span>{category}</span>
              <button
                onClick={() => handleRemoveCategory(category)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Gestionnaire de tags */}
      <div>
        <h3 className="text-lg font-medium mb-4">Tags</h3>
        <form onSubmit={handleAddTag} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Nouveau tag"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Ajouter
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
