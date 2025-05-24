// src/pages/TeamPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeamMember from '../components/Team/TeamMember';
import styles from '../components/Team/Team.module.css';

const TeamPage = () => {
  // État pour le filtrage des membres de l'équipe
  const [filter, setFilter] = useState('Tous');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Données des membres de l'équipe
  const teamData = [
    {
      id: 1,
      name: 'Mujinga Kalombo',
      role: 'Fondatrice & Directrice',
      bio: 'Passionnée d\'événementiel depuis 15 ans, Mujinga a fondé Accenty & Co avec la vision de créer des expériences uniques et mémorables. Son expertise en design et sa créativité sans limites lui permettent de transformer chaque événement en une expérience extraordinaire.',
      image: '/Images/team/StaffFemale1.png',
      skills: ['Stratégie', 'Direction Artistique', 'Relations Clients'],
      department: 'Direction',
      quote: "L'excellence n'est pas une compétence, c'est une attitude.",
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
      bio: 'Avec plus de 8 ans d\'expérience dans l\'événementiel haut de gamme, Kabongo excelle dans la coordination de projets complexes et prestigieux. Son organisation rigoureuse et son attention aux détails garantissent des événements parfaitement exécutés.',
      image: '/Images/team/StaffMale1.png',
      skills: ['Gestion de Projet', 'Logistique', 'Budgétisation'],
      department: 'Production',
      quote: "La perfection réside dans les détails.",
      social: {
        linkedin: 'https://linkedin.com/',
        instagram: 'https://instagram.com/',
      }
    },
    {
      id: 3,
      name: 'Tshibola Mbombo',
      role: 'Directrice Artistique',
      bio: 'Ancienne décoratrice d\'intérieur, Tshibola apporte sa créativité et son sens du détail pour créer des ambiances captivantes et harmonieuses. Elle transforme les espaces ordinaires en décors extraordinaires qui émerveillent et inspirent.',
      image: '/Images/team/StaffFemale2.png',
      skills: ['Design', 'Décoration', 'Scénographie'],
      department: 'Création',
      quote: "La beauté est dans l'harmonie des contrastes.",
      social: {
        linkedin: 'https://linkedin.com/',
        instagram: 'https://instagram.com/',
      }
    },
    {
      id: 4,
      name: 'Tshimanga Muamba',
      role: 'Responsable Technique',
      bio: 'Expert en audiovisuel et nouvelles technologies, Tshimanga assure des prestations techniques impeccables pour tous types d\'événements. Sa maîtrise des équipements de pointe et sa capacité à résoudre les problèmes font de lui un élément indispensable de notre équipe.',
      image: '/Images/team/StaffMale4.png',
      skills: ['Son & Lumière', 'Vidéo', 'Installations'],
      department: 'Technique',
      quote: "L'innovation naît quand la technique rencontre la créativité.",
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
      }
    },
    {
      id: 5,
      name: 'Nzuzi Kapinga',
      role: 'Responsable Communication',
      bio: 'Ancienne journaliste reconvertie dans l\'événementiel, Nzuzi gère l\'image de marque et les relations publiques avec passion et créativité. Son expertise en communication et son réseau étendu permettent à nos événements de bénéficier d\'une visibilité optimale.',
      image: '/Images/team/StaffFemale3.png',
      skills: ['Marketing', 'Réseaux Sociaux', 'Relations Presse'],
      department: 'Communication',
      quote: "Une histoire bien racontée peut changer le monde.",
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
      bio: 'Spécialiste des événements corporatifs, Ilunga conçoit des expériences professionnelles sur-mesure qui répondent aux objectifs stratégiques. Son background en marketing lui permet d\'apporter une perspective unique à chaque projet d\'entreprise.',
      image: '/Images/team/StaffMale3.png',
      skills: ['Événements Corporate', 'Coordination', 'Analyse'],
      department: 'Production',
      quote: "L'efficacité est le fruit d'une organisation minutieuse.",
      social: {
        linkedin: 'https://linkedin.com/',
      }
    },
    {
      id: 7,
      name: 'Kabila Ntumba',
      role: 'Designer Graphique',
      bio: 'Diplômé en design graphique et en communication visuelle, Kabila crée des identités visuelles percutantes pour nos événements. Son talent artistique et sa maîtrise des outils numériques permettent de donner vie à des concepts uniques et mémorables.',
      image: '/Images/team/StaffMale2.png',
      skills: ['Design Graphique', 'Typographie', 'Illustration'],
      department: 'Création',
      quote: "Le design n'est pas seulement ce que vous voyez, mais ce que vous ressentez.",
      social: {
        linkedin: 'https://linkedin.com/',
        instagram: 'https://instagram.com/',
        behance: 'https://behance.net/',
      }
    },
    {
      id: 8,
      name: 'Luboya Kabeya',
      role: 'Responsable Marketing Digital',
      bio: 'Expert en stratégies digitales, Luboya développe des campagnes innovantes qui maximisent la visibilité de nos événements. Sa passion pour les technologies émergentes et sa compréhension des tendances actuelles apportent une dimension moderne à notre approche marketing.',
      image: '/Images/team/StaffMale5.png',
      skills: ['Stratégie Digitale', 'Data Analytics', 'Social Media'],
      department: 'Communication',
      quote: "Dans un monde numérique, l'authenticité reste la clé du succès.",
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
      }
    },
    {
      id: 9,
      name: 'Kasongo Mubiayi',
      role: 'Coordinatrice Logistique',
      bio: 'Ancienne gestionnaire d\'hôtel 5 étoiles, Kasongo gère tous les aspects logistiques de nos événements avec une efficacité remarquable. Son souci du détail et sa capacité à anticiper les besoins garantissent une expérience fluide pour nos clients et leurs invités.',
      image: '/Images/team/StaffFemale4.png',
      skills: ['Coordination', 'Gestion Fournisseurs', 'Planning'],
      department: 'Production',
      quote: "La logistique, c'est l'art de prévoir l'imprévisible.",
      social: {
        linkedin: 'https://linkedin.com/',
      }
    },
  ];
  
  // Départements pour le filtrage
  const departments = ['Tous', ...new Set(teamData.map(member => member.department))];
  
  // Effet pour filtrer les membres de l'équipe
  useEffect(() => {
    setIsLoading(true);
    
    // Simuler un léger délai pour montrer le chargement (à supprimer en production)
    setTimeout(() => {
      if (filter === 'Tous') {
        setFilteredMembers(teamData);
      } else {
        setFilteredMembers(teamData.filter(member => member.department === filter));
      }
      setIsLoading(false);
    }, 300);
  }, [filter]);
  
  // Gestion du changement de filtre
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  
  // Valeurs de l'entreprise (pour la section Culture)
  const companyValues = [
    {
      title: 'Excellence',
      description: 'Nous nous efforçons d\'atteindre l\'excellence dans chaque aspect de notre travail, des détails les plus minimes aux concepts les plus ambitieux.',
      icon: 'fa-award'
    },
    {
      title: 'Créativité',
      description: 'Nous encourageons l\'innovation et les idées fraîches, repoussant constamment les limites pour créer des expériences uniques et mémorables.',
      icon: 'fa-lightbulb'
    },
    {
      title: 'Intégrité',
      description: 'Nous travaillons avec honnêteté et transparence, en établissant des relations de confiance durables avec nos clients et partenaires.',
      icon: 'fa-handshake'
    },
    {
      title: 'Passion',
      description: 'Nous sommes passionnés par notre métier et mettons tout notre cœur dans chaque projet pour transformer vos rêves en réalité.',
      icon: 'fa-heart'
    }
  ];
  
  // Offres d'emploi actuelles (section Recrutement)
  const jobOpenings = [
    {
      title: 'Chef de Projet Événementiel',
      department: 'Production',
      type: 'CDI',
      location: 'Paris'
    },
    {
      title: 'Assistant(e) Design',
      department: 'Création',
      type: 'Stage',
      location: 'Paris'
    },
    {
      title: 'Technicien(ne) Audiovisuel',
      department: 'Technique',
      type: 'Freelance',
      location: 'Paris'
    }
  ];
  
  return (
    <>
      {/* En-tête de page */}
      <div className="page-header">
        <div className="container">
          <h1>Notre Équipe</h1>
          <p>Rencontrez les visages derrière vos événements exceptionnels</p>
        </div>
      </div>
      
      {/* Introduction */}
      <section className={styles.teamIntro}>
        <div className="container">
          <div className={styles.introContent}>
            <h2>Une équipe passionnée à votre service</h2>
            <p>
              Chez Accenty & Co, notre force réside dans l'expertise et la passion de notre équipe.
              Chaque membre apporte son talent unique et sa créativité pour donner vie à vos événements.
              De la conception initiale à la réalisation finale, nous travaillons en étroite collaboration
              pour créer des expériences qui dépassent vos attentes.
            </p>
            <p>
              Notre équipe pluridisciplinaire combine des compétences variées en design, logistique,
              technique et communication pour offrir un service complet et sur-mesure. Nous partageons tous
              la même vision : transformer chaque événement en un moment inoubliable.
            </p>
          </div>
          
          <div className={styles.teamStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Années d'expérience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Événements réalisés</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Clients satisfaits</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section de l'équipe avec filtres */}
      <section className={styles.teamSection} id="team-members">
        <div className="container">
          <h2 className={styles.sectionTitle}>Les membres de notre équipe</h2>
          
          {/* Filtres par département */}
          <div className={styles.teamFilters}>
            {departments.map(department => (
              <button
                key={department}
                className={`${styles.filterButton} ${filter === department ? styles.filterActive : ''}`}
                onClick={() => handleFilterChange(department)}
              >
                {department}
              </button>
            ))}
          </div>
          
          {/* Indicateur de chargement */}
          {isLoading ? (
            <div className="text-center" style={{ padding: '50px 0' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
            </div>
          ) : (
            <div className={styles.teamGrid}>
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <TeamMember key={member.id} member={member} />
                ))
              ) : (
                <div className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
                  <p>Aucun membre trouvé dans ce département.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Section culture d'entreprise */}
      <section className={styles.cultureSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Notre culture</h2>
          <p className={styles.sectionDescription}>
            Nos valeurs guident nos actions au quotidien et définissent notre approche unique de l'événementiel.
          </p>
          
          <div className={styles.valuesGrid}>
            {companyValues.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className={`fas ${value.icon}`}></i>
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section rejoignez-nous */}
      <section className={styles.joinSection}>
        <div className="container">
          <div className={styles.joinContent}>
            <h2 className={styles.sectionTitle}>Rejoignez notre équipe</h2>
            <p className={styles.sectionDescription}>
              Vous êtes passionné(e) par l'événementiel et souhaitez intégrer une équipe dynamique et créative ?
              Découvrez nos opportunités de carrière actuelles ou envoyez-nous une candidature spontanée.
            </p>
            
            {jobOpenings.length > 0 && (
              <div className={styles.jobOpenings}>
                <h3>Offres d'emploi actuelles</h3>
                <ul className={styles.jobList}>
                  {jobOpenings.map((job, index) => (
                    <li key={index} className={styles.jobItem}>
                      <div className={styles.jobTitle}>{job.title}</div>
                      <div className={styles.jobMeta}>
                        <span className={styles.jobDepartment}>{job.department}</span>
                        <span className={styles.jobType}>{job.type}</span>
                        <span className={styles.jobLocation}>
                          <i className="fas fa-map-marker-alt"></i> {job.location}
                        </span>
                      </div>
                      <Link to="/contact" className={styles.jobApplyButton}>
                        Postuler <i className="fas fa-arrow-right"></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className={styles.spontaneousApplication}>
              <h3>Candidature spontanée</h3>
              <p>
                Vous ne trouvez pas de poste correspondant à votre profil ? Envoyez-nous votre CV et lettre
                de motivation pour nous faire découvrir votre talent !
              </p>
              <Link to="/contact?subject=candidature" className="button">
                Envoyer ma candidature
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2>Travaillons ensemble</h2>
          <p>
            Découvrez comment notre équipe peut transformer votre prochain événement en une expérience mémorable.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/appointment" className="button">
              Prendre rendez-vous
            </Link>
            <Link to="/contact" className="button outline">
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;