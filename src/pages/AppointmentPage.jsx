// src/pages/AppointmentPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppointmentForm from '../components/Appointment/AppointementForm';
import styles from '../components/Appointment/Appointment.module.css';

const AppointmentPage = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simuler un chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Données des services pour lesquels on peut prendre rendez-vous
  const appointmentServices = [
    {
      id: 1,
      title: 'Consultation initiale',
      description: 'Un premier rendez-vous pour discuter de votre projet et explorer vos besoins.',
      duration: '45 min',
      icon: 'fa-comments',
    },
    {
      id: 2,
      title: 'Visite de lieu',
      description: 'Accompagnement pour visiter et évaluer des lieux potentiels pour votre événement.',
      duration: '2h',
      icon: 'fa-map-marker-alt',
    },
    {
      id: 3,
      title: 'Présentation de concept',
      description: 'Présentation détaillée de notre concept créatif pour votre événement.',
      duration: '1h',
      icon: 'fa-lightbulb',
    },
    {
      id: 4,
      title: 'Sélection des prestataires',
      description: 'Rendez-vous pour choisir et confirmer les prestataires pour votre événement.',
      duration: '1h30',
      icon: 'fa-handshake',
    },
  ];
  
  // FAQ sur les rendez-vous
  const appointmentFAQ = [
    {
      question: 'Comment se déroule la consultation initiale ?',
      answer: 'La consultation initiale est un échange de 45 minutes où nous discutons de votre vision, vos attentes et votre budget. Nous identifions vos besoins spécifiques et explorons les possibilités pour votre événement. C\'est une étape essentielle pour établir une relation de confiance et poser les bases de notre collaboration.'
    },
    {
      question: 'Dois-je me préparer pour le rendez-vous ?',
      answer: 'Pour optimiser notre rencontre, nous vous recommandons de réfléchir en amont à quelques éléments clés : type d\'événement souhaité, nombre approximatif d\'invités, budget envisagé, et vos inspirations ou thèmes préférés. Vous pouvez également préparer vos questions pour notre équipe.'
    },
    {
      question: 'Les rendez-vous sont-ils payants ?',
      answer: 'La consultation initiale est offerte sans engagement. Pour les autres types de rendez-vous comme les visites de lieux, le montant est déduit de votre facture finale si vous confirmez votre événement avec nous.'
    },
    {
      question: 'Puis-je annuler ou reporter mon rendez-vous ?',
      answer: 'Oui, vous pouvez modifier ou annuler votre rendez-vous jusqu\'à 24 heures avant l\'heure prévue. Pour ce faire, connectez-vous à votre espace client ou contactez-nous par téléphone.'
    },
    {
      question: 'Les rendez-vous sont-ils disponibles en ligne ?',
      answer: 'Oui, nous proposons des consultations par visioconférence pour les clients qui ne peuvent pas se déplacer. Sélectionnez simplement l\'option "Rendez-vous virtuel" lors de votre réservation.'
    }
  ];
  
  return (
    <>
      {/* En-tête de page */}
      <div className="page-header">
        <div className="container">
          <h1>Prendre Rendez-vous</h1>
          <p>Planifiez une rencontre avec notre équipe d'experts</p>
        </div>
      </div>
      
      {/* Section principale */}
      <section className={styles.appointmentSection}>
        <div className="container">
          {isLoading ? (
            <div className="text-center" style={{ padding: '100px 0' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
            </div>
          ) : (
            <div className={styles.appointmentGrid}>
              {/* Colonne d'information */}
              <div className={styles.appointmentInfo}>
                <h2>Rencontrons-nous pour discuter de votre projet</h2>
                <p>
                  Vous avez un événement à organiser ? Prenez rendez-vous avec notre équipe
                  pour une consultation personnalisée. Nous discuterons de vos besoins, de vos attentes
                  et de votre vision pour créer ensemble un événement mémorable.
                </p>
                
                {currentUser ? (
                  <div className={styles.userGreeting}>
                    <p>
                      <i className="fas fa-user-circle"></i> Bonjour, {currentUser.name || currentUser.email}!
                    </p>
                    <p>
                      Vous êtes connecté(e) et pouvez réserver votre rendez-vous ci-dessous.
                      {currentUser.appointments && currentUser.appointments.length > 0 && (
                        <span> Vous avez déjà {currentUser.appointments.length} rendez-vous planifié(s).</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className={styles.loginPrompt}>
                    <p>
                      <i className="fas fa-info-circle"></i> Vous n'êtes pas encore connecté(e).
                      Vous pouvez quand même prendre rendez-vous, mais la création d'un compte
                      vous permettra de gérer tous vos rendez-vous plus facilement.
                    </p>
                    <div className={styles.authButtons}>
                      <Link to="/login" className="button outline">
                        Se connecter
                      </Link>
                      <span className={styles.orDivider}>ou</span>
                      <Link to="/login" className="button outline">
                        S'inscrire
                      </Link>
                    </div>
                  </div>
                )}
                
                <div className={styles.appointmentImage}>
                  <img 
                    src="/images/appointment/consultation.jpg" 
                    alt="Consultation avec notre équipe" 
                  />
                </div>
                
                <h3>Nos services de consultation</h3>
                <div className={styles.featureList}>
                  {appointmentServices.map(service => (
                    <div key={service.id} className={styles.featureItem}>
                      <div className={styles.featureIcon}>
                        <i className={`fas ${service.icon}`}></i>
                      </div>
                      <div className={styles.featureContent}>
                        <h4>{service.title} <span>({service.duration})</span></h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3>Foire aux questions</h3>
                <div className={styles.faqContainer}>
                  {appointmentFAQ.map((item, index) => (
                    <div key={index} className={styles.faqItem}>
                      <h4 className={styles.faqQuestion}>
                        <i className="fas fa-question-circle"></i> {item.question}
                      </h4>
                      <div className={styles.faqAnswer}>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={styles.contactInfo}>
                  <h3>Besoin d'aide ?</h3>
                  <p>
                    Si vous préférez prendre rendez-vous par téléphone ou si vous avez
                    des questions spécifiques, n'hésitez pas à nous contacter directement.
                  </p>
                  <div className={styles.contactMethods}>
                    <div className={styles.contactMethod}>
                      <i className="fas fa-phone-alt"></i>
                      <span>+243 123 456 789</span>
                    </div>
                    <div className={styles.contactMethod}>
                      <i className="fas fa-envelope"></i>
                      <span>rendez-vous@accenty-co.com</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Colonne du formulaire */}
              <div className={styles.appointmentFormWrapper}>
                <AppointmentForm />
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Section témoignages */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <h2 className="section-title">Ce que disent nos clients</h2>
          
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>
                  "La consultation initiale a été un moment clé dans la planification de notre mariage. 
                  L'équipe a su comprendre notre vision et nous a proposé des idées que nous n'aurions 
                  jamais imaginées. Un grand merci pour votre écoute et votre créativité!"
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <img src="/images/testimonials/avatar1.jpg" alt="Avatar" />
                </div>
                <div className={styles.testimonialInfo}>
                  <h4>Kabongo & Mujinga</h4>
                  <p>Mariage, Juillet 2024</p>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>
                  "En tant que directrice marketing, j'apprécie l'efficacité et le professionnalisme 
                  d'Accenty & Co. Notre première réunion a été très productive, et leur suivi a été 
                  impeccable. Notre conférence annuelle a été un succès retentissant!"
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <img src="/images/testimonials/avatar2.jpg" alt="Avatar" />
                </div>
                <div className={styles.testimonialInfo}>
                  <h4>Nzuzi Kabedi</h4>
                  <p>Directrice Marketing, TechVision</p>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>
                  "La visite des lieux avec l'équipe d'Accenty & Co a été révélatrice. Leur expertise 
                  nous a permis d'identifier le lieu parfait pour notre gala de charité. Ils ont su 
                  voir le potentiel là où nous ne voyions que des contraintes."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <img src="/images/testimonials/avatar3.jpg" alt="Avatar" />
                </div>
                <div className={styles.testimonialInfo}>
                  <h4>Fondation Nkosi</h4>
                  <p>Gala annuel 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppointmentPage;