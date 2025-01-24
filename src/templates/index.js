export const templates = {
  business: {
    name: 'Business',
    description: 'Template professionnel pour entreprises',
    preview: '/templates/business-preview.jpg',
    components: [
      {
        type: 'hero',
        content: {
          title: 'Solutions Professionnelles',
          subtitle: 'Propulsez votre entreprise vers le succès',
          buttonText: 'Nos Services',
          backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c'
        }
      },
      {
        type: 'services',
        content: {
          title: 'Nos Services',
          subtitle: 'Des solutions adaptées à vos besoins',
          services: [
            {
              id: 1,
              title: 'Consulting',
              description: 'Expertise professionnelle',
              icon: '💼'
            },
            {
              id: 2,
              title: 'Stratégie',
              description: 'Plans d\'action personnalisés',
              icon: '🎯'
            },
            {
              id: 3,
              title: 'Innovation',
              description: 'Solutions créatives',
              icon: '💡'
            }
          ]
        }
      },
      {
        type: 'about',
        content: {
          title: 'À Propos',
          description: 'Une expertise reconnue depuis plus de 10 ans'
        }
      },
      {
        type: 'contact',
        content: {
          title: 'Contact',
          subtitle: 'Parlons de votre projet'
        }
      }
    ]
  },
  portfolio: {
    name: 'Portfolio',
    description: 'Parfait pour les créatifs et freelances',
    preview: '/templates/portfolio-preview.jpg',
    components: [
      {
        type: 'hero',
        content: {
          title: 'Portfolio Créatif',
          subtitle: 'Découvrez mes réalisations',
          buttonText: 'Voir mes projets',
          backgroundImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5'
        }
      },
      {
        type: 'about',
        content: {
          title: 'Qui suis-je ?',
          description: 'Créatif passionné par le design et l\'innovation'
        }
      },
      {
        type: 'services',
        content: {
          title: 'Services',
          subtitle: 'Ce que je peux faire pour vous',
          services: [
            {
              id: 1,
              title: 'Design UI/UX',
              description: 'Interfaces modernes et intuitives',
              icon: '🎨'
            },
            {
              id: 2,
              title: 'Développement Web',
              description: 'Sites web sur mesure',
              icon: '💻'
            }
          ]
        }
      },
      {
        type: 'contact',
        content: {
          title: 'Me Contacter',
          subtitle: 'Discutons de votre projet'
        }
      }
    ]
  },
  blog: {
    name: 'Blog',
    description: 'Idéal pour les écrivains et journalistes',
    preview: '/templates/blog-preview.jpg',
    components: [
      {
        type: 'hero',
        content: {
          title: 'Mon Blog',
          subtitle: 'Pensées, idées et actualités',
          buttonText: 'Lire les articles',
          backgroundImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
        }
      },
      {
        type: 'about',
        content: {
          title: 'L\'Auteur',
          description: 'Passionné par l\'écriture et le partage de connaissances'
        }
      },
      {
        type: 'contact',
        content: {
          title: 'Contact',
          subtitle: 'Envie de collaborer ?'
        }
      }
    ]
  }
};
