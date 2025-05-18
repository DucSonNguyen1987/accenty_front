
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import TeamPage from './pages/TeamPage';
import AppointmentPage from './pages/AppointmentPage';
import QuotePage from './pages/QuotePage';
import ProjectTrackingPage from './pages/ProjectTrackingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/project-tracking" element={<ProjectTrackingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;