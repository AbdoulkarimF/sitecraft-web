import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CloudArrowUpIcon, PhotoIcon, TagIcon } from '@heroicons/react/24/outline';

const BlogEditor = ({ onSave, initialContent = '' }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ title, content, tags, featuredImage });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Éditeur d'article</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSaving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <CloudArrowUpIcon className="w-4 h-4 mr-2" />
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Image à la une */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        {featuredImage ? (
          <div className="relative">
            <img
              src={featuredImage}
              alt="Featured"
              className="max-h-64 mx-auto rounded-lg"
            />
            <button
              onClick={() => setFeaturedImage(null)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
            >
              ×
            </button>
          </div>
        ) : (
          <div>
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <label className="mt-2 block text-sm font-medium text-indigo-600 cursor-pointer">
              Ajouter une image à la une
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        )}
      </div>

      {/* Titre */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de l'article"
        className="w-full text-4xl font-bold border-none focus:ring-0 placeholder-gray-300"
      />

      {/* Tags */}
      <div className="flex items-center space-x-2">
        <TagIcon className="h-5 w-5 text-gray-400" />
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {tag}
              <button
                onClick={() => removeTag(index)}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Ajouter un tag..."
            onKeyPress={handleTagInput}
            className="border-none focus:ring-0 text-sm"
          />
        </div>
      </div>

      {/* Éditeur de contenu */}
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        className="h-96 mb-12"
      />
    </div>
  );
};

export default BlogEditor;
