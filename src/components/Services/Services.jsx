// src/components/Services/Services.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.css';

const Services = ({ title, subtitle, description, services, showButton = false }) => {
  const defaultServices = [
    {
      id: 'wedding',
      title: 'Mariages & Cérémonies',
      description: 'Des mariages uniques et inoubliables, organisés avec soin pour créer des moments magiques. Notre équipe d\'experts vous accompagne à chaque étape.',
      icon: 'fa-heart',
      image: '/images/services/wedding.jpg',
      features: [
        'Coordination complète ou partielle',
        'Sélection du lieu et des prestataires',
        'Design et décoration personnalisés',
        'Coordination le jour J'
      ],
      price: 'À partir de 3 500 USD$'
    },
    {
      id: 'corporate',
      title: 'Événements Corporatifs',
      description: 'Des événements professionnels sur-mesure qui reflètent les valeurs et objectifs de votre entreprise. Séminaires, conférences, soirées d\'entreprise...',
      icon: 'fa-briefcase',
      image: '/images/services/corporate.jpg',
      features: [
        'Séminaires et conférences',
        'Lancements de produits',
        'Team building et incentives',
        'Soirées d\'entreprise'
      ],
      price: 'À partir de 2 500 USD$'
    },
    {
      id: 'private',
      title: 'Célébrations Privées',
      description: 'Des événements personnalisés pour célébrer les moments importants de votre vie. Anniversaires, baptêmes, fêtes familiales...',
      icon: 'fa-birthday-cake',
      image: '/images/services/private.jpg',
      features: [
        'Anniversaires et fêtes',
        'Baptêmes et baby showers',
        'Réunions familiales',
        'Soirées à thème'
      ],
      price: 'À partir de 1 500 USD$'
    },
    {
      id: 'launch',
      title: 'Lancements de Produits',
      description: 'Mettez en valeur votre nouveau produit ou service avec un événement spectaculaire qui capte l\'attention et génère du buzz médiatique.',
      icon: 'fa-rocket',
      image: '/images/services/launch.jpg',
      features: [
        'Stratégie de lancement',
        'Scénographie et mise en scène',
        'Relations presse et médias',
        'Évaluation des retombées'
      ],
      price: 'À partir de 4 000 USD$'
    }
  ];
  
  // Utiliser les services fournis ou les services par défaut
  const displayedServices = services || defaultServices;
  
  return (
    <section className={styles.servicesSection} id="services-section">
      <div className="container">
        <div className="section-title">
          <h2>{title || "Nos Services"}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        
        {description && (
          <div className={styles.servicesDescription}>
            <p>{description}</p>
          </div>
        )}
        
        <div className={styles.servicesGrid}>
          {displayedServices.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceImageContainer}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className={styles.serviceImage} 
                  loading="lazy" 
                />
                <div className={styles.serviceIcon}>
                  <i className={`fas ${service.icon}`}></i>
                </div>
              </div>
              
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                
                {service.features && (
                  <div className={styles.serviceFeatures}>
                    {service.features.map((feature, index) => (
                      <div key={index} className={styles.serviceFeature}>
                        <i className={`fas fa-check ${styles.serviceFeatureIcon}`}></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {service.price && (
                  <div className={styles.servicePrice}>
                    <span className={styles.servicePriceValue}>{service.price}</span>
                  </div>
                )}
                
                <Link 
                  to={`/services#${service.id}`} 
                  className={`button outline ${styles.serviceButton}`}
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {showButton && (
          <div className={styles.servicesViewMore}>
            <Link to="/services" className="button">
              Voir tous nos services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;