// src/components/Gallery/GalleryItem.jsx

import React from 'react';
import styles from './Gallery.module.css';

const GalleryItem = ({ item, onClick }) => {
  return (
    <div className={styles.galleryItem} onClick={onClick}>
      <img 
        src={item.image} 
        alt={item.title} 
        className={styles.itemImage} 
        loading="lazy"
      />
      
      <div className={styles.itemOverlay}>
        <p className={styles.itemCategory}>{item.category}</p>
        <h3 className={styles.itemTitle}>{item.title}</h3>
      </div>
      
      <button 
        className={styles.viewButton}
        aria-label="Voir en grand"
      >
        <i className="fas fa-search-plus"></i>
      </button>
    </div>
  );
};

export default GalleryItem;