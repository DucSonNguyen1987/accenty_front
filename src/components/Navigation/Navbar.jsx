
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Détecte le scroll de la page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ferme le menu mobile au changement de page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [window.location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.logo}>
          <img src="/images/logo.png" alt="Accenty & Co Logo" />
          <div className={styles.logoText}>
            Accenty <span>&</span> Co
          </div>
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Galerie
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/team" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Équipe
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <Link to="/appointment" className={`button ${styles.navCta}`}>
          Prendre RDV
        </Link>

        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMobileMenu}
          aria-label="Menu de navigation"
        >
          <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => 
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              Galerie
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/team" 
              className={({ isActive }) => 
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              Équipe
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
        
        <Link to="/appointment" className={`button ${styles.mobileNavCta}`}>
          Prendre RDV
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;