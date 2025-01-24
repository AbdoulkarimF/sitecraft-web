import React, { useState } from 'react';
import EditorSidebar from '../components/editor/EditorSidebar';
import EditorCanvas from '../components/editor/EditorCanvas';
import EditorToolbar from '../components/editor/EditorToolbar';
import BlogEditor from '../components/blog/BlogEditor';
import BlogList from '../components/blog/BlogList';
import BlogPost from '../components/blog/BlogPost';

const TestComponents = () => {
  // États pour l'éditeur de site
  const [sections, setSections] = useState([
    {
      id: '1',
      name: 'Section Hero',
      type: 'hero',
      content: {
        title: 'Bienvenue sur SiteCraft',
        subtitle: 'Créez des sites web professionnels en quelques clics',
        cta: 'Commencer maintenant'
      }
    },
    {
      id: '2',
      name: 'Fonctionnalités',
      type: 'features',
      content: {
        title: 'Nos fonctionnalités',
        features: [
          { title: 'Glisser-déposer', description: 'Interface intuitive' },
          { title: 'Responsive', description: 'Parfait sur tous les écrans' },
          { title: 'SEO', description: 'Optimisé pour les moteurs de recherche' }
        ]
      }
    }
  ]);

  // États pour le blog
  const [posts] = useState([
    {
      id: '1',
      title: 'Comment créer un site web professionnel',
      excerpt: 'Guide complet pour créer votre premier site web...',
      content: '<h2>Introduction</h2><p>Créer un site web professionnel peut sembler intimidant...</p>',
      author: 'John Doe',
      publishedAt: '2025-01-23',
      tags: ['Web Design', 'Tutoriel'],
      featuredImage: 'https://via.placeholder.com/800x400',
      slug: 'creer-site-web-professionnel',
      commentCount: 5,
      comments: [
        {
          id: '1',
          author: 'Marie Martin',
          content: 'Super article, très utile !',
          createdAt: '2025-01-23',
          authorAvatar: 'https://via.placeholder.com/40'
        }
      ]
    }
  ]);

  // Gestionnaires d'événements
  const handleSectionDrop = (startIndex, endIndex) => {
    const newSections = Array.from(sections);
    const [removed] = newSections.splice(startIndex, 1);
    newSections.splice(endIndex, 0, removed);
    setSections(newSections);
  };

  const handleAddSection = () => {
    const newSection = {
      id: Date.now().toString(),
      name: 'Nouvelle section',
      type: 'text',
      content: { text: 'Contenu de la nouvelle section' }
    };
    setSections([...sections, newSection]);
  };

  const handleSave = () => {
    console.log('Sauvegarde en cours...');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-8">Test des Composants</h1>

      {/* Test de l'éditeur de site */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 px-8">Éditeur de Site</h2>
        <div className="bg-white shadow-lg rounded-lg mx-8 mb-8">
          <EditorToolbar
            onSave={handleSave}
            onPreview={() => console.log('Prévisualisation')}
            onPublish={() => console.log('Publication')}
            onSettings={() => console.log('Paramètres')}
          />
          <div className="flex">
            <EditorSidebar
              sections={sections}
              onAddSection={handleAddSection}
              onEditSection={(id) => console.log('Édition section:', id)}
              onDeleteSection={(id) => console.log('Suppression section:', id)}
              onPreview={(id) => console.log('Prévisualisation section:', id)}
            />
            <EditorCanvas sections={sections} onSectionDrop={handleSectionDrop} />
          </div>
        </div>
      </div>

      {/* Test de l'éditeur de blog */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 px-8">Éditeur de Blog</h2>
        <div className="bg-white shadow-lg rounded-lg mx-8 mb-8">
          <BlogEditor
            onSave={(data) => console.log('Sauvegarde article:', data)}
          />
        </div>
      </div>

      {/* Test de la liste des articles */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 px-8">Liste des Articles</h2>
        <BlogList posts={posts} />
      </div>

      {/* Test d'un article */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 px-8">Article Détaillé</h2>
        <BlogPost post={posts[0]} />
      </div>
    </div>
  );
};

export default TestComponents;
