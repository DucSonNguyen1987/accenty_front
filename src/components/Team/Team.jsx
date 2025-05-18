// src/components/Team/Team.jsx (version mise à jour avec des noms congolais)

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Team.module.css';
import TeamMember from './TeamMember';

// Données fictives pour l'équipe (à remplacer par des appels API)
const teamData = [
  {
    id: 1,
    name: 'Mujinga Kalombo',
    role: 'Fondatrice & Directrice',
    bio: 'Passionnée d\'événementiel depuis 15 ans, Mujinga a fondé Accenty & Co avec la vision de créer des expériences uniques et mémorables.',
    image: '/images/team/member1.jpg',
    skills: ['Stratégie', 'Direction Artistique', 'Relations Clients'],
    social: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/',
      instagram: 'https://instagram.com/',
    }
  },
  {
    id: 2,
    name: 'Kabongo Mutombo',
    role: 'Chef de Projet Senior',
    bio: 'Avec plus de 8 ans d\'expérience dans l\'événementiel haut de gamme, Kabongo excelle dans la coordination de projets complexes et prestigieux.',
    image: '/images/team/member2.jpg',
    skills: ['Gestion de Projet', 'Logistique', 'Budgétisation'],
    social: {
      linkedin: 'https://linkedin.com/',
      instagram: 'https://instagram.com/',
    }
  },
  {
    id: 3,
    name: 'Tshibola Mbombo',
    role: 'Directrice Artistique',
    bio: 'Ancienne décoratrice d\'intérieur, Tshibola apporte sa créativité et son sens du détail pour créer des ambiances captivantes et harmonieuses.',
    image: '/images/team/member3.jpg',
    skills: ['Design', 'Décoration', 'Scénographie'],
    social: {
      linkedin: 'https://linkedin.com/',
      instagram: 'https://instagram.com/',
    }
  },
  {
    id: 4,
    name: 'Tshimanga Muamba',
    role: 'Responsable Technique',
    bio: 'Expert en audiovisuel et nouvelles technologies, Tshimanga assure des prestations techniques impeccables pour tous types d\'événements.',
    image: '/images/team/member4.jpg',
    skills: ['Son & Lumière', 'Vidéo', 'Installations'],
    social: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/',
    }
  },
  {
    id: 5,
    name: 'Nzuzi Kapinga',
    role: 'Responsable Communication',
    bio: 'Ancienne journaliste reconvertie dans l\'événementiel, Nzuzi gère l\'image de marque et les relations publiques avec passion et créativité.',
    image: '/images/team/member5.jpg',
    skills: ['Marketing', 'Réseaux Sociaux', 'Relations Presse'],
    social: {
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/',
      instagram: 'https://instagram.com/',
    }
  },
  {
    id: 6,
    name: 'Ilunga Kalonji',
    role: 'Chef de Projet',
    bio: 'Spécialiste des événements corporatifs, Ilunga conçoit des expériences professionnelles sur-mesure qui répondent aux objectifs stratégiques.',
    image: '/images/team/member6.jpg',
    skills: ['Événements Corporate', 'Coordination', 'Analyse'],
    social: {
      linkedin: 'https://linkedin.com/',
    }
  },
];

const Team = ({ title, subtitle, description, showButton = false, limit = 0 }) => {
  // Limiter le nombre de membres affichés si nécessaire
  const displayedMembers = limit > 0 ? teamData.slice(0, limit) : teamData;
  
  return (
    <section className={styles.teamSection} id="team-section">
      <div className="container">
        <div className="section-title">
          <h2>{title || "Notre Équipe"}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        
        {description && (
          <div className={styles.teamDescription}>
            <p>{description}</p>
          </div>
        )}
        
        <div className={styles.teamGrid}>
          {displayedMembers.map(member => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
        
        {showButton && teamData.length > limit && (
          <Link to="/team" className={`button ${styles.viewMoreButton}`}>
            Découvrir toute l'équipe
          </Link>
        )}
      </div>
    </section>
  );
};

export default Team;