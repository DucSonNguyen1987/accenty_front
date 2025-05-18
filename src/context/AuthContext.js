// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Vérifier s'il y a un utilisateur déjà connecté au chargement
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        if (token) {
          // Vérifier si le token est valide
          const userData = await api.get('/users/me');
          setCurrentUser(userData);
        }
      } catch (err) {
        // Token invalide ou expiré, supprimer
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);
  
  // Fonction de connexion
  const login = async (email, password) => { // Ce password doit être utilisé
    try {
      setError(null);
      // Utilisation du mot de passe pour l'authentification
      const response = await api.post('/auth/login', { email, password });
      
      if (response.token) {
        localStorage.setItem('accessToken', response.token);
        setCurrentUser(response.user);
        return response.user;
      }
    } catch (err) {
      setError(err.message || 'Échec de la connexion');
      throw err;
    }
  };
  
  // Fonction d'inscription
const register = async (name, email, password) => {
  setError(null);
  
  try {
    // Dans une application réelle, ceci serait remplacé par un appel API
    // Simulation d'une inscription réussie pour la démonstration
    
    // Vérification basique du mot de passe (exemple)
    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }
    
    const user = {
      id: Date.now(), // Génère un ID unique basé sur le timestamp
      name,
      email,
      role: 'client',
      // Ne jamais stocker le mot de passe en clair dans localStorage
      // Dans une vraie application, le backend gèrerait l'authentification
    };
    
    setCurrentUser(user);
    localStorage.setItem('accentyUser', JSON.stringify(user));
    return user;
  } catch (err) {
    setError(err.message);
    throw err;
  }
};
  
  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('accessToken');
    setCurrentUser(null);
  };
  
  // Valeur du contexte
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};