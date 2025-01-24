import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Joyride, { STATUS } from 'react-joyride';

const TutorialGuide = () => {
  const [runTutorial, setRunTutorial] = useState(false);
  const [steps, setSteps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les étapes du tutoriel en fonction de la page actuelle
    const currentPath = window.location.pathname;
    setSteps(getTutorialSteps(currentPath));
  }, []);

  const getTutorialSteps = (path) => {
    const commonStyles = {
      buttonNext: {
        backgroundColor: '#4F46E5',
        color: '#fff',
        padding: '8px 16px',
        borderRadius: '4px'
      },
      buttonBack: {
        marginRight: '8px',
        color: '#4F46E5'
      }
    };

    const stepsMap = {
      '/dashboard': [
        {
          target: '[data-tour="create-site"]',
          content: 'Commencez par créer votre premier site web. Cliquez ici pour démarrer !',
          disableBeacon: true,
          placement: 'bottom',
          styles: commonStyles
        },
        {
          target: '[data-tour="templates"]',
          content: 'Parcourez notre collection de templates professionnels.',
          placement: 'right',
          styles: commonStyles
        },
        {
          target: '[data-tour="analytics"]',
          content: 'Suivez les performances de vos sites web ici.',
          placement: 'left',
          styles: commonStyles
        }
      ],
      '/editor': [
        {
          target: '[data-tour="editor-sidebar"]',
          content: 'Utilisez cette barre latérale pour ajouter des éléments à votre page.',
          placement: 'right',
          styles: commonStyles
        },
        {
          target: '[data-tour="editor-canvas"]',
          content: 'Glissez-déposez les éléments ici pour construire votre page.',
          placement: 'left',
          styles: commonStyles
        },
        {
          target: '[data-tour="ai-assistant"]',
          content: 'Notre assistant IA peut vous aider à générer du contenu automatiquement.',
          placement: 'bottom',
          styles: commonStyles
        }
      ]
    };

    return stepsMap[path] || [];
  };

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Marquer le tutoriel comme terminé
      localStorage.setItem('tutorialCompleted', 'true');
      setRunTutorial(false);
    }

    // Navigation conditionnelle basée sur l'étape
    if (type === 'step:after' && data.index === 0 && window.location.pathname === '/dashboard') {
      navigate('/editor');
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={runTutorial}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#4F46E5',
            zIndex: 1000,
          },
        }}
        locale={{
          back: 'Précédent',
          close: 'Fermer',
          last: 'Terminer',
          next: 'Suivant',
          skip: 'Passer'
        }}
      />

      {!localStorage.getItem('tutorialCompleted') && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
          <h3 className="text-lg font-semibold mb-2">Besoin d'aide ?</h3>
          <p className="text-gray-600 mb-4">
            Suivez notre tutoriel interactif pour découvrir toutes les fonctionnalités de SiteCraft.
          </p>
          <button
            onClick={() => setRunTutorial(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Démarrer le tutoriel
          </button>
        </div>
      )}
    </>
  );
};

export default TutorialGuide;
