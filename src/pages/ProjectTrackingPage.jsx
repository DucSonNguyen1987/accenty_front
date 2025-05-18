// src/pages/ProjectTrackingPage.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProjectDashboard from '../components/ProjectTracking/ProjectDashboard';

const ProjectTrackingPage = () => {
  const { isAuthenticated, currentUser } = useAuth();
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: "/project-tracking" } }} />;
  }
  
  return (
    <div className="container" style={{ marginTop: 'var(--header-height)', paddingTop: '30px', paddingBottom: '50px' }}>
      <ProjectDashboard />
    </div>
  );
};

export default ProjectTrackingPage;