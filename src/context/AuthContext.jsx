// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

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
          // Dans une application réelle, nous vérifierions le token auprès du serveur
          // Simuler une vérification pour la démo
          const userDataString = localStorage.getItem('accentyUser');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            setCurrentUser(userData);
          } else {
            // Token présent mais pas de données utilisateur
            localStorage.removeItem('accessToken');
          }
        }
      } catch (err) {
        console.error("Erreur lors de la vérification de connexion:", err);
        // Token invalide ou expiré, supprimer
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);
  
  // Fonction de connexion
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      // Dans une vraie application, ceci serait un appel API
      // Simuler un délai de réponse serveur
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Vérification simplifiée pour la démo (à remplacer par une vraie authentification)
      if (email === 'demo@accenty-co.fr' && password === 'demo123') {
        const demoUser = {
          id: 'demo123',
          name: 'Utilisateur Démo',
          email: 'demo@accenty-co.fr',
          role: 'client',
          // Ajouter quelques rendez-vous fictifs pour la démo
          appointments: [
            {
              id: 1,
              title: 'Consultation initiale',
              date: '2024-06-15T10:00:00',
              status: 'confirmed'
            }
          ]
        };
        
        // Stocker les informations en localStorage
        localStorage.setItem('accessToken', 'demo-token-123');
        localStorage.setItem('accentyUser', JSON.stringify(demoUser));
        
        setCurrentUser(demoUser);
        return demoUser;
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (err) {
      setError(err.message || 'Échec de la connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction d'inscription
  const register = async (name, email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      // Simuler un délai de réponse serveur
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Vérification basique du mot de passe
      if (password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
      }
      
      const user = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'client',
        appointments: []
      };
      
      // Stocker en localStorage pour la démo
      localStorage.setItem('accessToken', `token-${Date.now()}`);
      localStorage.setItem('accentyUser', JSON.stringify(user));
      
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Échec de l\'inscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accentyUser');
    setCurrentUser(null);
  };
  
  // Propriété dérivée pour vérifier facilement si un utilisateur est connecté
  const isAuthenticated = Boolean(currentUser);
  
  // Valeur du contexte
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>Chargement...</div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;