// src/components/Testimonials/Testimonials.jsx - Version corrigée (suppression variables non utilisées)

import React, { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

const Testimonials = ({ title, subtitle, testimonials: propTestimonials }) => {
  // Si aucun témoignage n'est fourni, utiliser les témoignages par défaut
  const defaultTestimonials = [
    {
      id: 1,
      text: "L'équipe d'Accenty & Co a transformé notre mariage en un moment magique. Chaque détail était parfait, et nous avons pu profiter pleinement de notre journée sans stress.",
      author: "Kamwanya & Mukeba",
      role: "Mariage Juin 2024",
      image: "/images/testimonials/testimonial1.jpg",
      rating: 5
    },
    {
      id: 2,
      text: "Notre conférence annuelle a été un succès retentissant grâce à Accenty & Co. Organisation impeccable, décoration élégante, et une équipe toujours à l'écoute de nos besoins.",
      author: "Kabedi Lukusa",
      role: "Directrice Marketing, TechVision",
      image: "/images/testimonials/testimonial2.jpg",
      rating: 5
    },
    {
      id: 3,
      text: "Pour mes 40 ans, je voulais quelque chose de spécial. Accenty & Co a dépassé toutes mes attentes avec une fête sur-mesure que mes invités n'oublieront jamais.",
      author: "Mwamba Mudimbi",
      role: "Anniversaire Avril 2024",
      image: "/images/testimonials/testimonial3.jpg",
      rating: 5
    },
    {
      id: 4,
      text: "Le lancement de notre nouveau produit a été parfaitement orchestré par Accenty & Co. L'événement a généré un buzz incroyable et les retombées médiatiques ont dépassé nos objectifs.",
      author: "Kadima Mabele",
      role: "Directeur Commercial, NexGen",
      image: "/images/testimonials/testimonial4.jpg",
      rating: 4
    },
    {
      id: 5,
      text: "Un grand merci à toute l'équipe pour l'organisation de notre gala caritatif. Grâce à votre professionnalisme, nous avons récolté plus de fonds que jamais auparavant.",
      author: "Fondation Nkosi",
      role: "Gala annuel 2024",
      image: "/images/testimonials/testimonial5.jpg",
      rating: 5
    }
  ];
  
  const testimonials = propTestimonials || defaultTestimonials;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  
  // Fonction pour naviguer vers le témoignage précédent
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  // Fonction pour naviguer vers le témoignage suivant
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  // Configurer un défilement automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Gestion du swipe sur mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe vers la gauche
      nextTestimonial();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe vers la droite
      prevTestimonial();
    }
  };
  
  // Fonction pour générer les étoiles d'évaluation
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className={`fas fa-star ${styles.testimonialStar}`}></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className={`fas fa-star-half-alt ${styles.testimonialStar}`}></i>);
      } else {
        stars.push(<i key={i} className={`far fa-star ${styles.testimonialStar}`}></i>);
      }
    }
    return stars;
  };
  
  // Les variables prevIndex et nextIndex ont été supprimées car elles n'étaient pas utilisées
  
  // Générer le SVG de fond
  const backgroundSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="#000" />
      <text x="5" y="30" fontSize="10" fontFamily="serif" fill="#fff">"</text>
      <text x="80" y="80" fontSize="10" fontFamily="serif" fill="#fff">"</text>
      <text x="30" y="50" fontSize="10" fontFamily="serif" fill="#fff">"</text>
      <text x="60" y="20" fontSize="10" fontFamily="serif" fill="#fff">"</text>
      <text x="40" y="90" fontSize="10" fontFamily="serif" fill="#fff">"</text>
    </svg>
  );
  
  return (
    <section className={styles.testimonialSection} id="testimonials-section">
      <div className={styles.testimonialBackground}>
        {backgroundSvg}
      </div>
      
      <div className="container">
        <div className={styles.testimonialContainer}>
          <div className="section-title">
            <h2>{title || "Témoignages Clients"}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          
          {testimonials.length > 0 && (
            <div className={styles.testimonialSlider}>
              <div 
                className={styles.testimonialNav} 
                onClick={prevTestimonial}
                role="button"
                aria-label="Témoignage précédent"
                tabIndex="0"
                style={{ left: '-20px' }}
              >
                <i className="fas fa-chevron-left"></i>
              </div>
              
              <div 
                className={styles.testimonialCarousel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  className={styles.testimonialItems}
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className={styles.testimonialItem}>
                      <div className={styles.testimonialCard}>
                        {testimonial.image && (
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author} 
                            className={styles.testimonialImage} 
                            loading="lazy"
                          />
                        )}
                        
                        <div className={styles.testimonialRating}>
                          {renderStars(testimonial.rating || 5)}
                        </div>
                        
                        <p className={styles.testimonialText}>{testimonial.text}</p>
                        
                        <div className={styles.testimonialAuthor}>{testimonial.author}</div>
                        {testimonial.role && (
                          <div className={styles.testimonialRole}>{testimonial.role}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div 
                className={styles.testimonialNav} 
                onClick={nextTestimonial}
                role="button"
                aria-label="Témoignage suivant"
                tabIndex="0"
                style={{ right: '-20px' }}
              >
                <i className="fas fa-chevron-right"></i>
              </div>
              
              <div className={styles.testimonialDots}>
                {testimonials.map((_, index) => (
                  <div 
                    key={index} 
                    className={`${styles.testimonialDot} ${index === currentIndex ? styles.testimonialDotActive : ''}`} 
                    onClick={() => setCurrentIndex(index)}
                    role="button"
                    tabIndex="0"
                    aria-label={`Témoignage ${index + 1}`}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;