import axios from 'axios';
import { mockData } from './mockData';

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  constructor() {
    // Mode mock pour le développement
    this.useMock = true;
    
    this.api = axios.create({
      baseURL: API_URL || 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Intercepteur pour ajouter le token aux requêtes
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercepteur pour gérer les erreurs d'authentification
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email, password) {
    if (this.useMock) {
      // Simuler un délai de réponse
      await new Promise(resolve => setTimeout(resolve, 500));
      if (email === 'demo@example.com' && password === 'demo') {
        const { user } = mockData;
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      throw new Error('Invalid credentials');
    }
    
    try {
      const response = await this.api.post('/auth/login', { email, password });

      if (!response.data.ok) {
        const error = response.data;
        throw new Error(error.message || 'Erreur de connexion');
      }

      const data = response.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error(error.message || 'Erreur de connexion au serveur');
    }
  }

  async register(username, email, password) {
    if (this.useMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = { ...mockData.user, username, email };
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }

    try {
      const response = await this.api.post('/auth/register', { username, email, password });

      if (!response.data.ok) {
        const error = response.data;
        throw new Error(error.message || 'Erreur d\'inscription');
      }

      const data = response.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      if (error.message === 'Network Error') {
        throw new Error('Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.');
      }
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      window.location.href = `${API_URL}/auth/google`;
    } catch (error) {
      throw new Error('Erreur de connexion avec Google');
    }
  }

  async loginWithGithub() {
    try {
      window.location.href = `${API_URL}/auth/github`;
    } catch (error) {
      throw new Error('Erreur de connexion avec GitHub');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      this.logout();
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  async updateProfile(userData) {
    try {
      const response = await this.api.put('/auth/profile', userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Erreur de mise à jour du profil:', error);
      throw new Error(error.message || 'Erreur de mise à jour du profil');
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      await this.api.put('/auth/password', { currentPassword, newPassword });
    } catch (error) {
      console.error('Erreur de changement de mot de passe:', error);
      throw new Error(error.message || 'Erreur de changement de mot de passe');
    }
  }

  async resetPassword(email) {
    try {
      await this.api.post('/auth/reset-password', { email });
    } catch (error) {
      console.error('Erreur de réinitialisation du mot de passe:', error);
      throw new Error(error.message || 'Erreur de réinitialisation du mot de passe');
    }
  }

  async verifyEmail(token) {
    try {
      await this.api.post('/auth/verify-email', { token });
    } catch (error) {
      console.error('Erreur de vérification d\'email:', error);
      throw new Error(error.message || 'Erreur de vérification d\'email');
    }
  }
}

export default new AuthService();
