// src/utils/dateUtils.js

/**
 * Fichier d'utilitaires pour manipuler les dates dans l'application
 */

/**
 * Formate une date au format local français
 * @param {Date|string} date - Date à formater
 * @param {Object} options - Options de formatage (voir Intl.DateTimeFormat)
 * @returns {string} Date formatée
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('fr-FR', defaultOptions).format(dateObj);
};

/**
 * Formate une date et heure au format local français
 * @param {Date|string} date - Date à formater
 * @returns {string} Date et heure formatées
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  
  return formatDate(date, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Calcule la différence entre deux dates en jours
 * @param {Date|string} startDate - Date de début
 * @param {Date|string} endDate - Date de fin (par défaut: date actuelle)
 * @returns {number} Nombre de jours de différence
 */
export const daysBetween = (startDate, endDate = new Date()) => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // Normaliser les dates pour ignorer les heures/minutes/secondes
  const normalizedStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const normalizedEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
  // Calculer la différence en millisecondes et convertir en jours
  const differenceInMs = normalizedEnd - normalizedStart;
  return Math.round(differenceInMs / (1000 * 60 * 60 * 24));
};

/**
 * Vérifie si une date est aujourd'hui
 * @param {Date|string} date - Date à vérifier
 * @returns {boolean} Vrai si la date est aujourd'hui
 */
export const isToday = (date) => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Vérifie si une date est dans le futur
 * @param {Date|string} date - Date à vérifier
 * @returns {boolean} Vrai si la date est dans le futur
 */
export const isFuture = (date) => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  return dateObj > now;
};

/**
 * Ajoute un nombre spécifique de jours à une date
 * @param {Date|string} date - Date de base
 * @param {number} days - Nombre de jours à ajouter (peut être négatif)
 * @returns {Date} Nouvelle date
 */
export const addDays = (date, days) => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

/**
 * Crée un tableau des jours de la semaine en français
 * @param {boolean} short - Utiliser les noms courts (3 lettres) ou complets
 * @returns {string[]} Tableau des jours de la semaine
 */
export const getWeekDays = (short = false) => {
  const weekdays = short 
    ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  return weekdays;
};

/**
 * Crée un tableau des mois de l'année en français
 * @param {boolean} short - Utiliser les noms courts (3 lettres) ou complets
 * @returns {string[]} Tableau des mois de l'année
 */
export const getMonths = (short = false) => {
  const months = short
    ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
    : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  
  return months;
};

/**
 * Retourne le nombre de jours dans un mois
 * @param {number} year - Année
 * @param {number} month - Mois (0-11)
 * @returns {number} Nombre de jours dans le mois
 */
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Formate une durée en heures et minutes
 * @param {number} minutes - Durée en minutes
 * @returns {string} Durée formatée
 */
export const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins} min`;
  } else if (mins === 0) {
    return `${hours} h`;
  } else {
    return `${hours} h ${mins} min`;
  }
};

/**
 * Obtient la plage de dates pour une semaine donnée
 * @param {Date} date - Date dans la semaine souhaitée
 * @returns {Object} Dates de début et fin de la semaine
 */
export const getWeekRange = (date) => {
  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  
  // Ajuster pour commencer la semaine le lundi
  const startOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const endOffset = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  
  const startDate = addDays(currentDate, startOffset);
  const endDate = addDays(currentDate, endOffset);
  
  return { startDate, endDate };
};

/**
 * Vérifie si une date est valide
 * @param {string} dateStr - Chaîne de date à valider
 * @returns {boolean} Vrai si la date est valide
 */
export const isValidDate = (dateStr) => {
  if (!dateStr) return false;
  
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};