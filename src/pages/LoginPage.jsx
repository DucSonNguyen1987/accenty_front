// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer l'URL de redirection (si existante)
  const from = location.state?.from?.pathname || '/project-tracking';
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur pour ce champ si elle existe
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  
  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (isLogin) {
      // Validation pour la connexion
      if (!formData.email.trim()) {
        newErrors.email = 'Veuillez entrer votre email';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Veuillez entrer un email valide';
      }
      
      if (!formData.password) {
        newErrors.password = 'Veuillez entrer votre mot de passe';
      }
    } else {
      // Validation pour l'inscription
      if (!formData.name.trim()) {
        newErrors.name = 'Veuillez entrer votre nom';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Veuillez entrer votre email';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Veuillez entrer un email valide';
      }
      
      if (!formData.password) {
        newErrors.password = 'Veuillez entrer un mot de passe';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        if (isLogin) {
          // Connexion
          await login(formData.email, formData.password);
        } else {
          // Inscription
          await register(formData.name, formData.email, formData.password);
        }
        
        // Rediriger vers la page demandée ou le tableau de bord
        navigate(from);
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Pour basculer entre connexion et inscription
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };
  
  return (
    <div className="container" style={{ maxWidth: '500px', margin: '80px auto', padding: '20px' }}>
      <div className="card" style={{ 
        backgroundColor: '#f9f9f9', 
        borderRadius: '10px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        padding: '30px' 
      }}>
        <div className="text-center mb-4">
          <h2>{isLogin ? 'Connexion' : 'Créer un compte'}</h2>
          <p>
            {isLogin 
              ? 'Accédez à votre espace client pour gérer vos projets' 
              : 'Rejoignez-nous pour accéder à votre espace client personnalisé'
            }
          </p>
        </div>
        
        {authError && (
          <div className="alert alert-danger" style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '20px' 
          }}>
            {authError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group mb-3">
              <label htmlFor="name" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                style={{ 
                  width: '100%', 
                  padding: '10px 15px', 
                  borderRadius: '5px', 
                  border: errors.name ? '1px solid #dc3545' : '1px solid #ced4da' 
                }}
                placeholder="Votre nom"
              />
              {errors.name && (
                <div className="error-message" style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.name}
                </div>
              )}
            </div>
          )}
          
          <div className="form-group mb-3">
            <label htmlFor="email" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              style={{ 
                width: '100%', 
                padding: '10px 15px', 
                borderRadius: '5px', 
                border: errors.email ? '1px solid #dc3545' : '1px solid #ced4da' 
              }}
              placeholder="Votre email"
            />
            {errors.email && (
              <div className="error-message" style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.email}
              </div>
            )}
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="password" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              style={{ 
                width: '100%', 
                padding: '10px 15px', 
                borderRadius: '5px', 
                border: errors.password ? '1px solid #dc3545' : '1px solid #ced4da' 
              }}
              placeholder="Votre mot de passe"
            />
            {errors.password && (
              <div className="error-message" style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.password}
              </div>
            )}
          </div>
          
          {!isLogin && (
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                style={{ 
                  width: '100%', 
                  padding: '10px 15px', 
                  borderRadius: '5px', 
                  border: errors.confirmPassword ? '1px solid #dc3545' : '1px solid #ced4da' 
                }}
                placeholder="Confirmez votre mot de passe"
              />
              {errors.confirmPassword && (
                <div className="error-message" style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          )}
          
          {isLogin && (
            <div className="text-end mb-3">
              <Link to="/forgot-password" style={{ 
                color: '#d9ab55', 
                textDecoration: 'none', 
                fontSize: '14px' 
              }}>
                Mot de passe oublié ?
              </Link>
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            style={{
              backgroundColor: '#d9ab55',
              border: 'none',
              padding: '12px',
              borderRadius: '5px',
              fontWeight: 'bold',
              color: 'white',
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px'
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i> Chargement...
              </span>
            ) : (
              isLogin ? 'Se connecter' : 'Créer un compte'
            )}
          </button>
        </form>
        
        <div className="text-center mt-4" style={{ 
          borderTop: '1px solid #e0e0e0', 
          paddingTop: '20px', 
          marginTop: '20px' 
        }}>
          {isLogin ? (
            <p>
              Vous n'avez pas de compte ?{' '}
              <button 
                onClick={toggleForm} 
                style={{ 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  color: '#d9ab55', 
                  cursor: 'pointer',
                  padding: 0,
                  fontWeight: 'bold'
                }}
              >
                Inscrivez-vous
              </button>
            </p>
          ) : (
            <p>
              Vous avez déjà un compte ?{' '}
              <button 
                onClick={toggleForm} 
                style={{ 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  color: '#d9ab55', 
                  cursor: 'pointer',
                  padding: 0,
                  fontWeight: 'bold'
                }}
              >
                Connectez-vous
              </button>
            </p>
          )}
        </div>
        
        <div className="text-center mt-3">
          <p style={{ fontSize: '14px', color: '#666' }}>
            Pour une démonstration, utilisez :<br />
            Email: demo@accenty-co.fr<br />
            Mot de passe: demo123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;