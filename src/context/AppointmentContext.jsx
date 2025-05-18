// src/context/AppointmentContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

// Création du contexte
const AppointmentContext = createContext();

// Hook personnalisé pour utiliser le contexte des rendez-vous
export const useAppointment = () => {
  return useContext(AppointmentContext);
};

// Fournisseur du contexte des rendez-vous
export const AppointmentProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Charger les rendez-vous de l'utilisateur au chargement et lorsque l'utilisateur change
  useEffect(() => {
    const loadAppointments = async () => {
      if (!currentUser) {
        setAppointments([]);
        setLoading(false);
        return;
      }
      
      try {
        // Dans une application réelle, ceci serait remplacé par un appel API
        // Charger les rendez-vous depuis le localStorage pour la démonstration
        const storedAppointments = localStorage.getItem(`accentyAppointments_${currentUser.id}`);
        
        if (storedAppointments) {
          setAppointments(JSON.parse(storedAppointments));
        } else {
          // Rendez-vous fictifs pour la démonstration
          const demoAppointments = [
            {
              id: 1,
              title: 'Consultation initiale',
              date: '2024-06-15T10:00:00',
              status: 'confirmed',
              type: 'initial',
              notes: 'Discussion sur le projet de mariage',
              location: 'Bureaux Accenty & Co',
            },
            {
              id: 2,
              title: 'Visite du lieu',
              date: '2024-07-05T14:30:00',
              status: 'pending',
              type: 'venue',
              notes: 'Visite du Château de Fontainebleau pour évaluation',
              location: 'Château de Fontainebleau',
            },
          ];
          
          setAppointments(demoAppointments);
          localStorage.setItem(`accentyAppointments_${currentUser.id}`, JSON.stringify(demoAppointments));
        }
      } catch (err) {
        console.error('Erreur lors du chargement des rendez-vous:', err);
        setError('Impossible de charger vos rendez-vous. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };
    
    loadAppointments();
  }, [currentUser]);
  
  // Fonction pour créer un nouveau rendez-vous
  const createAppointment = async (appointmentData) => {
    try {
      if (!currentUser) {
        throw new Error('Vous devez être connecté pour prendre un rendez-vous.');
      }
      
      // Créer un nouvel objet de rendez-vous
      const newAppointment = {
        id: Date.now(), // ID unique basé sur le timestamp
        ...appointmentData,
        status: 'pending', // Statut par défaut
      };
      
      // Mettre à jour l'état
      const updatedAppointments = [...appointments, newAppointment];
      setAppointments(updatedAppointments);
      
      // Sauvegarder dans le localStorage
      localStorage.setItem(`accentyAppointments_${currentUser.id}`, JSON.stringify(updatedAppointments));
      
      return newAppointment;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  // Fonction pour annuler un rendez-vous
  const cancelAppointment = async (appointmentId) => {
    try {
      if (!currentUser) {
        throw new Error('Vous devez être connecté pour annuler un rendez-vous.');
      }
      
      // Trouver le rendez-vous à annuler
      const appointmentIndex = appointments.findIndex(app => app.id === appointmentId);
      
      if (appointmentIndex === -1) {
        throw new Error('Rendez-vous non trouvé.');
      }
      
      // Mettre à jour le statut du rendez-vous
      const updatedAppointments = [...appointments];
      updatedAppointments[appointmentIndex] = {
        ...updatedAppointments[appointmentIndex],
        status: 'cancelled',
      };
      
      // Mettre à jour l'état
      setAppointments(updatedAppointments);
      
      // Sauvegarder dans le localStorage
      localStorage.setItem(`accentyAppointments_${currentUser.id}`, JSON.stringify(updatedAppointments));
      
      return updatedAppointments[appointmentIndex];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  // Fonction pour reschedule un rendez-vous
  const rescheduleAppointment = async (appointmentId, newDate) => {
    try {
      if (!currentUser) {
        throw new Error('Vous devez être connecté pour modifier un rendez-vous.');
      }
      
      // Trouver le rendez-vous à modifier
      const appointmentIndex = appointments.findIndex(app => app.id === appointmentId);
      
      if (appointmentIndex === -1) {
        throw new Error('Rendez-vous non trouvé.');
      }
      
      // Mettre à jour la date du rendez-vous
      const updatedAppointments = [...appointments];
      updatedAppointments[appointmentIndex] = {
        ...updatedAppointments[appointmentIndex],
        date: newDate,
        status: 'rescheduled',
      };
      
      // Mettre à jour l'état
      setAppointments(updatedAppointments);
      
      // Sauvegarder dans le localStorage
      localStorage.setItem(`accentyAppointments_${currentUser.id}`, JSON.stringify(updatedAppointments));
      
      return updatedAppointments[appointmentIndex];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  // Fonction pour récupérer les créneaux disponibles
  const getAvailableSlots = async (date) => {
    try {
      // Dans une application réelle, ceci serait remplacé par un appel API
      // Simulation de créneaux disponibles pour la démonstration
      const slots = [];
      const startHour = 9; // 9h00
      const endHour = 18; // 18h00
      
      // Générer des créneaux toutes les heures
      for (let hour = startHour; hour < endHour; hour++) {
        // Simuler une disponibilité aléatoire (pour la démo)
        const isAvailable = Math.random() > 0.3; // 70% de chance d'être disponible
        
        if (isAvailable) {
          slots.push({
            time: `${hour}:00`,
            available: true,
          });
        } else {
          slots.push({
            time: `${hour}:00`,
            available: false,
          });
        }
      }
      
      return slots;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  // Valeur à fournir aux composants consommateurs
  const value = {
    appointments,
    loading,
    error,
    createAppointment,
    cancelAppointment,
    rescheduleAppointment,
    getAvailableSlots,
  };
  
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;