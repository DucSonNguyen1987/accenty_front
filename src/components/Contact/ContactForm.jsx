// src/components/Contact/ContactForm.jsx

import React, { useState } from 'react';
import styles from './Contact.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur pour ce champ si elle existe
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  
  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Veuillez entrer votre nom';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Veuillez entrer votre email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Veuillez sélectionner un sujet';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Veuillez entrer votre message';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simuler un appel API pour envoyer le message
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Réinitialiser le formulaire et afficher un message de succès
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        
        setIsSubmitted(true);
        
        // Masquer le message de succès après 5 secondes
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className={styles.contactFormContainer}>
      <h3>Envoyez-nous un message</h3>
      <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Nom complet *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Votre nom"
            />
            {errors.name && <div className={styles.formError}>{errors.name}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Votre adresse email"
            />
            {errors.email && <div className={styles.formError}>{errors.email}</div>}
          </div>
        </div>
        
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>Téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Votre numéro de téléphone"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.formLabel}>Sujet *</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.formSelect}
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="info">Demande d'informations</option>
              <option value="quote">Demande de devis</option>
              <option value="appointment">Prise de rendez-vous</option>
              <option value="partnership">Proposition de partenariat</option>
              <option value="other">Autre</option>
            </select>
            {errors.subject && <div className={styles.formError}>{errors.subject}</div>}
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.formLabel}>Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.formTextarea}
            placeholder="Écrivez votre message ici..."
          ></textarea>
          {errors.message && <div className={styles.formError}>{errors.message}</div>}
        </div>
        
        <button 
          type="submit" 
          className={`button ${styles.submitButton}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Envoi en cours...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i> Envoyer le message
            </>
          )}
        </button>
      </form>
      
      {isSubmitted && (
        <div className={styles.successMessage}>
          <i className={`fas fa-check-circle ${styles.successIcon}`}></i>
          <div className={styles.successText}>
            <strong>Message envoyé avec succès !</strong><br />
            Nous vous répondrons dans les plus brefs délais.
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;