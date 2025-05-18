// src/utils/validators.js

/**
 * Fichier d'utilitaires pour valider les formulaires et les entrées utilisateur
 */

/**
 * Vérifie si une chaîne est vide
 * @param {string} value - Valeur à vérifier
 * @returns {boolean} Vrai si la chaîne est vide
 */
export const isEmpty = (value) => {
  return value === null || value === undefined || value.trim() === '';
};

/**
 * Valide une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean} Vrai si l'email est valide
 */
export const isValidEmail = (email) => {
  if (isEmpty(email)) return false;
  
  // Expression régulière pour une validation basique d'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone français
 * @param {string} phone - Numéro de téléphone à valider
 * @returns {boolean} Vrai si le numéro est valide
 */
export const isValidPhoneNumber = (phone) => {
  if (isEmpty(phone)) return false;
  
  // Expression régulière pour un numéro de téléphone français
  // Accepte les formats: 0123456789, 01 23 45 67 89, +33 1 23 45 67 89, etc.
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
};

/**
 * Valide un mot de passe selon des critères de complexité
 * @param {string} password - Mot de passe à valider
 * @param {Object} options - Options de validation
 * @returns {Object} Résultat de validation avec statut et message
 */
export const validatePassword = (password, options = {}) => {
  const defaultOptions = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    ...options
  };
  
  if (isEmpty(password)) {
    return {
      isValid: false,
      message: 'Le mot de passe est requis'
    };
  }
  
  if (password.length < defaultOptions.minLength) {
    return {
      isValid: false,
      message: `Le mot de passe doit contenir au moins ${defaultOptions.minLength} caractères`
    };
  }
  
  if (defaultOptions.requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Le mot de passe doit contenir au moins une lettre majuscule'
    };
  }
  
  if (defaultOptions.requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Le mot de passe doit contenir au moins une lettre minuscule'
    };
  }
  
  if (defaultOptions.requireNumbers && !/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Le mot de passe doit contenir au moins un chiffre'
    };
  }
  
  if (defaultOptions.requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return {
      isValid: false,
      message: 'Le mot de passe doit contenir au moins un caractère spécial'
    };
  }
  
  return {
    isValid: true,
    message: 'Mot de passe valide'
  };
};

/**
 * Valide un code postal français
 * @param {string} postalCode - Code postal à valider
 * @returns {boolean} Vrai si le code postal est valide
 */
export const isValidPostalCode = (postalCode) => {
  if (isEmpty(postalCode)) return false;
  
  // Expression régulière pour un code postal français
  const postalCodeRegex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
  return postalCodeRegex.test(postalCode);
};

/**
 * Valide une date (format YYYY-MM-DD)
 * @param {string} dateStr - Date à valider
 * @returns {boolean} Vrai si la date est valide
 */
export const isValidDate = (dateStr) => {
  if (isEmpty(dateStr)) return false;
  
  // Vérifier le format YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  
  // Vérifier que la date est valide
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  
  // Vérifier que la date formatée correspond à l'entrée
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}` === dateStr;
};

/**
 * Valide un numéro de carte de crédit
 * @param {string} cardNumber - Numéro de carte à valider
 * @returns {boolean} Vrai si le numéro est valide
 */
export const isValidCreditCard = (cardNumber) => {
  if (isEmpty(cardNumber)) return false;
  
  // Enlever les espaces et tirets
  const cleanedNumber = cardNumber.replace(/[\s-]/g, '');
  
  // Vérifier si la chaîne contient uniquement des chiffres
  if (!/^\d+$/.test(cleanedNumber)) return false;
  
  // Vérifier la longueur (la plupart des cartes ont entre 13 et 19 chiffres)
  if (cleanedNumber.length < 13 || cleanedNumber.length > 19) return false;
  
  // Algorithme de Luhn (vérification de somme de contrôle)
  let sum = 0;
  let double = false;
  
  for (let i = cleanedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedNumber.charAt(i), 10);
    
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    double = !double;
  }
  
  return sum % 10 === 0;
};

/**
 * Valide un formulaire entier
 * @param {Object} formData - Données du formulaire
 * @param {Object} validationRules - Règles de validation pour chaque champ
 * @returns {Object} Résultat de validation avec erreurs par champ
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach((fieldName) => {
    const value = formData[fieldName];
    const rules = validationRules[fieldName];
    
    // Vérifier si le champ est requis
    if (rules.required && isEmpty(value)) {
      errors[fieldName] = rules.requiredMessage || `Ce champ est requis`;
      return;
    }
    
    // Si la valeur est vide mais pas requise, ne pas vérifier les autres règles
    if (isEmpty(value) && !rules.required) {
      return;
    }
    
    // Vérifier les autres règles
    if (rules.validator && typeof rules.validator === 'function') {
      const validatorResult = rules.validator(value);
      if (!validatorResult) {
        errors[fieldName] = rules.message || `Valeur invalide`;
      }
    }
    
    if (rules.minLength && value.length < rules.minLength) {
      errors[fieldName] = rules.minLengthMessage || `Doit contenir au moins ${rules.minLength} caractères`;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      errors[fieldName] = rules.maxLengthMessage || `Ne doit pas dépasser ${rules.maxLength} caractères`;
    }
    
    if (rules.min && Number(value) < rules.min) {
      errors[fieldName] = rules.minMessage || `Doit être supérieur ou égal à ${rules.min}`;
    }
    
    if (rules.max && Number(value) > rules.max) {
      errors[fieldName] = rules.maxMessage || `Doit être inférieur ou égal à ${rules.max}`;
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      errors[fieldName] = rules.patternMessage || `Format invalide`;
    }
    
    if (rules.match && value !== formData[rules.match]) {
      errors[fieldName] = rules.matchMessage || `Ne correspond pas à ${rules.match}`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};