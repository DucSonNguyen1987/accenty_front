// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

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

  const { login, register, error: authError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtenir l'URL de redirection (si elle existe)
  const from = location.state?.from?.pathname || '/';
  
  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (isLogin) {
      // Validation login
      if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
      if (!formData.password) newErrors.password = 'Le mot de passe est requis';
    } else {
      // Validation inscription
      if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
      if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
      if (!formData.password) newErrors.password = 'Le mot de passe est requis';
      if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit avoir au moins 6 caractères';
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
          await login(formData.email, formData.password);
        } else {
          await register(formData.name, formData.email, formData.password);
        }
        // La redirection est gérée par le useEffect ci-dessus
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container">
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>
          {isLogin ? 'Connexion' : 'Créer un compte'}
        </h2>
        
        <p className={styles.loginSubtitle}>
          {isLogin 
            ? 'Connectez-vous pour accéder à votre espace client' 
            : 'Créez un compte pour profiter de toutes nos fonctionnalités'
          }
        </p>
        
        {authError && (
          <div className={styles.errorAlert}>
            <i className="fas fa-exclamation-circle"></i> {authError}
          </div>
        )}
        
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.formInput}
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
              />
              {errors.name && <div className={styles.formError}>{errors.name}</div>}
            </div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.formInput}
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
            />
            {errors.email && <div className={styles.formError}>{errors.email}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.formInput}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.password && <div className={styles.formError}>{errors.password}</div>}
          </div>
          
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.formLabel}>
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={styles.formInput}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <div className={styles.formError}>{errors.confirmPassword}</div>
              )}
            </div>
          )}
          
          {isLogin && (
            <div className={styles.forgotPassword}>
              <a href="#reset-password">Mot de passe oublié?</a>
            </div>
          )}
          
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i> Chargement...
              </span>
            ) : (
              isLogin ? 'Se connecter' : 'Créer mon compte'
            )}
          </button>
        </form>
        
        <div className={styles.formSwitch}>
          {isLogin ? (
            <p>
              Vous n'avez pas de compte?{' '}
              <button 
                type="button"
                className={styles.switchButton}
                onClick={() => setIsLogin(false)}
              >
                Inscrivez-vous
              </button>
            </p>
          ) : (
            <p>
              Déjà un compte?{' '}
              <button 
                type="button"
                className={styles.switchButton}
                onClick={() => setIsLogin(true)}
              >
                Connectez-vous
              </button>
            </p>
          )}
        </div>
        
        <div className={styles.demoInfo}>
          <h4>Pour tester l'application</h4>
          <p>Email: <code>demo@accenty-co.fr</code></p>
          <p>Mot de passe: <code>demo123</code></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;