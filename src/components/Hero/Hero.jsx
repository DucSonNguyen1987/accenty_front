// src/components/Hero/Hero.jsx - Mise à jour des styles pour les nouvelles polices

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <img 
          src="/images/hero-bg.jpg" 
          alt="Événement élégant organisé par Accenty & Co" 
          className={styles.heroBgImage}
        />
      </div>
      <div className={styles.overlay}></div>
      
      <div className="container">
        <div className={styles.content}>
          <p className={`${styles.subtitle} animate-fade-in`}>
            Votre agence événementielle de confiance
          </p>
          <h1 className={`${styles.title} animate-slide-up`}>
            Des événements <span>inoubliables</span>, une organisation <span>impeccable</span>
          </h1>
          <p className={`${styles.description} animate-slide-up delay-200`}>
            Nous transformons vos idées en événements mémorables. Mariages, séminaires, 
            lancements de produits, nous créons l'expérience parfaite pour chaque occasion.
          </p>
          
          <div className={`${styles.buttons} animate-slide-up delay-300`}>
            <Link to="/services" className="button">
              Découvrir nos services
            </Link>
            <Link to="/appointment" className="button outline">
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;