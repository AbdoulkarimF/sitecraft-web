import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { createAutoSave } from '../../utils/autosave';

const BlogEditor = ({ initialContent, onSave }) => {
  const [title, setTitle] = useState(initialContent?.title || '');
  const [published, setPublished] = useState(initialContent?.published || false);
  const editorRef = useRef(null);

  // Configuration de la sauvegarde automatique
  const autoSave = createAutoSave(async (content) => {
    if (onSave) {
      await onSave(content);
    }
  }, 2000);

  const handleEditorChange = (content, editor) => {
    autoSave.saveContent({
      title,
      content,
      published,
      lastModified: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l'article"
          className="w-full text-4xl font-bold border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 pb-2"
        />
      </div>

      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={initialContent?.content || ''}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; }',
          skin: 'oxide',
        }}
        onEditorChange={handleEditorChange}
      />

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Publier l'article</span>
          </label>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => {
              // Prévisualisation
              const content = editorRef.current.getContent();
              window.open(`/blog/preview?content=${encodeURIComponent(content)}`, '_blank');
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Prévisualiser
          </button>
          
          <button
            onClick={() => {
              const content = editorRef.current.getContent();
              onSave?.({
                title,
                content,
                published,
                lastModified: new Date().toISOString()
              });
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
