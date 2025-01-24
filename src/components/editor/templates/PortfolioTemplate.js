import React from 'react';

export const PortfolioTemplate = {
  id: 'portfolio',
  name: 'Portfolio Créatif',
  thumbnail: '/templates/portfolio-preview.jpg',
  sections: [
    {
      id: 'hero',
      name: 'Introduction',
      content: {
        name: 'John Doe',
        title: 'Designer & Développeur',
        description: 'Créant des expériences numériques uniques',
        image: '/templates/portfolio/profile.jpg',
        socialLinks: [
          { icon: '🔗', url: 'https://linkedin.com', label: 'LinkedIn' },
          { icon: '🐦', url: 'https://twitter.com', label: 'Twitter' },
          { icon: '📸', url: 'https://instagram.com', label: 'Instagram' }
        ]
      },
      styles: {
        backgroundColor: 'bg-gray-900',
        textColor: 'text-white',
        height: 'min-h-screen'
      }
    },
    {
      id: 'projects',
      name: 'Projets',
      content: {
        title: 'Mes Projets',
        description: 'Une sélection de mes meilleurs travaux',
        projects: [
          {
            title: 'Projet 1',
            description: 'Design d\'interface utilisateur',
            image: '/templates/portfolio/project1.jpg',
            tags: ['UI/UX', 'Web Design']
          },
          {
            title: 'Projet 2',
            description: 'Application Mobile',
            image: '/templates/portfolio/project2.jpg',
            tags: ['Mobile', 'React Native']
          },
          {
            title: 'Projet 3',
            description: 'Site E-commerce',
            image: '/templates/portfolio/project3.jpg',
            tags: ['E-commerce', 'Web']
          }
        ]
      },
      styles: {
        backgroundColor: 'bg-white',
        padding: 'py-20'
      }
    },
    {
      id: 'skills',
      name: 'Compétences',
      content: {
        title: 'Mes Compétences',
        skills: [
          { name: 'Design UI/UX', level: 90 },
          { name: 'Développement Frontend', level: 85 },
          { name: 'React / React Native', level: 80 },
          { name: 'Node.js', level: 75 }
        ]
      },
      styles: {
        backgroundColor: 'bg-gray-50',
        padding: 'py-20'
      }
    }
  ],

  // Fonction de rendu du template
  render: (content, styles, isPreview = false) => {
    return (
      <div className="portfolio-template">
        {/* Hero Section */}
        <section className={`${styles.backgroundColor} ${styles.height} flex items-center`}>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <h1 className={`text-5xl font-bold mb-4 ${styles.textColor}`}>
                  {content.name}
                </h1>
                <h2 className={`text-2xl mb-6 ${styles.textColor} opacity-90`}>
                  {content.title}
                </h2>
                <p className={`text-xl mb-8 ${styles.textColor} opacity-80`}>
                  {content.description}
                </p>
                <div className="flex space-x-4">
                  {content.socialLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-2xl ${styles.textColor} hover:opacity-75`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src={content.image}
                  alt={content.name}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className={`${styles.backgroundColor} ${styles.padding}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              {content.projects?.title}
            </h2>
            <p className="text-gray-600 text-center mb-12">
              {content.projects?.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.projects?.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className={`${styles.backgroundColor} ${styles.padding}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              {content.skills?.title}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {content.skills?.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  },

  // Éditeur de template
  editor: (content, styles, onUpdate) => {
    return (
      <div className="space-y-6">
        {/* Informations personnelles */}
        <div>
          <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                value={content.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={content.description}
                onChange={(e) => onUpdate({ description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Style */}
        <div>
          <h3 className="text-lg font-medium mb-4">Style</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Couleur de fond
              </label>
              <select
                value={styles.backgroundColor}
                onChange={(e) =>
                  onUpdate({ styles: { ...styles, backgroundColor: e.target.value } })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="bg-gray-900">Noir</option>
                <option value="bg-white">Blanc</option>
                <option value="bg-gray-50">Gris clair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Couleur du texte
              </label>
              <select
                value={styles.textColor}
                onChange={(e) =>
                  onUpdate({ styles: { ...styles, textColor: e.target.value } })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="text-white">Blanc</option>
                <option value="text-gray-900">Noir</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PortfolioTemplate;
