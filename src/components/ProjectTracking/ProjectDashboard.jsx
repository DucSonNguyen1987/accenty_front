// src/components/ProjectTracking/ProjectDashboard.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectTracking.module.css';

// Données fictives de projet (à remplacer par des appels API)
const projectsData = [
  {
    id: 1,
    title: 'Mariage Emma & Thomas',
    date: '15/07/2024',
    location: 'Château de Fontainebleau',
    status: 'ongoing',
    progress: 65,
    milestones: [
      {
        id: 1,
        title: 'Consultation initiale',
        description: 'Définition des besoins et attentes du couple',
        date: '10/01/2024',
        completed: true,
      },
      {
        id: 2,
        title: 'Sélection du lieu',
        description: 'Visite et réservation du Château de Fontainebleau',
        date: '25/02/2024',
        completed: true,
      },
      {
        id: 3,
        title: 'Planification détaillée',
        description: 'Élaboration du planning de la journée et coordination avec les prestataires',
        date: '20/03/2024',
        completed: true,
      },
      {
        id: 4,
        title: 'Décoration et design',
        description: 'Finalisation des éléments décoratifs et plans de table',
        date: '30/04/2024',
        completed: false,
      },
      {
        id: 5,
        title: 'Validation finale',
        description: 'Revue de tous les éléments et derniers ajustements',
        date: '20/06/2024',
        completed: false,
      },
      {
        id: 6,
        title: 'Jour J',
        description: 'Coordination complète de l\'événement',
        date: '15/07/2024',
        completed: false,
      },
    ],
    tasks: [
      {
        id: 1,
        title: 'Confirmer le menu final avec le traiteur',
        completed: false,
        dueDate: '15/05/2024',
        assignedTo: 'Sophie Dubois',
        priority: 'high',
      },
      {
        id: 2,
        title: 'Réserver le photographe',
        completed: true,
        dueDate: '10/03/2024',
        assignedTo: 'Julie Moreau',
        priority: 'medium',
      },
      {
        id: 3,
        title: 'Finaliser les arrangements floraux',
        completed: false,
        dueDate: '01/06/2024',
        assignedTo: 'Camille Leroux',
        priority: 'medium',
      },
      {
        id: 4,
        title: 'Confirmer le DJ et la playlist',
        completed: false,
        dueDate: '20/05/2024',
        assignedTo: 'Alexandre Petit',
        priority: 'low',
      },
      {
        id: 5,
        title: 'Envoyer le planning détaillé aux mariés',
        completed: false,
        dueDate: '10/06/2024',
        assignedTo: 'Thomas Martin',
        priority: 'high',
      },
    ],
    documents: [
      {
        id: 1,
        title: 'Contrat signé',
        type: 'pdf',
        date: '15/01/2024',
        size: '1.2 MB',
      },
      {
        id: 2,
        title: 'Plan de table',
        type: 'doc',
        date: '05/04/2024',
        size: '568 KB',
      },
      {
        id: 3,
        title: 'Budget prévisionnel',
        type: 'xls',
        date: '20/02/2024',
        size: '785 KB',
      },
      {
        id: 4,
        title: 'Inspiration déco',
        type: 'img',
        date: '12/03/2024',
        size: '3.4 MB',
      },
      {
        id: 5,
        title: 'Planning détaillé',
        type: 'doc',
        date: '30/03/2024',
        size: '652 KB',
      },
    ],
    messages: [
      {
        id: 1,
        sender: 'Sophie Dubois',
        content: 'Bonjour ! Je viens de confirmer avec le fleuriste pour les compositions de table. Ils ont besoin de savoir si vous préférez des roses blanches ou des pivoines comme nous l\'avions évoqué.',
        timestamp: '10/04/2024 14:30',
        isOwn: false,
      },
      {
        id: 2,
        sender: 'Emma',
        content: 'Bonjour Sophie ! Nous préférons les pivoines finalement, elles seront plus en harmonie avec notre thème. Merci de vous en occuper !',
        timestamp: '10/04/2024 16:45',
        isOwn: true,
      },
      {
        id: 3,
        sender: 'Sophie Dubois',
        content: 'Parfait ! Je transmets l\'information au fleuriste. Nous aurons les propositions visuelles d\'ici la fin de semaine.',
        timestamp: '11/04/2024 09:15',
        isOwn: false,
      },
      {
        id: 4,
        sender: 'Sophie Dubois',
        content: 'Par ailleurs, le traiteur a confirmé qu\'il peut adapter le menu pour vos invités avec des restrictions alimentaires. Pourriez-vous nous envoyer la liste à jour ?',
        timestamp: '11/04/2024 09:18',
        isOwn: false,
      },
      {
        id: 5,
        sender: 'Emma',
        content: 'Super ! Je vous envoie la liste complète ce soir. Il y a 3 végétariens et 1 allergie aux fruits de mer.',
        timestamp: '11/04/2024 12:30',
        isOwn: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Conférence Annuelle TechVision',
    date: '22/09/2024',
    location: 'Palais des Congrès',
    status: 'planning',
    progress: 30,
  },
  {
    id: 3,
    title: 'Lancement Produit NexGen',
    date: '05/06/2024',
    location: 'Galerie Lafayette',
    status: 'planning',
    progress: 15,
  },
  {
    id: 4,
    title: 'Gala Fondation Espoir',
    date: '12/12/2024',
    location: 'Hôtel Royal',
    status: 'planning',
    progress: 10,
  },
  {
    id: 5,
    title: 'Anniversaire 40 ans de Marc',
    date: '30/03/2024',
    location: 'Villa Méditerranée',
    status: 'completed',
    progress: 100,
  },
];

const ProjectDashboard = () => {
  const [activeProject, setActiveProject] = useState(projectsData[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [newMessage, setNewMessage] = useState('');
  
  // Fonction pour gérer la priorité d'une tâche
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return styles.priorityHigh;
      case 'medium':
        return styles.priorityMedium;
      case 'low':
        return styles.priorityLow;
      default:
        return '';
    }
  };
  
  // Fonction pour gérer le statut du projet
  const getStatusBadge = (status) => {
    switch (status) {
      case 'planning':
        return (
          <span className={`${styles.statusBadge} ${styles.statusPlanning}`}>
            <i className="far fa-calendar-alt"></i> En planification
          </span>
        );
      case 'ongoing':
        return (
          <span className={`${styles.statusBadge} ${styles.statusOngoing}`}>
            <i className="fas fa-sync-alt"></i> En cours
          </span>
        );
      case 'completed':
        return (
          <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>
            <i className="fas fa-check"></i> Terminé
          </span>
        );
      default:
        return null;
    }
  };
  
  // Fonction pour gérer le format de l'icône de document
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <i className={`fas fa-file-pdf ${styles.documentPdf}`}></i>;
      case 'doc':
        return <i className={`fas fa-file-word ${styles.documentDoc}`}></i>;
      case 'xls':
        return <i className={`fas fa-file-excel ${styles.documentXls}`}></i>;
      case 'img':
        return <i className={`fas fa-file-image ${styles.documentImg}`}></i>;
      default:
        return <i className="fas fa-file"></i>;
    }
  };
  
  // Fonction pour changer de projet
  const handleProjectChange = (project) => {
    setActiveProject(project);
    setActiveTab('overview');
  };
  
  // Fonction pour envoyer un message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Dans une application réelle, cette partie enverrait le message à l'API
    console.log('Message à envoyer:', newMessage);
    
    // Simuler l'ajout du message dans la liste
    const newMessageObj = {
      id: activeProject.messages.length + 1,
      sender: 'Emma',
      content: newMessage,
      timestamp: new Date().toLocaleString('fr-FR'),
      isOwn: true,
    };
    
    setActiveProject({
      ...activeProject,
      messages: [...activeProject.messages, newMessageObj],
    });
    
    // Réinitialiser le champ de message
    setNewMessage('');
  };
  
  // Rendu de l'aperçu général du projet
  const renderOverview = () => (
    <>
      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <h3 className={styles.progressTitle}>Progression globale</h3>
          <span className={styles.progressPercentage}>{activeProject.progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${activeProject.progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className={styles.milestones}>
        <h3 className={styles.progressTitle}>Jalons du projet</h3>
        
        <ul className={styles.milestonesList}>
          {activeProject.milestones.map((milestone) => (
            <li key={milestone.id} className={styles.milestoneItem}>
              <div className={`${styles.milestoneIcon} ${milestone.completed ? styles.milestoneIconCompleted : ''}`}>
                {milestone.completed ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className="fas fa-flag"></i>
                )}
              </div>
              <div className={styles.milestoneDate}>{milestone.date}</div>
              <h4 className={styles.milestoneTitle}>{milestone.title}</h4>
              <p className={styles.milestoneDescription}>{milestone.description}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div className={styles.tasksContainer}>
        <div className={styles.tasksHeader}>
          <h3 className={styles.progressTitle}>Tâches en cours</h3>
          <button className="button outline">
            <i className="fas fa-plus"></i> Ajouter
          </button>
        </div>
        
        <ul className={styles.tasksList}>
          {activeProject.tasks
            .filter(task => !task.completed)
            .slice(0, 3)
            .map((task) => (
              <li key={task.id} className={styles.taskItem}>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  className={styles.taskCheckbox} 
                  readOnly
                />
                <div className={styles.taskInfo}>
                  <div className={styles.taskTitle}>
                    {task.title}
                    <span className={`${styles.taskPriority} ${getPriorityClass(task.priority)}`}>
                      {task.priority === 'high' && 'Haute'}
                      {task.priority === 'medium' && 'Moyenne'}
                      {task.priority === 'low' && 'Basse'}
                    </span>
                  </div>
                  <div className={styles.taskMeta}>
                    <div className={styles.taskMetaItem}>
                      <i className={`far fa-calendar ${styles.taskMetaIcon}`}></i>
                      {task.dueDate}
                    </div>
                    <div className={styles.taskMetaItem}>
                      <i className={`far fa-user ${styles.taskMetaIcon}`}></i>
                      {task.assignedTo}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      
      <div className={styles.documentsContainer}>
        <div className={styles.tasksHeader}>
          <h3 className={styles.progressTitle}>Documents récents</h3>
          <button className="button outline">
            <i className="fas fa-upload"></i> Ajouter
          </button>
        </div>
        
        <div className={styles.documentsGrid}>
          {activeProject.documents.slice(0, 3).map((doc) => (
            <div key={doc.id} className={styles.documentCard}>
              <div className={styles.documentIcon}>
                {getDocumentIcon(doc.type)}
              </div>
              <div className={styles.documentInfo}>
                <h4 className={styles.documentTitle}>{doc.title}</h4>
                <div className={styles.documentMeta}>
                  <i className={`far fa-calendar ${styles.documentMetaIcon}`}></i>
                  {doc.date} - {doc.size}
                </div>
                <div className={styles.documentActions}>
                  <a href="#" className={styles.documentAction}>
                    <i className={`fas fa-download ${styles.documentActionIcon}`}></i>
                    Télécharger
                  </a>
                  <a href="#" className={styles.documentAction}>
                    <i className={`fas fa-eye ${styles.documentActionIcon}`}></i>
                    Voir
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
  // Rendu de l'onglet Tâches
  const renderTasks = () => (
    <div className={styles.tasksContainer}>
      <div className={styles.tasksHeader}>
        <h3 className={styles.progressTitle}>Toutes les tâches</h3>
        <button className="button outline">
          <i className="fas fa-plus"></i> Nouvelle tâche
        </button>
      </div>
      
      <ul className={styles.tasksList}>
        {activeProject.tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              className={styles.taskCheckbox} 
              readOnly
            />
            <div className={styles.taskInfo}>
              <div className={`${styles.taskTitle} ${task.completed ? styles.taskCompleted : ''}`}>
                {task.title}
                <span className={`${styles.taskPriority} ${getPriorityClass(task.priority)}`}>
                  {task.priority === 'high' && 'Haute'}
                  {task.priority === 'medium' && 'Moyenne'}
                  {task.priority === 'low' && 'Basse'}
                </span>
              </div>
              <div className={styles.taskMeta}>
                <div className={styles.taskMetaItem}>
                  <i className={`far fa-calendar ${styles.taskMetaIcon}`}></i>
                  {task.dueDate}
                </div>
                <div className={styles.taskMetaItem}>
                  <i className={`far fa-user ${styles.taskMetaIcon}`}></i>
                  {task.assignedTo}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
  // Rendu de l'onglet Documents
  const renderDocuments = () => (
    <div className={styles.documentsContainer}>
      <div className={styles.tasksHeader}>
        <h3 className={styles.progressTitle}>Tous les documents</h3>
        <button className="button outline">
          <i className="fas fa-upload"></i> Ajouter un document
        </button>
      </div>
      
      <div className={styles.documentsGrid}>
        {activeProject.documents.map((doc) => (
          <div key={doc.id} className={styles.documentCard}>
            <div className={styles.documentIcon}>
              {getDocumentIcon(doc.type)}
            </div>
            <div className={styles.documentInfo}>
              <h4 className={styles.documentTitle}>{doc.title}</h4>
              <div className={styles.documentMeta}>
                <i className={`far fa-calendar ${styles.documentMetaIcon}`}></i>
                {doc.date} - {doc.size}
              </div>
              <div className={styles.documentActions}>
                <a href="#" className={styles.documentAction}>
                  <i className={`fas fa-download ${styles.documentActionIcon}`}></i>
                  Télécharger
                </a>
                <a href="#" className={styles.documentAction}>
                  <i className={`fas fa-eye ${styles.documentActionIcon}`}></i>
                  Voir
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Rendu de l'onglet Messages
  const renderMessages = () => (
    <div className={styles.messagesContainer}>
      <h3 className={styles.progressTitle}>Messagerie</h3>
      
      <div className={styles.messagesList}>
        {activeProject.messages.map((message) => (
          <div 
            key={message.id} 
            className={`${styles.messageItem} ${message.isOwn ? styles.messageOwn : ''}`}
          >
            <div className={styles.messageAvatar}>
              {message.sender.charAt(0)}
            </div>
            <div className={styles.messageContent}>
              <div className={styles.messageHeader}>
                <div className={styles.messageName}>{message.sender}</div>
                <div className={styles.messageTime}>{message.timestamp}</div>
              </div>
              <div className={styles.messageText}>{message.content}</div>
            </div>
          </div>
        ))}
      </div>
      
      <form className={styles.messageForm} onSubmit={handleSendMessage}>
        <textarea 
          className={styles.messageInput} 
          placeholder="Écrivez votre message ici..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows="3"
        ></textarea>
        <button 
          type="submit" 
          className={`button ${styles.sendMessageButton}`}
          disabled={!newMessage.trim()}
        >
          <i className={`fas fa-paper-plane ${styles.sendIcon}`}></i>
          Envoyer
        </button>
      </form>
    </div>
  );
  
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h2 className={styles.dashboardTitle}>Tableau de bord</h2>
        <div className={styles.dashboardActions}>
          <Link to="/appointment" className={styles.dashboardAction}>
            <i className="far fa-calendar-plus"></i> Rendez-vous
          </Link>
          <Link to="/quote" className={styles.dashboardAction}>
            <i className="fas fa-file-invoice-dollar"></i> Devis
          </Link>
        </div>
      </div>
      
      <div className={styles.dashboardLayout}>
        <div className={styles.sidebar}>
          <h3 className={styles.menuTitle}>Vos projets</h3>
          <ul className={styles.projectsList}>
            {projectsData.map((project) => (
              <li 
                key={project.id} 
                className={`${styles.projectItem} ${activeProject.id === project.id ? styles.projectItemActive : ''}`}
                onClick={() => handleProjectChange(project)}
              >
                <i className={`${styles.projectIcon} fas fa-${project.status === 'completed' ? 'check-circle' : 'project-diagram'}`}></i>
                {project.title}
              </li>
            ))}
          </ul>
          
          <h3 className={styles.menuTitle}>Menu</h3>
          <ul>
            <li 
              className={`${styles.menuItem} ${activeTab === 'overview' ? styles.menuItemActive : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className={`${styles.menuIcon} fas fa-home`}></i>
              Aperçu
            </li>
            <li 
              className={`${styles.menuItem} ${activeTab === 'tasks' ? styles.menuItemActive : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <i className={`${styles.menuIcon} fas fa-tasks`}></i>
              Tâches
            </li>
            <li 
              className={`${styles.menuItem} ${activeTab === 'documents' ? styles.menuItemActive : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <i className={`${styles.menuIcon} fas fa-folder`}></i>
              Documents
            </li>
            <li 
              className={`${styles.menuItem} ${activeTab === 'messages' ? styles.menuItemActive : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <i className={`${styles.menuIcon} fas fa-comments`}></i>
              Messages
            </li>
          </ul>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.projectHeader}>
            <h2 className={styles.projectTitle}>{activeProject.title}</h2>
            <div className={styles.projectMeta}>
              <div className={styles.projectMetaItem}>
                <i className={`far fa-calendar ${styles.projectMetaIcon}`}></i>
                {activeProject.date}
              </div>
              <div className={styles.projectMetaItem}>
                <i className={`fas fa-map-marker-alt ${styles.projectMetaIcon}`}></i>
                {activeProject.location}
              </div>
              <div>
                {getStatusBadge(activeProject.status)}
              </div>
            </div>
          </div>
          
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'tasks' && renderTasks()}
          {activeTab === 'documents' && renderDocuments()}
          {activeTab === 'messages' && renderMessages()}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;