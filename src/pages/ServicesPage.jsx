// src/pages/ServicesPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../components/Services/Services.module.css';

const ServicesPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Récupérer l'ancre de l'URL et définir l'onglet actif
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && serviceCategories.some(category => category.id === hash)) {
      setActiveTab(hash);
      
      // Faire défiler jusqu'à la section des services
      setTimeout(() => {
        const servicesSection = document.getElementById('services-section');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setActiveTab('all');
    }
  }, [location]);
  
  // Gérer l'ouverture/fermeture des FAQ
  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };
  
  // Catégories de services
  const serviceCategories = [
    { id: 'all', label: 'Tous les services' },
    { id: 'wedding', label: 'Mariages' },
    { id: 'corporate', label: 'Événements Corporatifs' },
    { id: 'private', label: 'Célébrations Privées' },
    { id: 'launch', label: 'Lancements de Produits' },
    { id: 'gala', label: 'Galas & Dîners' },
  ];
  
  // Données des services
  const servicesData = [
    {
      id: 'wedding',
      title: 'Mariages & Cérémonies',
      description: 'Des mariages uniques et inoubliables, organisés avec soin pour créer des moments magiques. Notre équipe d\'experts vous accompagne à chaque étape, de la planification à la coordination le jour J.',
      icon: 'fa-heart',
      image: '/images/services/wedding.jpg',
      features: [
        'Coordination complète ou partielle',
        'Sélection du lieu et des prestataires',
        'Design et décoration personnalisés',
        'Gestion administrative et logistique',
        'Planification du timing de la journée',
        'Coordination le jour J'
      ],
      price: 'À partir de 3 500 €',
      category: 'wedding',
      details: 'Notre service de planification de mariage est conçu pour vous offrir une expérience sans stress et mémorable. Nous commençons par une consultation approfondie pour comprendre votre vision et vos attentes. Ensuite, nous élaborons un concept unique qui reflète votre personnalité et vos goûts. Notre équipe se charge de la sélection et de la coordination des prestataires, de la gestion du budget, et de tous les aspects logistiques. Le jour J, nous assurons une coordination impeccable pour que vous puissiez profiter pleinement de votre journée spéciale.',
      packages: [
        {
          title: 'Coordination Jour J',
          price: '1 500 €',
          includes: [
            'Réunion de préparation 1 mois avant',
            'Création du planning détaillé',
            'Présence d\'un coordinateur (10h)',
            'Supervision des prestataires',
            'Gestion des imprévus'
          ]
        },
        {
          title: 'Organisation Partielle',
          price: '3 500 €',
          includes: [
            'Sélection des prestataires manquants',
            'Conseils déco et ambiance',
            '3 réunions de planification',
            'Coordination le jour J (12h)',
            'Gestion du timing et des prestataires'
          ]
        },
        {
          title: 'Organisation Complète',
          price: '6 500 €',
          includes: [
            'Accompagnement de A à Z',
            'Recherche du lieu et tous prestataires',
            'Design personnalisé et scénographie',
            'Réunions régulières et suivi détaillé',
            'Coordination le jour J (équipe de 2)',
            'Service suppression de stress inclus !'
          ]
        }
      ]
    },
    {
      id: 'corporate',
      title: 'Événements Corporatifs',
      description: 'Des événements professionnels sur-mesure qui reflètent les valeurs et objectifs de votre entreprise. Séminaires, conférences, soirées d\'entreprise, team building...',
      icon: 'fa-briefcase',
      image: '/images/services/corporate.jpg',
      features: [
        'Séminaires et conférences',
        'Lancements de produits',
        'Team building et incentives',
        'Soirées d\'entreprise et galas',
        'Salons professionnels',
        'Conventions et assemblées'
      ],
      price: 'À partir de 2 500 €',
      category: 'corporate',
      details: 'Nos événements d\'entreprise sont conçus pour répondre à vos objectifs professionnels tout en offrant une expérience mémorable. Que vous souhaitiez renforcer votre culture d\'entreprise, lancer un nouveau produit, ou organiser une conférence marquante, notre équipe crée des concepts originaux et impactants. Nous prenons en charge la stratégie, la planification, la logistique, et la coordination afin que vous puissiez vous concentrer sur les aspects stratégiques de votre événement.',
      packages: [
        {
          title: 'Séminaire / Conférence',
          price: '2 500 €',
          includes: [
            'Recherche du lieu adapté',
            'Coordination technique',
            'Gestion des intervenants',
            'Logistique et catering',
            'Coordination sur place'
          ]
        },
        {
          title: 'Team Building',
          price: '1 800 €',
          includes: [
            'Conception d\'activités personnalisées',
            'Sélection des prestataires',
            'Logistique complète',
            'Animation et coordination',
            'Évaluation post-événement'
          ]
        },
        {
          title: 'Soirée d\'entreprise',
          price: '4 500 €',
          includes: [
            'Concept créatif et thématique',
            'Scénographie complète',
            'Sélection des animations',
            'Coordination de la restauration',
            'Gestion technique et logistique',
            'Équipe de coordination sur place'
          ]
        }
      ]
    },
    {
      id: 'private',
      title: 'Célébrations Privées',
      description: 'Des événements personnalisés pour célébrer les moments importants de votre vie. Anniversaires, baptêmes, fêtes familiales, célébrations diverses...',
      icon: 'fa-birthday-cake',
      image: '/images/services/private.jpg',
      features: [
        'Anniversaires et fêtes',
        'Baptêmes et baby showers',
        'Réunions familiales',
        'Soirées à thème',
        'Célébrations diverses',
        'Événements sur-mesure'
      ],
      price: 'À partir de 1 500 €',
      category: 'private',
      details: 'Chaque moment important de votre vie mérite d\'être célébré avec style. Nos services d\'organisation d\'événements privés sont conçus pour créer des expériences personnalisées qui reflètent votre personnalité et vos envies. De la conception créative à la coordination le jour J, nous nous occupons de tous les détails pour que vous puissiez profiter pleinement de votre événement avec vos proches.',
      packages: [
        {
          title: 'Événement Simple',
          price: '1 500 €',
          includes: [
            'Conception du concept',
            'Conseil en décoration',
            'Sélection des prestataires',
            'Coordination le jour J (6h)',
            'Gestion de la mise en place'
          ]
        },
        {
          title: 'Événement Thématique',
          price: '2 800 €',
          includes: [
            'Création d\'un thème sur-mesure',
            'Scénographie et décoration complète',
            'Sélection d\'animations thématiques',
            'Coordination des prestataires',
            'Présence sur place (8h)'
          ]
        },
        {
          title: 'Célébration Premium',
          price: '4 500 €',
          includes: [
            'Concept exclusif et personnalisé',
            'Décoration haut de gamme',
            'Coordination complète de A à Z',
            'Animations et expériences uniques',
            'Équipe de coordination (10h)',
            'Service photo/vidéo inclus'
          ]
        }
      ]
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
        'Coordination technique',
        'Activations de marque',
        'Évaluation des retombées'
      ],
      price: 'À partir de 4 000 €',
      category: 'launch',
      details: 'Un lancement de produit réussi nécessite une stratégie efficace et une exécution impeccable. Notre équipe crée des événements de lancement qui mettent en valeur les atouts de votre produit et génèrent l\'enthousiasme nécessaire. Nous combinons créativité, technologie et expérience utilisateur pour créer des moments mémorables qui renforcent votre marque et maximisent l\'impact médiatique.',
      packages: [
        {
          title: 'Lancement Standard',
          price: '4 000 €',
          includes: [
            'Concept créatif',
            'Organisation logistique',
            'Scénographie de base',
            'Coordination technique',
            'Suivi des invitations'
          ]
        },
        {
          title: 'Lancement Premium',
          price: '7 500 €',
          includes: [
            'Stratégie de lancement complète',
            'Scénographie immersive',
            'Mise en scène du produit',
            'Gestion des relations presse',
            'Captation photo/vidéo',
            'Coordination complète'
          ]
        },
        {
          title: 'Lancement Prestige',
          price: '12 000 €',
          includes: [
            'Stratégie 360° et storytelling',
            'Lieu exclusif et aménagement complet',
            'Expériences interactives',
            'RP et invitations personnalisées',
            'Production audiovisuelle haut de gamme',
            'Analyse des retombées post-événement'
          ]
        }
      ]
    },
    {
      id: 'gala',
      title: 'Galas & Dîners',
      description: 'Des soirées élégantes et raffinées pour vos événements de prestige. Galas caritatifs, dîners de gala, remises de prix...',
      icon: 'fa-glass-cheers',
      image: '/images/services/gala.jpg',
      features: [
        'Dîners de gala',
        'Événements caritatifs',
        'Remises de prix',
        'Soirées VIP',
        'Dîners d\'exception',
        'Événements de prestige'
      ],
      price: 'À partir de 5 000 €',
      category: 'gala',
      details: 'Nos galas et dîners sont conçus pour impressionner et créer des souvenirs durables. Avec une attention méticuleuse aux détails, nous créons des atmosphères élégantes et raffinées qui reflètent l\'importance de votre événement. De la sélection du lieu prestigieux à la création d\'une expérience culinaire exceptionnelle, nous orchestrons chaque aspect pour garantir une soirée mémorable qui dépasse les attentes de vos invités.',
      packages: [
        {
          title: 'Dîner Élégant',
          price: '5 000 €',
          includes: [
            'Sélection du lieu',
            'Coordination avec le traiteur',
            'Décoration de tables',
            'Planification et logistique',
            'Coordination le jour J'
          ]
        },
        {
          title: 'Gala Caritatif',
          price: '8 500 €',
          includes: [
            'Concept et thématisation',
            'Décoration complète',
            'Coordination des animations',
            'Gestion des enchères/dons',
            'Logistique des invités',
            'Équipe de coordination'
          ]
        },
        {
          title: 'Événement Prestige',
          price: '15 000 €',
          includes: [
            'Lieu exclusif',
            'Scénographie immersive',
            'Menu gastronomique personnalisé',
            'Entertainment haut de gamme',
            'Coordination VIP',
            'Service conciergerie pour les invités',
            'Production audiovisuelle complète'
          ]
        }
      ]
    }
  ];
  
  // Filtrer les services selon l'onglet actif
  const filteredServices = activeTab === 'all'
    ? servicesData
    : servicesData.filter(service => service.category === activeTab || service.id === activeTab);
  
  // Données du processus de travail
  const processSteps = [
    {
      number: 1,
      title: 'Consultation',
      description: 'Première rencontre pour comprendre vos besoins et attentes'
    },
    {
      number: 2,
      title: 'Proposition',
      description: 'Élaboration d\'un concept personnalisé et d\'un devis détaillé'
    },
    {
      number: 3,
      title: 'Planification',
      description: 'Organisation minutieuse de tous les aspects de votre événement'
    },
    {
      number: 4,
      title: 'Coordination',
      description: 'Gestion complète le jour J pour un événement sans stress'
    }
  ];
  
  // Données de la FAQ
  const faqItems = [
    {
      question: 'Quels types d\'événements organisez-vous ?',
      answer: 'Nous organisons une large gamme d\'événements, notamment des mariages, des événements corporatifs, des célébrations privées, des lancements de produits, et des galas. Chaque événement est personnalisé selon vos besoins et préférences.'
    },
    {
      question: 'Combien de temps à l\'avance faut-il vous contacter ?',
      answer: 'Pour les grands événements comme les mariages, nous recommandons de nous contacter au moins 6 à 12 mois à l\'avance. Pour les événements plus petits, 3 à 6 mois sont généralement suffisants. Cependant, nous pouvons également organiser des événements dans des délais plus courts selon notre disponibilité.'
    },
    {
      question: 'Travaillez-vous avec vos propres prestataires ?',
      answer: 'Nous collaborons avec un réseau de prestataires de confiance que nous avons sélectionnés pour leur professionnalisme et la qualité de leurs services. Cependant, nous sommes également ouverts à travailler avec vos propres prestataires si vous le souhaitez.'
    },
    {
      question: 'Comment se déroule le processus de planification ?',
      answer: 'Notre processus commence par une consultation initiale pour comprendre votre vision. Ensuite, nous élaborons une proposition détaillée incluant un concept créatif et un budget estimatif. Une fois la proposition acceptée, nous passons à la phase de planification où nous coordonnons tous les aspects de votre événement. Enfin, le jour J, notre équipe est présente pour assurer une coordination impeccable.'
    },
    {
      question: 'Quel est le coût de vos services ?',
      answer: 'Nos tarifs varient en fonction de la complexité, de la taille et des exigences spécifiques de votre événement. Nous proposons différentes formules pour s\'adapter à divers budgets. Contactez-nous pour obtenir un devis personnalisé.'
    },
    {
      question: 'Êtes-vous disponibles pour des événements à l\'étranger ?',
      answer: 'Oui, nous organisons des événements dans toute la France et à l\'international. Des frais supplémentaires peuvent s\'appliquer pour les déplacements et l\'hébergement de notre équipe.'
    }
  ];
  
  return (
    <>
      {/* En-tête de page */}
      <div className="page-header">
        <div className="container">
          <h1>Nos Services</h1>
          <p>Des événements exceptionnels, une organisation impeccable</p>
        </div>
      </div>
      
      {/* Section des services */}
      <section className={styles.servicesSection} id="services-section">
        <div className="container">
          <div className={styles.servicesDescription}>
            <p>
              Chez Accenty & Co, nous proposons une gamme complète de services événementiels 
              pour répondre à tous vos besoins. De la conception créative à la coordination 
              le jour J, notre équipe d'experts transforme vos idées en événements mémorables.
            </p>
          </div>
          
          {/* Onglets de filtrage */}
          <div className="tabs" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '10px', 
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            {serviceCategories.map((category) => (
              <button 
                key={category.id}
                className={`tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
                style={{
                  padding: '10px 20px',
                  background: activeTab === category.id ? '#d9ab55' : 'transparent',
                  color: activeTab === category.id ? 'white' : '#333',
                  border: activeTab === category.id ? 'none' : '1px solid #ddd',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '600'
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Liste des services */}
          <div className={styles.servicesGrid}>
            {filteredServices.map((service) => (
              <div key={service.id} className={styles.serviceCard} id={service.id}>
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
                    to="/quote" 
                    className={`button ${styles.serviceButton}`}
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Formules des services */}
          {filteredServices.length === 1 && filteredServices[0].packages && (
            <div className={styles.servicesFeatured}>
              <h3 className={styles.servicesFeaturedTitle}>Nos formules {filteredServices[0].title}</h3>
              <p className={styles.servicesFeaturedDescription}>
                Choisissez la formule qui correspond le mieux à vos besoins et à votre budget.
              </p>
              
              <div className={styles.servicesGrid}>
                {filteredServices[0].packages.map((pkg, index) => (
                  <div key={index} className={styles.serviceCard}>
                    <div className={styles.serviceContent} style={{ padding: '30px' }}>
                      <h3 className={styles.serviceTitle}>{pkg.title}</h3>
                      
                      <div className={styles.servicePrice} style={{ marginBottom: '20px' }}>
                        <span className={styles.servicePriceValue}>{pkg.price}</span>
                      </div>
                      
                      <div className={styles.serviceFeatures}>
                        {pkg.includes.map((item, idx) => (
                          <div key={idx} className={styles.serviceFeature}>
                            <i className={`fas fa-check ${styles.serviceFeatureIcon}`}></i>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link 
                        to="/quote" 
                        className={`button outline ${styles.serviceButton}`}
                        style={{ marginTop: '20px' }}
                      >
                        Demander un devis
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Section du processus */}
      <section className={styles.processList}>
        <div className="container">
          <h2 className={styles.processTitle}>Notre processus</h2>
          
          <div className={styles.processSteps}>
            {processSteps.map((step) => (
              <div key={step.number} className={styles.processStep}>
                <div className={styles.processStepNumber}>{step.number}</div>
                <div className={styles.processStepTitle}>{step.title}</div>
                <div className={styles.processStepDescription}>{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section FAQ */}
      <section className={styles.faqSection}>
        <div className="container">
          <h2 className={styles.faqTitle}>Questions fréquentes</h2>
          
          <div className={styles.faqGrid}>
            {faqItems.map((item, index) => (
              <div key={index} className={styles.faqItem}>
                <div 
                  className={`${styles.faqQuestion} ${activeFaq === index ? styles.faqQuestionActive : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{item.question}</span>
                  <i className={`fas fa-chevron-down ${styles.faqQuestionIcon}`}></i>
                </div>
                
                <div className={`${styles.faqAnswer} ${activeFaq === index ? styles.faqAnswerVisible : ''}`}>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section CTA */}
      <section className={styles.cta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Prêt à créer un événement exceptionnel ?</h2>
          
          <p className={styles.ctaDescription}>
            Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir 
            comment notre équipe peut transformer votre vision en réalité.
          </p>
          
          <div className={styles.ctaButtons}>
            <Link to="/appointment" className="button">
              Prendre rendez-vous
            </Link>
            
            <Link to="/quote" className="button outline">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;