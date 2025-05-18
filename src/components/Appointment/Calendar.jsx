// src/components/Appointment/Calendar.jsx - Version corrigée avec les dépendances useEffect

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Appointment.module.css';

// Jours de la semaine en français
const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// Mois en français
const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

// Fonction pour vérifier si une date est aujourd'hui
const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

// Fonction pour vérifier si une date est avant aujourd'hui
const isBeforeToday = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

const Calendar = ({ onDateSelected, availableDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);
  
  // Convertir les dates disponibles en format plus facile à comparer
  const formattedAvailableDates = availableDates.map(dateStr => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  });
  
  // Utilisation de useCallback pour mémoriser la fonction et éviter les re-rendus inutiles
  const generateCalendarDays = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Premier jour du mois
    const firstDayOfMonth = new Date(year, month, 1);
    // Dernier jour du mois
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Ajuster pour que le calendrier commence par lundi (1) au lieu de dimanche (0)
    let dayOfWeek = firstDayOfMonth.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Transformer dimanche (0) en 6, et décaler les autres jours
    
    const days = [];
    
    // Ajouter les jours du mois précédent
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: isToday(date),
        isDisabled: true // Les jours du mois précédent sont toujours désactivés
      });
    }
    
    // Ajouter les jours du mois courant
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateFormatted = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const hasSlots = formattedAvailableDates.includes(dateFormatted);
      const isPastDate = isBeforeToday(date);
      
      days.push({
        date,
        day: i,
        isCurrentMonth: true,
        isToday: isToday(date),
        isDisabled: isPastDate || !hasSlots,
        hasSlots
      });
    }
    
    // Ajouter les jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length; // 6 semaines x 7 jours = 42
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        day: i,
        isCurrentMonth: false,
        isToday: isToday(date),
        isDisabled: true // Les jours du mois suivant sont toujours désactivés
      });
    }
    
    setCalendarDays(days);
  }, [currentDate, formattedAvailableDates]); // Ajout de toutes les dépendances
  
  // Maintenant useEffect avec toutes les dépendances nécessaires
  useEffect(() => {
    generateCalendarDays();
  }, [generateCalendarDays]); // On dépend seulement de generateCalendarDays qui contient déjà toutes les dépendances
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleDateClick = (day) => {
    if (day.isDisabled) return;
    
    setSelectedDate(day.date);
    if (onDateSelected) {
      onDateSelected(day.date);
    }
  };
  
  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <div className={styles.calendarMonthYear}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <div className={styles.calendarNav}>
          <button 
            className={styles.calendarNavButton}
            onClick={goToPreviousMonth}
            aria-label="Mois précédent"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className={styles.calendarNavButton}
            onClick={goToNextMonth}
            aria-label="Mois suivant"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      
      <div className={styles.calendarGrid}>
        {/* Jours de la semaine */}
        {weekdays.map((day, index) => (
          <div key={`weekday-${index}`} className={styles.calendarWeekday}>
            {day}
          </div>
        ))}
        
        {/* Jours du mois */}
        {calendarDays.map((day, index) => (
          <div 
            key={`day-${index}`} 
            className={`
              ${styles.calendarDay} 
              ${!day.isCurrentMonth ? styles.calendarDayDisabled : ''} 
              ${day.isToday ? styles.calendarDayToday : ''} 
              ${day.isDisabled ? styles.calendarDayDisabled : ''} 
              ${day.hasSlots ? styles.calendarDayHasSlots : ''}
              ${selectedDate && day.date.getTime() === selectedDate.getTime() ? styles.calendarDaySelected : ''}
            `}
            onClick={() => handleDateClick(day)}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;