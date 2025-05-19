// src/components/Footer/Footer.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Logo from '../../../public/images/logo.png'; // Assurez-vous que le chemin est correct

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      // Dans une application réelle, on enverrait cette information à une API
      console.log('Adresse email pour la newsletter:', email);
      setSubscribed(true);
      setEmail('');
      
      // Réinitialiser le message après quelques secondes
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <img src={Logo} alt="Accenty & Co Logo" className={styles.logoImage} />
            <div className={styles.logoText}>
              Accenty <span>&</span> Co
            </div>
            
            <p className={styles.footerDescription}>
              Votre agence événementielle de confiance. Nous créons des expériences 
              mémorables et sur-mesure pour tous vos événements professionnels et privés.
            </p>
            
            <div className={styles.socialLinks}>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                aria-label="Pinterest"
              >
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className={styles.footerTitle}>Liens rapides</h4>
            <ul className={styles.footerLinks}>
              <li className={styles.footerLink}>
                <Link to="/">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Accueil
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/services">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Nos services
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/gallery">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Galerie
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/team">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Notre équipe
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/quote">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Demande de devis
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/contact">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.footerTitle}>Nos services</h4>
            <ul className={styles.footerLinks}>
              <li className={styles.footerLink}>
                <Link to="/services#mariages">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Mariages & Cérémonies
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/services#corporate">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Événements Corporatifs
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/services#private">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Célébrations Privées
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/services#launches">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Lancements de Produits
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/services#conferences">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Conférences & Séminaires
                </Link>
              </li>
              <li className={styles.footerLink}>
                <Link to="/services#galas">
                  <i className={`fas fa-chevron-right ${styles.footerLinkIcon}`}></i>
                  Galas & Dîners
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.footerTitle}>Contact</h4>
            
            <div className={styles.contactInfo}>
              <i className={`fas fa-map-marker-alt ${styles.contactIcon}`}></i>
              <div className={styles.contactText}>
                123 Avenue des Événements<br />
                75001 Paris, France
              </div>
            </div>
            
            <div className={styles.contactInfo}>
              <i className={`fas fa-phone-alt ${styles.contactIcon}`}></i>
              <div className={styles.contactText}>
                +33 1 23 45 67 89<br />
                +33 1 98 76 54 32
              </div>
            </div>
            
            <div className={styles.contactInfo}>
              <i className={`fas fa-envelope ${styles.contactIcon}`}></i>
              <div className={styles.contactText}>
                contact@accenty-co.fr<br />
                info@accenty-co.fr
              </div>
            </div>
            
            <div className={styles.subscribe}>
              <h4 className={styles.footerTitle}>Newsletter</h4>
              <p className={styles.contactText}>
                Inscrivez-vous pour recevoir nos actualités et offres exclusives.
              </p>
              
              <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  className={styles.subscribeInput} 
                  placeholder="Votre adresse email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.subscribeButton}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
              
              {subscribed && (
                <p className={styles.contactText} style={{ color: 'var(--primary-color)', marginTop: '10px' }}>
                  <i className="fas fa-check"></i> Merci pour votre inscription !
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Accenty & Co. Tous droits réservés. 
            Conçu avec <i className="fas fa-heart" style={{ color: 'var(--primary-color)' }}></i> à Paris.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;