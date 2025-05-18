// src/components/Quote/QuoteForm.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Quote.module.css';

// Types d'événements
const EVENT_TYPES = [
  { id: 'wedding', label: 'Mariage', icon: 'fa-heart' },
  { id: 'corporate', label: 'Événement Corporatif', icon: 'fa-briefcase' },
  { id: 'birthday', label: 'Anniversaire', icon: 'fa-birthday-cake' },
  { id: 'launch', label: 'Lancement de Produit', icon: 'fa-rocket' },
  { id: 'gala', label: 'Gala / Dîner', icon: 'fa-glass-cheers' },
  { id: 'conference', label: 'Conférence / Séminaire', icon: 'fa-microphone' },
  { id: 'private', label: 'Événement Privé', icon: 'fa-user-friends' },
  { id: 'other', label: 'Autre', icon: 'fa-star' },
];

// Lieux d'événements
const EVENT_VENUES = [
  { id: 'hotel', label: 'Hôtel', icon: 'fa-hotel' },
  { id: 'restaurant', label: 'Restaurant', icon: 'fa-utensils' },
  { id: 'chateau', label: 'Château', icon: 'fa-chess-rook' },
  { id: 'garden', label: 'Jardin / Extérieur', icon: 'fa-tree' },
  { id: 'hall', label: 'Salle de Réception', icon: 'fa-archway' },
  { id: 'company', label: 'Locaux d\'Entreprise', icon: 'fa-building' },
  { id: 'boat', label: 'Bateau / Yacht', icon: 'fa-ship' },
  { id: 'unusual', label: 'Lieu Insolite', icon: 'fa-map-marked-alt' },
  { id: 'tbd', label: 'À Déterminer', icon: 'fa-search-location' },
];

// Services additionnels (addons)
const ADDONS = [
  {
    id: 'decoration',
    title: 'Décoration sur-mesure',
    description: 'Design et installation de décors personnalisés selon votre thème et vos couleurs.',
    price: 500,
  },
  {
    id: 'catering',
    title: 'Service traiteur premium',
    description: 'Restauration haut de gamme avec menu personnalisé et service à table.',
    price: 900,
  },
  {
    id: 'photo',
    title: 'Photographe professionnel',
    description: 'Couverture complète de votre événement par un photographe expérimenté.',
    price: 650,
  },
  {
    id: 'video',
    title: 'Captation vidéo',
    description: 'Enregistrement vidéo de haute qualité et montage professionnel.',
    price: 850,
  },
  {
    id: 'music',
    title: 'DJ et animation musicale',
    description: 'DJ professionnel avec équipement son et lumière complet.',
    price: 700,
  },
  {
    id: 'transport',
    title: 'Service de voiturier et navettes',
    description: 'Solution de transport pour vos invités et gestion du stationnement.',
    price: 450,
  },
];

// Formules de base
const PACKAGES = [
  {
    id: 'essential',
    title: 'Essentiel',
    description: 'Coordination le jour J et support de planification basique',
    pricePerGuest: 25,
    basePrice: 1000,
    icon: 'fa-star',
  },
  {
    id: 'premium',
    title: 'Premium',
    description: 'Planification complète, décoration standard et coordination',
    pricePerGuest: 40,
    basePrice: 2500,
    icon: 'fa-star-half-alt',
  },
  {
    id: 'luxe',
    title: 'Prestige',
    description: 'Service tout inclus avec design sur-mesure et coordination VIP',
    pricePerGuest: 65,
    basePrice: 4000,
    icon: 'fa-crown',
  },
];

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1 : Informations de contact
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    
    // Étape 2 : Détails de l'événement
    eventType: '',
    eventDate: '',
    guestCount: '',
    venue: '',
    venueAddress: '',
    budget: '',
    
    // Étape 3 : Services
    package: '',
    addons: [],
    
    // Étape 4 : Détails supplémentaires
    eventTheme: '',
    specialRequests: '',
    hearAboutUs: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState('');
  
  // Calcul du prix total du devis
  const calculateTotal = () => {
    if (!formData.package || !formData.guestCount) return 0;
    
    const selectedPackage = PACKAGES.find(pkg => pkg.id === formData.package);
    if (!selectedPackage) return 0;
    
    const guestCount = parseInt(formData.guestCount, 10) || 0;
    let total = selectedPackage.basePrice + (selectedPackage.pricePerGuest * guestCount);
    
    // Ajouter les services additionnels
    formData.addons.forEach(addonId => {
      const addon = ADDONS.find(a => a.id === addonId);
      if (addon) {
        total += addon.price;
      }
    });
    
    return total;
  };
  
  // Gérer les changements de champs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer les erreurs pour ce champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  // Gérer la sélection du type d'événement
  const handleEventTypeSelect = (typeId) => {
    setFormData(prev => ({ ...prev, eventType: typeId }));
    if (errors.eventType) {
      setErrors(prev => ({ ...prev, eventType: null }));
    }
  };
  
  // Gérer la sélection du lieu
  const handleVenueSelect = (venueId) => {
    setFormData(prev => ({ ...prev, venue: venueId }));
    if (errors.venue) {
      setErrors(prev => ({ ...prev, venue: null }));
    }
  };
  
  // Gérer la sélection de la formule
  const handlePackageSelect = (packageId) => {
    setFormData(prev => ({ ...prev, package: packageId }));
    if (errors.package) {
      setErrors(prev => ({ ...prev, package: null }));
    }
  };
  
  // Gérer la sélection des services additionnels
  const handleAddonToggle = (addonId) => {
    setFormData(prev => {
      const addons = [...prev.addons];
      const index = addons.indexOf(addonId);
      
      if (index === -1) {
        addons.push(addonId);
      } else {
        addons.splice(index, 1);
      }
      
      return { ...prev, addons };
    });
  };
  
  // Valider le formulaire pour l'étape courante
  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
        
        if (!formData.email.trim()) {
          newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Format d\'email invalide';
        }
        
        if (!formData.phone.trim()) {
          newErrors.phone = 'Le téléphone est requis';
        } else if (!/^[0-9+\s()-]{8,15}$/.test(formData.phone)) {
          newErrors.phone = 'Format de téléphone invalide';
        }
        break;
        
      case 2:
        if (!formData.eventType) newErrors.eventType = 'Le type d\'événement est requis';
        if (!formData.eventDate) newErrors.eventDate = 'La date de l\'événement est requise';
        
        if (!formData.guestCount) {
          newErrors.guestCount = 'Le nombre d\'invités est requis';
        } else if (isNaN(formData.guestCount) || parseInt(formData.guestCount) <= 0) {
          newErrors.guestCount = 'Veuillez entrer un nombre valide';
        }
        
        if (!formData.venue) newErrors.venue = 'Le type de lieu est requis';
        
        if (!formData.budget) {
          newErrors.budget = 'Le budget approximatif est requis';
        } else if (isNaN(formData.budget) || parseInt(formData.budget) <= 0) {
          newErrors.budget = 'Veuillez entrer un montant valide';
        }
        break;
        
      case 3:
        if (!formData.package) newErrors.package = 'Veuillez sélectionner une formule';
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Aller à l'étape suivante
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      window.scrollTo(0, 0);
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Revenir à l'étape précédente
  const goToPrevStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  };
  
  // Soumettre le formulaire
  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      
      try {
        // Simuler un appel API pour enregistrer le devis
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Générer un numéro de devis
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const date = new Date();
        const quoteNum = `Q${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}-${randomNum}`;
        
        setQuoteNumber(quoteNum);
        setIsSubmitted(true);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Erreur lors de la soumission du devis:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Calculer le pourcentage de progression
  const calculateProgress = () => {
    return (currentStep / 4) * 100;
  };
  
  // Formater les prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };
  
  // Rendu de l'étape 1 : Informations de contact
  const renderStep1 = () => (
    <div className={styles.formStep}>
      <div className={styles.stepHeader}>
        <div className={styles.stepNumber}>1</div>
        <h3 className={styles.stepTitle}>Informations de contact</h3>
      </div>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.formLabel}>
            Prénom <span className={styles.requiredField}>*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={styles.formInput}
            placeholder="Votre prénom"
          />
          {errors.firstName && <div className={styles.formError}>{errors.firstName}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.formLabel}>
            Nom <span className={styles.requiredField}>*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={styles.formInput}
            placeholder="Votre nom"
          />
          {errors.lastName && <div className={styles.formError}>{errors.lastName}</div>}
        </div>
      </div>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email <span className={styles.requiredField}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.formInput}
            placeholder="Votre adresse email"
          />
          {errors.email && <div className={styles.formError}>{errors.email}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.formLabel}>
            Téléphone <span className={styles.requiredField}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={styles.formInput}
            placeholder="Votre numéro de téléphone"
          />
          {errors.phone && <div className={styles.formError}>{errors.phone}</div>}
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="companyName" className={styles.formLabel}>
          Nom de l'entreprise <span className={styles.optionalField}>(optionnel)</span>
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          className={styles.formInput}
          placeholder="Si applicable"
        />
      </div>
    </div>
  );
  
  // Rendu de l'étape 2 : Détails de l'événement
  const renderStep2 = () => (
    <div className={styles.formStep}>
      <div className={styles.stepHeader}>
        <div className={styles.stepNumber}>2</div>
        <h3 className={styles.stepTitle}>Détails de l'événement</h3>
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Type d'événement <span className={styles.requiredField}>*</span>
        </label>
        <div className={styles.optionGrid}>
          {EVENT_TYPES.map(type => (
            <div
              key={type.id}
              className={`${styles.optionCard} ${formData.eventType === type.id ? styles.optionCardSelected : ''}`}
              onClick={() => handleEventTypeSelect(type.id)}
            >
              <div className={styles.optionIcon}>
                <i className={`fas ${type.icon}`}></i>
              </div>
              <div className={styles.optionTitle}>{type.label}</div>
            </div>
          ))}
        </div>
        {errors.eventType && <div className={styles.formError}>{errors.eventType}</div>}
      </div>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="eventDate" className={styles.formLabel}>
            Date de l'événement <span className={styles.requiredField}>*</span>
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className={styles.formInput}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.eventDate && <div className={styles.formError}>{errors.eventDate}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="guestCount" className={styles.formLabel}>
            Nombre d'invités <span className={styles.requiredField}>*</span>
          </label>
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleInputChange}
            className={styles.formInput}
            placeholder="Nombre d'invités estimé"
            min="1"
          />
          {errors.guestCount && <div className={styles.formError}>{errors.guestCount}</div>}
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Type de lieu <span className={styles.requiredField}>*</span>
        </label>
        <div className={styles.optionGrid}>
          {EVENT_VENUES.map(venue => (
            <div
              key={venue.id}
              className={`${styles.optionCard} ${formData.venue === venue.id ? styles.optionCardSelected : ''}`}
              onClick={() => handleVenueSelect(venue.id)}
            >
              <div className={styles.optionIcon}>
                <i className={`fas ${venue.icon}`}></i>
              </div>
              <div className={styles.optionTitle}>{venue.label}</div>
            </div>
          ))}
        </div>
        {errors.venue && <div className={styles.formError}>{errors.venue}</div>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="venueAddress" className={styles.formLabel}>
          Adresse du lieu <span className={styles.optionalField}>(si connue)</span>
        </label>
        <input
          type="text"
          id="venueAddress"
          name="venueAddress"
          value={formData.venueAddress}
          onChange={handleInputChange}
          className={styles.formInput}
          placeholder="Adresse complète du lieu (si déjà réservé)"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="budget" className={styles.formLabel}>
          Budget approximatif (€) <span className={styles.requiredField}>*</span>
        </label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          className={styles.formInput}
          placeholder="Votre budget total pour l'événement"
          min="0"
          step="500"
        />
        {errors.budget && <div className={styles.formError}>{errors.budget}</div>}
      </div>
    </div>
  );
  
  // Rendu de l'étape 3 : Services et formules
  const renderStep3 = () => (
    <div className={styles.formStep}>
      <div className={styles.stepHeader}>
        <div className={styles.stepNumber}>3</div>
        <h3 className={styles.stepTitle}>Services et formules</h3>
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Choisissez une formule <span className={styles.requiredField}>*</span>
        </label>
        {formData.guestCount && (
          <div className={styles.optionGrid}>
            {PACKAGES.map(pkg => {
              const guestCount = parseInt(formData.guestCount, 10) || 0;
              const totalPrice = pkg.basePrice + (pkg.pricePerGuest * guestCount);
              
              return (
                <div
                  key={pkg.id}
                  className={`${styles.optionCard} ${formData.package === pkg.id ? styles.optionCardSelected : ''}`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  <div className={styles.optionIcon}>
                    <i className={`fas ${pkg.icon}`}></i>
                  </div>
                  <div className={styles.optionTitle}>{pkg.title}</div>
                  <div className={styles.optionDescription}>{pkg.description}</div>
                  <div className={styles.optionPrice}>
                    <strong>{formatPrice(totalPrice)}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!formData.guestCount && (
          <div className={styles.formError}>
            Veuillez d'abord indiquer le nombre d'invités à l'étape précédente.
          </div>
        )}
        {errors.package && <div className={styles.formError}>{errors.package}</div>}
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Services additionnels <span className={styles.optionalField}>(optionnel)</span>
        </label>
        <div className={styles.addons}>
          {ADDONS.map(addon => (
            <div key={addon.id} className={styles.addon}>
              <input
                type="checkbox"
                id={`addon-${addon.id}`}
                checked={formData.addons.includes(addon.id)}
                onChange={() => handleAddonToggle(addon.id)}
                className={styles.addonCheckbox}
              />
              <div className={styles.addonInfo}>
                <div className={styles.addonTitle}>
                  <label htmlFor={`addon-${addon.id}`}>{addon.title}</label>
                  <span className={styles.addonPrice}>{formatPrice(addon.price)}</span>
                </div>
                <div className={styles.addonDescription}>{addon.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.summarySection}>
        <h4 className={styles.summaryTitle}>Récapitulatif de votre devis</h4>
        
        <table className={styles.summaryTable}>
          <tbody>
            {formData.package && (
              <tr>
                <td className={styles.summaryLabel}>
                  Formule {PACKAGES.find(pkg => pkg.id === formData.package)?.title}
                </td>
                <td className={styles.summaryValue}>
                  {formatPrice(
                    PACKAGES.find(pkg => pkg.id === formData.package)?.basePrice +
                    (PACKAGES.find(pkg => pkg.id === formData.package)?.pricePerGuest * (parseInt(formData.guestCount, 10) || 0))
                  )}
                </td>
              </tr>
            )}
            
            {formData.addons.map(addonId => {
              const addon = ADDONS.find(a => a.id === addonId);
              return (
                <tr key={addonId}>
                  <td className={styles.summaryLabel}>{addon?.title}</td>
                  <td className={styles.summaryValue}>{formatPrice(addon?.price || 0)}</td>
                </tr>
              );
            })}
            
            <tr>
              <td className={styles.summaryLabel}>Total estimé</td>
              <td className={`${styles.summaryValue} ${styles.summaryTotal}`}>
                {formatPrice(calculateTotal())}
              </td>
            </tr>
          </tbody>
        </table>
        
        <p>
          <small>
            * Ce devis est estimatif et sera affiné après notre premier rendez-vous de consultation.
          </small>
        </p>
      </div>
    </div>
  );
  
  // Rendu de l'étape 4 : Détails supplémentaires
  const renderStep4 = () => (
    <div className={styles.formStep}>
      <div className={styles.stepHeader}>
        <div className={styles.stepNumber}>4</div>
        <h3 className={styles.stepTitle}>Détails supplémentaires</h3>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="eventTheme" className={styles.formLabel}>
          Thème ou style souhaité <span className={styles.optionalField}>(optionnel)</span>
        </label>
        <input
          type="text"
          id="eventTheme"
          name="eventTheme"
          value={formData.eventTheme}
          onChange={handleInputChange}
          className={styles.formInput}
          placeholder="Ex: Bohème, Élégant, Moderne, etc."
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="specialRequests" className={styles.formLabel}>
          Demandes spéciales ou informations complémentaires
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          className={styles.formTextarea}
          placeholder="Partagez toute information supplémentaire qui pourrait nous aider à créer le devis le plus précis possible"
        ></textarea>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="hearAboutUs" className={styles.formLabel}>
          Comment avez-vous entendu parler de nous ?
        </label>
        <select
          id="hearAboutUs"
          name="hearAboutUs"
          value={formData.hearAboutUs}
          onChange={handleInputChange}
          className={styles.formSelect}
        >
          <option value="">Sélectionnez une option</option>
          <option value="search">Moteur de recherche</option>
          <option value="social">Réseaux sociaux</option>
          <option value="recommendation">Recommandation</option>
          <option value="event">Événement ou salon</option>
          <option value="press">Presse / Magazine</option>
          <option value="other">Autre</option>
        </select>
      </div>
      
      <div className={styles.summarySection}>
        <h4 className={styles.summaryTitle}>Résumé de votre demande</h4>
        
        <table className={styles.summaryTable}>
          <tbody>
            <tr>
              <td className={styles.summaryLabel}>Événement</td>
              <td className={styles.summaryValue}>
                {EVENT_TYPES.find(type => type.id === formData.eventType)?.label || formData.eventType}
              </td>
            </tr>
            <tr>
              <td className={styles.summaryLabel}>Date</td>
              <td className={styles.summaryValue}>{formData.eventDate}</td>
            </tr>
            <tr>
              <td className={styles.summaryLabel}>Invités</td>
              <td className={styles.summaryValue}>{formData.guestCount} personnes</td>
            </tr>
            <tr>
              <td className={styles.summaryLabel}>Lieu</td>
              <td className={styles.summaryValue}>
                {EVENT_VENUES.find(venue => venue.id === formData.venue)?.label || formData.venue}
                {formData.venueAddress && ` (${formData.venueAddress})`}
              </td>
            </tr>
            <tr>
              <td className={styles.summaryLabel}>Formule</td>
              <td className={styles.summaryValue}>
                {PACKAGES.find(pkg => pkg.id === formData.package)?.title || formData.package}
              </td>
            </tr>
            <tr>
              <td className={styles.summaryLabel}>Total estimé</td>
              <td className={`${styles.summaryValue} ${styles.summaryTotal}`}>
                {formatPrice(calculateTotal())}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Rendu de la confirmation
  const renderConfirmation = () => (
    <div className={styles.confirmationMessage}>
      <div className={styles.confirmationIcon}>
        <i className="fas fa-check-circle"></i>
      </div>
      
      <h3 className={styles.confirmationTitle}>Votre demande de devis a été envoyée avec succès !</h3>
      
      <div className={styles.confirmationText}>
        <p>
          Merci pour votre demande de devis. Notre équipe va l'examiner et vous contactera dans les 
          24 à 48 heures ouvrées pour discuter des détails et finaliser votre projet.
        </p>
        
        <p>
          Numéro de référence : <span className={styles.quoteNumber}>{quoteNumber}</span>
        </p>
        
        <p>
          Un email de confirmation a été envoyé à <strong>{formData.email}</strong> avec un récapitulatif 
          de votre demande.
        </p>
      </div>
      
      <div>
        <Link to="/" className="button">
          <i className="fas fa-home"></i> Retour à l'accueil
        </Link>
        
        <button className={`button outline ${styles.downloadButton}`}>
          <i className={`fas fa-file-pdf ${styles.downloadIcon}`}></i> Télécharger le devis préliminaire
        </button>
      </div>
    </div>
  );
  
  // Rendu des boutons de navigation
  const renderNavigationButtons = () => {
    if (isSubmitted) return null;
    
    return (
      <div className={styles.actionButtons}>
        {currentStep > 1 && (
          <button 
            type="button" 
            className={`${styles.prevButton}`}
            onClick={goToPrevStep}
          >
            <i className="fas fa-arrow-left"></i> Précédent
          </button>
        )}
        
        {currentStep < 4 && (
          <button 
            type="button" 
            className={`${styles.nextButton}`}
            onClick={goToNextStep}
          >
            Suivant <i className="fas fa-arrow-right"></i>
          </button>
        )}
        
        {currentStep === 4 && (
          <button 
            type="button" 
            className={`${styles.submitButton}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Traitement...
              </>
            ) : (
              <>
                Envoyer ma demande de devis
              </>
            )}
          </button>
        )}
      </div>
    );
  };
  
  return (
    <section className={styles.quoteSection} id="quote-section">
      <div className="container">
        <div className="section-title">
          <h2>Demande de Devis</h2>
          <p>Obtenez un devis personnalisé pour votre événement</p>
        </div>
        
        <div className={styles.quoteDescription}>
          <p>
            Remplissez le formulaire ci-dessous pour recevoir un devis adapté à vos besoins.
            Notre équipe prendra contact avec vous dans les plus brefs délais pour discuter
            de votre projet en détail.
          </p>
        </div>
        
        <div className={styles.quoteFormContainer}>
          {!isSubmitted && (
            <div className={styles.progressBar}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          )}
          
          {isSubmitted ? (
            renderConfirmation()
          ) : (
            <>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </>
          )}
          
          {renderNavigationButtons()}
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;