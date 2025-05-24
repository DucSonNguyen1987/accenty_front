// src/pages/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/Gallery/Gallery.module.css';
import GalleryItem from '../components/Gallery/GalleryItem';

const GalleryPage = () => {
  // États locaux
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [filteredItems, setFilteredItems] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Utiliser le hook useLocation pour accéder à l'URL actuelle
  const location = useLocation();
  
  // Données de la galerie (à remplacer par des appels API dans une application réelle)
  const galleryData = [
    {
      id: 1,
      image: '/Images/testimonials/Wedding5.jpg',
      category: 'Mariage',
      title: 'Mariage de Kamwanya & Mukeba',
      description: 'Un mariage élégant avec une décoration bohème chic dans un château de la Loire.',
      date: '15 Juin 2024',
    },
    {
      id: 2,
      image: '/Images/testimonials/Corporate3.png',
      category: 'Corporatif',
      title: 'Conférence annuelle TechVision',
      description: 'Conférence tech avec 300 participants, incluant keynotes, ateliers et networking.',
      date: '22 Mars 2024',
    },
    {
      id: 3,
      image: '/Images/testimonials/Party3.png',
      category: 'Anniversaire',
      title: 'Les 50 ans de Mwamba',
      description: 'Une célébration surprise avec thème années 70 pour 80 invités.',
      date: '8 Avril 2024',
    },
    {
      id: 4,
      image: '/Images/testimonials/Inauguration.png',
      category: 'Lancement',
      title: 'Présentation nouvelle collection',
      description: 'Lancement de produit avec showroom, cocktail et démonstrations interactives.',
      date: '14 Mai 2024',
    },
    {
      id: 5,
      image: '/Images/testimonials/Gala.png',
      category: 'Gala',
      title: 'Dîner de charité Fondation Nkosi',
      description: 'Gala annuel avec 200 participants, vente aux enchères et spectacle artistique.',
      date: '3 Février 2024',
    },
    {
      id: 6,
      image: '/Images/testimonials/Wedding4.png',
      category: 'Mariage',
      title: 'Cérémonie de Tshibola & Kalala',
      description: 'Mariage intime avec cérémonie en plein air et réception élégante pour 80 convives.',
      date: '29 Juillet 2024',
    },
    {
      id: 7,
      image: '/Images/testimonials/Corporate5.png',
      category: 'Corporatif',
      title: 'Séminaire équipe de direction',
      description: 'Retraite managériale de 3 jours avec activités team building et sessions stratégiques.',
      date: '10-12 Janvier 2024',
    },
    {
      id: 8,
      image: '/Images/testimonials/Birthday16.png',
      category: 'Anniversaire',
      title: 'Sweet 16 de Léa',
      description: 'Fête d\'anniversaire thématique avec photobooth, DJ et animations pour adolescents.',
      date: '5 Mai 2024',
    },
    {
      id: 9,
      image: '/Images/testimonials/Party4.png',
      category: 'Lancement',
      title: 'Inauguration boutique Paris',
      description: 'Ouverture de magasin avec cocktail VIP, présentations et couverture presse.',
      date: '18 Mars 2024',
    },
    {
      id: 10,
      image: '/Images/testimonials/Party3.png',
      category: 'Gala',
      title: 'Prix de l\'Innovation 2024',
      description: 'Cérémonie de remise de prix avec 150 invités dans un cadre prestigieux.',
      date: '25 Janvier 2024',
    },
    {
      id: 11,
      image: '/Images/testimonials/Wedding5.png',
      category: 'Mariage',
      title: 'Union de Jean & Marie',
      description: 'Mariage champêtre dans un domaine viticole avec 120 invités.',
      date: '12 Août 2024',
    },
    {
      id: 12,
      image: '/Images/testimonials/Workshop.png',
      category: 'Corporatif',
      title: 'Workshop Innovation Digitale',
      description: 'Atelier collaboratif pour 50 professionnels du secteur numérique.',
      date: '9 Février 2024',
    },
  ];
  
  // Extraire les catégories uniques pour le filtre
  const categories = ['Tous', ...new Set(galleryData.map(item => item.category))];
  
  // Effet pour filtrer les éléments selon la catégorie
  useEffect(() => {
  let isMounted = true;
  setIsLoading(true);
  
  const timer = setTimeout(() => {
    // Vérifier si le composant est toujours monté
    if (isMounted) {
      if (selectedCategory === 'Tous') {
        setFilteredItems(galleryData);
      } else {
        setFilteredItems(galleryData.filter(item => item.category === selectedCategory));
      }
      setIsLoading(false);
    }
  }, 300);
  
  // Fonction de nettoyage pour éviter les mises à jour d'état après démontage
  return () => {
    isMounted = false;
    clearTimeout(timer);
  };
}, [selectedCategory]);
  
  // Effet pour vérifier si l'URL contient une catégorie
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category && categories.includes(category)) {
      setSelectedCategory(category);
    }
  }, [location.search, categories]);
  
  // Gestionnaire pour changer de catégorie
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // Mise à jour de l'URL
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('category', category);
    
    // Remplacer l'historique sans rechargement de page
    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${searchParams.toString()}`
    );
  };
  
  // Ouvrir la lightbox
  const openLightbox = (item) => {
    setCurrentImage(item);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
  };
  
  // Fermer la lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Réactiver le défilement
  };
  
  // Navigation dans la lightbox
  const navigateLightbox = (direction) => {
    const currentIndex = galleryData.findIndex(item => item.id === currentImage.id);
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % galleryData.length;
      setCurrentImage(galleryData[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      setCurrentImage(galleryData[prevIndex]);
    }
  };
  
  // Gestionnaire de touches pour la navigation dans la lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImage]);
  
  return (
    <>
      {/* En-tête de page */}
      <div className="page-header">
        <div className="container">
          <h1>Galerie</h1>
          <p>Découvrez nos événements mémorables</p>
        </div>
      </div>
      
      {/* Section galerie */}
      <section className={styles.gallerySection} id="gallery-section">
        <div className="container">
          <div className={styles.galleryDescription}>
            <p>
              Plongez dans notre univers créatif à travers cette sélection d'événements 
              que nous avons eu le plaisir d'organiser. Chaque image raconte une histoire 
              unique et témoigne de notre passion pour créer des moments inoubliables.
            </p>
          </div>
          
          {/* Filtres de catégories */}
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
          
          {/* Indicateur de chargement */}
          {isLoading ? (
            <div className="text-center" style={{ padding: '40px' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
            </div>
          ) : (
            <div className={styles.galleryGrid}>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <GalleryItem 
                    key={item.id} 
                    item={item} 
                    onClick={() => openLightbox(item)} 
                  />
                ))
              ) : (
                <div className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
                  <p>Aucun événement trouvé dans cette catégorie.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Lightbox pour afficher les images en grand */}
      {lightboxOpen && currentImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div 
            className={styles.lightboxContent} 
            onClick={(e) => e.stopPropagation()} // Éviter la fermeture lors du clic sur le contenu
          >
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
                <p className={styles.lightboxDate}>
                  <i className="far fa-calendar-alt" style={{ marginRight: '8px' }}></i>
                  {currentImage.date}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Section appel à l'action */}
      <section style={{ 
        padding: '60px 0', 
        backgroundColor: 'var(--background-alt)', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <h2>Vous avez un projet en tête ?</h2>
          <p style={{ maxWidth: '700px', margin: '20px auto 30px' }}>
            Partagez avec nous votre vision, et nous la transformerons en un événement exceptionnel 
            qui correspondra parfaitement à vos attentes et à votre budget.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/appointment" className="button">
              Prendre rendez-vous
            </a>
            <a href="/quote" className="button outline">
              Demander un devis
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPage;