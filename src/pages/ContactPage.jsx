// src/pages/ContactPage.jsx

import React from 'react';
import styles from '../components/Contact/Contact.module.css';
import ContactForm from '../components/Contact/ContactForm';

const ContactPage = () => {
  // Heures d'ouverture
  const businessHours = [
    { day: 'Lundi', hours: '9h00 - 18h00' },
    { day: 'Mardi', hours: '9h00 - 18h00' },
    { day: 'Mercredi', hours: '9h00 - 18h00' },
    { day: 'Jeudi', hours: '9h00 - 18h00' },
    { day: 'Vendredi', hours: '9h00 - 17h00' },
    { day: 'Samedi', hours: 'Sur rendez-vous' },
    { day: 'Dimanche', hours: 'Fermé' },
  ];

  return (
    <>
      {/* En-tête de page */}
      <div className="page-header">
        <div className="container">
          <h1>Contact</h1>
          <p>Parlons de votre projet</p>
        </div>
      </div>

      {/* Section de contact */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2 className={styles.contactTitle}>Entrons en contact</h2>
              <p className={styles.contactDescription}>
                Vous avez une question, une demande de devis ou souhaitez planifier un rendez-vous ?
                N'hésitez pas à nous contacter. Notre équipe se fera un plaisir de vous répondre
                dans les plus brefs délais.
              </p>

              {/* Informations de contact */}
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className={styles.contactText}>
                  <div className={styles.contactLabel}>Notre adresse</div>
                  <div className={styles.contactValue}>
                    372, avenue Colonel Mondjiba<br />
                    Quartier Basoko, Commune Ngaliema<br />
                    Kinshasa, RD Congo
                  </div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className={styles.contactText}>
                  <div className={styles.contactLabel}>Téléphone</div>
                  <div className={styles.contactValue}>
                    <a href="tel:+243 894 79 79 36">+243 894 79 79 36</a><br />
                  </div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.contactText}>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>
                    <a href="mailto:contact@accenty-co.fr">contact@accenty-co.org</a><br />
                    <a href="mailto:info@accenty-co.fr">info@accenty-co.org</a>
                  </div>
                </div>
              </div>

              {/* Heures d'ouverture */}
              <div className={styles.businessHours}>
                <div className={styles.hoursTitle}>
                  <i className={`far fa-clock ${styles.hoursIcon}`}></i>
                  Heures d'ouverture
                </div>

                <div className={styles.hoursGrid}>
                  {businessHours.map((item, index) => (
                    <div key={index} className={styles.hoursItem}>
                      <div className={styles.hourDay}>{item.day}</div>
                      <div className={styles.hourTime}>{item.hours}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Réseaux sociaux */}
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

              {/* Image */}
              <div className={styles.contactImage}>
                <img src="/images/contact/office.jpg" alt="Nos bureaux" />
              </div>
            </div>

            {/* Formulaire de contact */}
            <ContactForm />
          </div>

          {/* Carte Google Maps */}
          <div className={styles.mapContainer}>
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.454456237736!2d15.261896715318368!3d-4.306322896770314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a31c759c34067%3A0x90292160a2872ed3!2s372%20Av.%20Colonel%20Mondjiba%2C%20Kinshasa!5e0!3m2!1sfr!2scd!4v1621424761098!5m2!1sfr!2scd"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte de localisation Accenty & Co Kinshasa"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;