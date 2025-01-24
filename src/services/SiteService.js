import { mockData } from './mockData';

class SiteService {
  constructor() {
    this.useMock = true;
  }

  async fetchSites() {
    if (this.useMock) {
      // Simuler un délai de réponse
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockData.sites;
    }
    // Code pour l'API réelle ici
    throw new Error('API non implémentée');
  }

  async createSite(siteData) {
    if (this.useMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newSite = {
        id: Date.now(),
        ...siteData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockData.sites.push(newSite);
      return newSite;
    }
    throw new Error('API non implémentée');
  }
}

export default new SiteService();
