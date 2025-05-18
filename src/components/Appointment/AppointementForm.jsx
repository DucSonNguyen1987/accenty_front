// src/components/Appointment/AppointmentForm.jsx - Version corrigée (isSubmitted)

import React, { useState, useEffect } from 'react';
import styles from './Appointment.module.css';
import Calendar from './Calendar';

// Données fictives pour les créneaux disponibles (à remplacer par des appels API)
const MOCK_AVAILABLE_DATES = [
  // Format: 'YYYY-MM-DD'
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 8),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 12),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 15),
  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5),
  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 8),
  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 12),
];

// Créneaux horaires disponibles (9h-18h avec pause déjeuner)
const MOCK_TIME_SLOTS = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: true },
  { time: '12:00', available: false },
  { time: '13:00', available: false },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: true },
];

// Types d'événements
const EVENT_TYPES = [
  { id: 'wedding', label: 'Mariage' },
  { id: 'corporate', label: 'Événement d\'entreprise' },
  { id: 'birthday', label: 'Anniversaire' },
  { id: 'launch', label: 'Lancement de produit' },
  { id: 'gala', label: 'Gala/Dîner' },
  { id: 'conference', label: 'Conférence/Séminaire' },
  { id: 'other', label: 'Autre' },
];

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
  });
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formStep, setFormStep] = useState(1); // 1: Infos, 2: Date/Heure, 3: Confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Cette variable est maintenant utilisée pour contrôler l'affichage de la confirmation
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Charger les créneaux horaires pour la date sélectionnée
  useEffect(() => {
    if (selectedDate) {
      // Simuler un appel API pour récupérer les créneaux disponibles
      // Dans une application réelle, cela serait remplacé par un appel API
      setTimeout(() => {
        // On simule des disponibilités différentes selon les jours
        const dayOfWeek = selectedDate.getDay();
        const isMorningBusy = [1, 3, 5].includes(dayOfWeek);
        const isAfternoonBusy = [2, 4].includes(dayOfWeek);
        
        const updatedSlots = MOCK_TIME_SLOTS.map(slot => {
          const hour = parseInt(slot.time.split(':')[0], 10);
          let available = slot.available;
          
          if (isMorningBusy && hour < 12) {
            available = false;
          }
          
          if (isAfternoonBusy && hour >= 14) {
            available = false;
          }
          
          return { ...slot, available };
        });
        
        setTimeSlots(updatedSlots);
      }, 300);
    }
  }, [selectedDate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur pour ce champ si elle existe
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Réinitialiser le créneau horaire sélectionné
    
    // Formatter la date pour l'affichage
    const formattedDate = date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    setFormData({ ...formData, eventDate: formattedDate });
  };
  
  const handleTimeSlotSelect = (slot) => {
    if (!slot.available) return;
    setSelectedTimeSlot(slot);
    
    // Mettre à jour la date/heure du rendez-vous dans le formulaire
    const formattedDateTime = `${formData.eventDate} à ${slot.time}`;
    setFormData({ ...formData, eventDate: formattedDateTime });
  };
  
  const validateForm = () => {
    const errors = {};
    
    // Valider les champs obligatoires selon l'étape
    if (formStep === 1) {
      if (!formData.firstName.trim()) errors.firstName = 'Le prénom est requis';
      if (!formData.lastName.trim()) errors.lastName = 'Le nom est requis';
      
      if (!formData.email.trim()) {
        errors.email = 'L\'email est requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Format d\'email invalide';
      }
      
      if (!formData.phone.trim()) {
        errors.phone = 'Le téléphone est requis';
      } else if (!/^[0-9+\s()-]{8,15}$/.test(formData.phone)) {
        errors.phone = 'Format de téléphone invalide';
      }
      
      if (!formData.eventType) errors.eventType = 'Le type d\'événement est requis';
      if (!formData.guestCount) {
        errors.guestCount = 'Le nombre d\'invités est requis';
      } else if (isNaN(formData.guestCount) || parseInt(formData.guestCount) <= 0) {
        errors.guestCount = 'Veuillez entrer un nombre valide';
      }
    } else if (formStep === 2) {
      if (!selectedDate) errors.date = 'Veuillez sélectionner une date';
      if (!selectedTimeSlot) errors.time = 'Veuillez sélectionner un horaire';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateForm()) {
      setFormStep(formStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    setFormStep(formStep - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simuler un appel API pour enregistrer le rendez-vous
        // Dans une application réelle, cela serait remplacé par un appel API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Marquer le formulaire comme soumis pour afficher la confirmation
        setIsSubmitted(true);
        setFormStep(3);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        // Gérer l'erreur (afficher un message, etc.)
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Formatage de la date pour l'affichage dans la confirmation
  const formatDate = (date) => {
    if (!date) return '';
    
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Rendu du formulaire selon l'étape
  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <div className={styles.appointmentForm}>
            <h3>Informations personnelles et événement</h3>
            <p>Veuillez remplir les informations ci-dessous pour prendre rendez-vous avec notre équipe.</p>
            
            <div className={styles.formGroup}>
              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                <div>
                  <label htmlFor="firstName" className={styles.formLabel}>Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Votre prénom"
                    required
                  />
                  {formErrors.firstName && <div className={styles.formError}>{formErrors.firstName}</div>}
                </div>
                
                <div>
                  <label htmlFor="lastName" className={styles.formLabel}>Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Votre nom"
                    required
                  />
                  {formErrors.lastName && <div className={styles.formError}>{formErrors.lastName}</div>}
                </div>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                <div>
                  <label htmlFor="email" className={styles.formLabel}>Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Votre adresse email"
                    required
                  />
                  {formErrors.email && <div className={styles.formError}>{formErrors.email}</div>}
                </div>
                
                <div>
                  <label htmlFor="phone" className={styles.formLabel}>Téléphone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Votre numéro de téléphone"
                    required
                  />
                  {formErrors.phone && <div className={styles.formError}>{formErrors.phone}</div>}
                </div>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="eventType" className={styles.formLabel}>Type d'événement *</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="">Sélectionnez le type d'événement</option>
                {EVENT_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
              {formErrors.eventType && <div className={styles.formError}>{formErrors.eventType}</div>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="guestCount" className={styles.formLabel}>Nombre d'invités *</label>
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Nombre approximatif d'invités"
                min="1"
                required
              />
              {formErrors.guestCount && <div className={styles.formError}>{formErrors.guestCount}</div>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Message (optionnel)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={styles.formTextarea}
                placeholder="Partagez des détails supplémentaires sur votre événement"
              ></textarea>
            </div>
            
            <button 
              type="button" 
              className={`button ${styles.submitButton}`} 
              onClick={handleNextStep}
            >
              Étape suivante <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        );
        
      case 2:
        return (
          <div className={styles.appointmentForm}>
            <h3>Sélection de la date et de l'heure</h3>
            <p>Choisissez une date et un horaire pour votre rendez-vous. Les créneaux disponibles sont indiqués sur le calendrier.</p>
            
            <Calendar 
              onDateSelected={handleDateSelect} 
              availableDates={MOCK_AVAILABLE_DATES}
            />
            
            {formErrors.date && <div className={styles.formError}>{formErrors.date}</div>}
            
            {selectedDate && (
              <div className={styles.timeSlots}>
                <h4 className={styles.timeSlotsTitle}>
                  Horaires disponibles pour le {formatDate(selectedDate)}
                </h4>
                
                <div className={styles.timeSlotsList}>
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`
                        ${styles.timeSlot} 
                        ${!slot.available ? styles.timeSlotBooked : ''} 
                        ${selectedTimeSlot && selectedTimeSlot.time === slot.time ? styles.timeSlotSelected : ''}
                      `}
                      onClick={() => handleTimeSlotSelect(slot)}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
                
                {formErrors.time && <div className={styles.formError}>{formErrors.time}</div>}
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button 
                type="button" 
                className="button outline" 
                onClick={handlePrevStep}
              >
                <i className="fas fa-arrow-left"></i> Retour
              </button>
              
              <button 
                type="button" 
                className="button" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Traitement...
                  </>
                ) : (
                  'Confirmer le rendez-vous'
                )}
              </button>
            </div>
          </div>
        );
        
      case 3:
        // Utilisation de isSubmitted pour afficher la confirmation seulement après soumission réussie
        return isSubmitted ? (
          <div className={styles.confirmationMessage}>
            <h3 className={styles.confirmationTitle}>
              <i className="fas fa-check-circle"></i> Votre rendez-vous est confirmé !
            </h3>
            <p>
              Merci {formData.firstName} de nous avoir contacté. Nous avons bien reçu votre demande de rendez-vous et nous vous confirmons qu'elle a été enregistrée avec succès.
            </p>
            <p>
              Un email de confirmation a été envoyé à {formData.email} avec tous les détails de votre rendez-vous.
            </p>
            
            <div className={styles.confirmationDetails}>
              <h4>Récapitulatif de votre rendez-vous :</h4>
              
              <div className={styles.confirmationRow}>
                <div className={styles.confirmationLabel}>Nom :</div>
                <div>{formData.firstName} {formData.lastName}</div>
              </div>
              
              <div className={styles.confirmationRow}>
                <div className={styles.confirmationLabel}>Date & Heure :</div>
                <div>{formData.eventDate}</div>
              </div>
              
              <div className={styles.confirmationRow}>
                <div className={styles.confirmationLabel}>Type d'événement :</div>
                <div>
                  {EVENT_TYPES.find(type => type.id === formData.eventType)?.label || formData.eventType}
                </div>
              </div>
              
              <div className={styles.confirmationRow}>
                <div className={styles.confirmationLabel}>Invités :</div>
                <div>{formData.guestCount} personnes</div>
              </div>
            </div>
            
            <p style={{ marginTop: '1.5rem' }}>
              Notre équipe vous contactera dans les 24 heures ouvrées pour discuter plus en détail de votre projet. Si vous avez des questions d'ici là, n'hésitez pas à nous contacter par téléphone ou par email.
            </p>
          </div>
        ) : (
          // Message en attente si l'étape 3 est atteinte mais la soumission n'est pas terminée
          <div className={styles.loadingMessage}>
            <h3>Traitement de votre demande en cours...</h3>
            <p><i className="fas fa-spinner fa-spin"></i> Veuillez patienter pendant que nous traitons votre demande.</p>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className={styles.appointmentFormContainer}>
      <h2>Prendre Rendez-vous</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {renderFormStep()}
      </form>
    </div>
  );
};

export default AppointmentForm;