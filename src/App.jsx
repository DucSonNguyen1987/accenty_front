// src/App.jsx - Version corrigée
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';
// Imports des pages et composants
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import TeamPage from './pages/TeamPage';
import AppointmentPage from './pages/AppointmentPage';
//import QuotePage from './pages/QuotePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ProjectTrackingPage from './pages/ProjectTrackingPage';
import './App.css';
import './styles/global.css';
// Créez un composant séparé pour les routes protégées
function AppRoutes() {
  // Utiliser useAuth seulement à l'intérieur du composant qui est enveloppé par AuthProvider
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Routes protégées */}
      <Route path="/project-tracking" element={
        loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
          </div>
        ) : isAuthenticated ? (
          <ProjectTrackingPage />
        ) : (
          <Navigate to="/login" state={{ from: location }} replace />
        )
      } />
    </Routes>
  );
}

function App() {
  // Ne pas utiliser useAuth() ici!
  
  return (
    <AuthProvider>
      <AppointmentProvider>
        <div className="app">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;