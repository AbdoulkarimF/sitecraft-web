import axios from 'axios';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
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
    try {
      const response = await this.api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur de connexion');
    }
  }

  async register(userData) {
    try {
      const response = await this.api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur d\'inscription');
    }
  }

  async loginWithGoogle() {
    try {
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    } catch (error) {
      throw new Error('Erreur de connexion avec Google');
    }
  }

  async loginWithGithub() {
    try {
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/github`;
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
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
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
      throw new Error(error.response?.data?.message || 'Erreur de mise à jour du profil');
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      await this.api.put('/auth/password', { currentPassword, newPassword });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur de changement de mot de passe');
    }
  }

  async resetPassword(email) {
    try {
      await this.api.post('/auth/reset-password', { email });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur de réinitialisation du mot de passe');
    }
  }

  async verifyEmail(token) {
    try {
      await this.api.post('/auth/verify-email', { token });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur de vérification d\'email');
    }
  }
}

export default new AuthService();
