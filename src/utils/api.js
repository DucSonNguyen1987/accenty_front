// src/utils/api.js

/**
 * Classe utilitaire pour gérer les appels API
 * Dans une application réelle, ce fichier serait utilisé pour communiquer avec le backend
 * Pour l'instant, c'est une implémentation simulée
 */
class ApiService {
  /**
   * URL de base de l'API
   * @type {string}
   */
  baseUrl = process.env.REACT_APP_API_URL || 'https://api.accenty-co.fr';

  /**
   * Headers par défaut pour les requêtes
   * @returns {Object} headers HTTP
   */
  getHeaders() {
    const token = localStorage.getItem('accessToken');
    
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  /**
   * Effectue une requête GET
   * @param {string} endpoint - Endpoint à appeler
   * @param {Object} params - Paramètres de requête (optionnel)
   * @returns {Promise<any>} Données de réponse
   */
  async get(endpoint, params = {}) {
    try {
      // Convertir les paramètres en query string
      const queryString = Object.keys(params).length 
        ? `?${new URLSearchParams(params).toString()}`
        : '';
      
      const response = await fetch(`${this.baseUrl}${endpoint}${queryString}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la requête GET à ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Effectue une requête POST
   * @param {string} endpoint - Endpoint à appeler
   * @param {Object} data - Données à envoyer
   * @returns {Promise<any>} Données de réponse
   */
  async post(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la requête POST à ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Effectue une requête PUT
   * @param {string} endpoint - Endpoint à appeler
   * @param {Object} data - Données à envoyer
   * @returns {Promise<any>} Données de réponse
   */
  async put(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la requête PUT à ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Effectue une requête DELETE
   * @param {string} endpoint - Endpoint à appeler
   * @returns {Promise<any>} Données de réponse
   */
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la requête DELETE à ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Méthode pour télécharger un fichier
   * @param {string} endpoint - Endpoint à appeler
   * @param {Object} params - Paramètres de requête (optionnel)
   * @returns {Promise<Blob>} Blob du fichier
   */
  async downloadFile(endpoint, params = {}) {
    try {
      const queryString = Object.keys(params).length 
        ? `?${new URLSearchParams(params).toString()}`
        : '';
      
      const response = await fetch(`${this.baseUrl}${endpoint}${queryString}`, {
        method: 'GET',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/octet-stream'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.blob();
    } catch (error) {
      console.error(`Erreur lors du téléchargement depuis ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Méthode pour uploader un fichier
   * @param {string} endpoint - Endpoint à appeler
   * @param {FormData} formData - Données du formulaire avec fichier
   * @returns {Promise<any>} Données de réponse
   */
  async uploadFile(endpoint, formData) {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de l'upload vers ${endpoint}:`, error);
      throw error;
    }
  }
}

// Exporter une instance unique du service API
export default new ApiService();