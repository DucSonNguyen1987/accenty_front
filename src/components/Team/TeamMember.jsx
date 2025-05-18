// src/components/Team/TeamMember.jsx

import React from 'react';
import styles from './Team.module.css';

const TeamMember = ({ member }) => {
  return (
    <div className={styles.teamMember}>
      <div className={styles.memberImageContainer}>
        <img 
          src={member.image} 
          alt={`${member.name} - ${member.role} chez Accenty & Co`} 
          className={styles.memberImage} 
          loading="lazy"
        />
        
        <div className={styles.memberOverlay}>
          <div className={styles.memberSocial}>
            {member.social.linkedin && (
              <a 
                href={member.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                aria-label={`LinkedIn de ${member.name}`}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
            
            {member.social.twitter && (
              <a 
                href={member.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                aria-label={`Twitter de ${member.name}`}
              >
                <i className="fab fa-twitter"></i>
              </a>
            )}
            
            {member.social.instagram && (
              <a 
                href={member.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                aria-label={`Instagram de ${member.name}`}
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.memberInfo}>
        <h3 className={styles.memberName}>{member.name}</h3>
        <div className={styles.memberRole}>{member.role}</div>
        <p className={styles.memberBio}>{member.bio}</p>
        
        {member.skills && member.skills.length > 0 && (
          <div className={styles.memberSkills}>
            {member.skills.map((skill, index) => (
              <span key={index} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;