import debounce from 'lodash/debounce';

class AutoSave {
  constructor(saveFunction, delay = 2000) {
    this.save = debounce(saveFunction, delay);
    this.pending = false;
  }

  saveContent(content) {
    this.pending = true;
    this.save(content)
      .then(() => {
        this.pending = false;
        console.log('Contenu sauvegardé avec succès');
      })
      .catch(error => {
        this.pending = false;
        console.error('Erreur lors de la sauvegarde:', error);
      });
  }

  isPending() {
    return this.pending;
  }

  flush() {
    this.save.flush();
  }
}

export const createAutoSave = (saveFunction, delay) => {
  return new AutoSave(saveFunction, delay);
};

// Fonction utilitaire pour sauvegarder le contenu localement
export const saveToLocalStorage = (key, content) => {
  return new Promise((resolve) => {
    try {
      localStorage.setItem(key, JSON.stringify(content));
      resolve();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans le localStorage:', error);
      throw error;
    }
  });
};

// Fonction utilitaire pour récupérer le contenu sauvegardé
export const loadFromLocalStorage = (key) => {
  try {
    const content = localStorage.getItem(key);
    return content ? JSON.parse(content) : null;
  } catch (error) {
    console.error('Erreur lors de la lecture du localStorage:', error);
    return null;
  }
};
