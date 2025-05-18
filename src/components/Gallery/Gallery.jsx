// src/components/Gallery/Gallery.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';
import GalleryItem from './GalleryItem';

// Données de démonstration pour la galerie (à remplacer par des appels API)
const galleryData = [
  {
    id: 1,
    image: '/images/events/event1.jpg',
    category: 'Mariage',
    title: 'Mariage de Lucie & Thomas',
    description: 'Un mariage élégant avec une décoration bohème chic dans un château de la Loire.',
    date: '15 Juin 2024',
  },
  {
    id: 2,
    image: '/images/events/event2.jpg',
    category: 'Corporatif',
    title: 'Conférence annuelle TechCorp',
    description: 'Conférence tech avec 300 participants, incluant keynotes, ateliers et networking.',
    date: '22 Mars 2024',
  },
  {
    id: 3,
    image: '/images/events/event3.jpg',
    category: 'Anniversaire',
    title: 'Les 50 ans de Jacques',
    description: 'Une célébration surprise avec thème années 70 pour 80 invités.',
    date: '8 Avril 2024',
  },
  {
    id: 4,
    image: '/images/events/event4.jpg',
    category: 'Lancement',
    title: 'Présentation nouvelle collection',
    description: 'Lancement de produit avec showroom, cocktail et démonstrations interactives.',
    date: '14 Mai 2024',
  },
  {
    id: 5,
    image: '/images/events/event5.jpg',
    category: 'Gala',
    title: 'Dîner de charité Fondation Espoir',
    description: 'Gala annuel avec 200 participants, vente aux enchères et spectacle artistique.',
    date: '3 Février 2024',
  },
  {
    id: 6,
    image: '/images/events/event6.jpg',
    category: 'Mariage',
    title: 'Cérémonie de Sarah & Marc',
    description: 'Mariage intime avec cérémonie en plein air et réception élégante pour 80 convives.',
    date: '29 Juillet 2024',
  },
  {
    id: 7,
    image: '/images/events/event7.jpg',
    category: 'Corporatif',
    title: 'Séminaire équipe de direction',
    description: 'Retraite managériale de 3 jours avec activités team building et sessions stratégiques.',
    date: '10-12 Janvier 2024',
  },
  {
    id: 8,
    image: '/images/events/event8.jpg',
    category: 'Anniversaire',
    title: 'Sweet 16 de Léa',
    description: 'Fête d\'anniversaire thématique avec photobooth, DJ et animations pour adolescents.',
    date: '5 Mai 2024',
  },
  {
    id: 9,
    image: '/images/events/event9.jpg',
    category: 'Lancement',
    title: 'Inauguration boutique Paris',
    description: 'Ouverture de magasin avec cocktail VIP, présentations et couverture presse.',
    date: '18 Mars 2024',
  },
];

const Gallery = ({ title, subtitle, description, items, showButton = false, limit = 0 }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [filteredItems, setFilteredItems] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  
  // Utiliser les données passées en props ou les données de démonstration
  const galleryItems = items || galleryData;
  
  // Extraire les catégories uniques pour le filtre
  const categories = ['Tous', ...new Set(galleryItems.map(item => item.category))];
  
  useEffect(() => {
    // Filtrer les éléments en fonction de la catégorie sélectionnée
    if (selectedCategory === 'Tous') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === selectedCategory));
    }
    
    // Limiter le nombre d'éléments si nécessaire
    if (limit > 0) {
      setFilteredItems(prev => prev.slice(0, limit));
    }
  }, [selectedCategory, galleryItems, limit]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const openLightbox = (item) => {
    setCurrentImage(item);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  const navigateLightbox = (direction) => {
    const currentIndex = galleryItems.findIndex(item => item.id === currentImage.id);
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % galleryItems.length;
      setCurrentImage(galleryItems[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      setCurrentImage(galleryItems[prevIndex]);
    }
  };
  
  return (
    <section className={styles.gallerySection} id="gallery-section">
      <div className="container">
        <div className="section-title">
          <h2>{title || "Notre Galerie"}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        
        {description && (
          <div className={styles.galleryDescription}>
            <p>{description}</p>
          </div>
        )}
        
        <div className={styles.galleryFilter}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.filterButton} ${selectedCategory === category ? styles.filterButtonActive : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className={styles.galleryGrid}>
          {filteredItems.map((item) => (
            <GalleryItem 
              key={item.id} 
              item={item} 
              onClick={() => openLightbox(item)} 
            />
          ))}
        </div>
        
        {showButton && (
          <Link to="/gallery" className={`button ${styles.viewMoreButton}`}>
            Voir toutes nos réalisations
          </Link>
        )}
      </div>
      
      {/* Lightbox pour afficher les images en grand */}
      {lightboxOpen && currentImage && (
        <div className={styles.lightbox}>
          <div className={styles.lightboxContent}>
            <button 
              className={styles.lightboxClose} 
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <img 
              src={currentImage.image} 
              alt={currentImage.title} 
              className={styles.lightboxImage} 
            />
            
            <button 
              className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`} 
              onClick={() => navigateLightbox('prev')}
              aria-label="Image précédente"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button 
              className={`${styles.lightboxNav} ${styles.lightboxNavNext}`} 
              onClick={() => navigateLightbox('next')}
              aria-label="Image suivante"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            
            <div className={styles.lightboxCaption}>
              <p className={styles.lightboxCategory}>{currentImage.category}</p>
              <h3 className={styles.lightboxTitle}>{currentImage.title}</h3>
              {currentImage.description && (
                <p className={styles.lightboxDescription}>{currentImage.description}</p>
              )}
              {currentImage.date && (
                <p className={styles.lightboxDate}>{currentImage.date}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;