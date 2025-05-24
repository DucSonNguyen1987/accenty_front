import React from 'react';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import Gallery from '../components/Gallery/Gallery';
import Team from '../components/Team/Team';
import Testimonials from '../components/Testimonials/Testimonials';
import ContactForm from '../components/Contact/ContactForm';
import { Link } from 'react-router-dom';





const Home = () => {
  // Données pour les services à afficher sur la page d'accueil
  const featuredServices = [
    {
      id: 1,
      icon: 'fa-glass-cheers',
      title: 'Mariages & Cérémonies',
      description: 'Nous créons le mariage de vos rêves, en gérant chaque détail pour une journée parfaite.',
      image: '/Images/services/Wedding2.png',
      fallbackImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format',
    },
    {
      id: 2,
      icon: 'fa-briefcase',
      title: 'Événements Corporatifs',
      description: 'Séminaires, conférences et team buildings professionnels pour renforcer votre image de marque.',
      image: '/Images/services/Corporate2.png',
      fallbackImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&auto=format',
    },
    {
      id: 3,
      icon: 'fa-birthday-cake',
      title: 'Célébrations Privées',
      description: 'Anniversaires, baptêmes et fêtes familiales pour marquer les moments importants de votre vie.',
      image: '/Images/services/Anniversaire.png',
      fallbackImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop&auto=format',
    },
    {
      id: 4,
      icon: 'fa-store',
      title: 'Lancements de Produits',
      description: 'Mettez en valeur vos produits avec des événements spectaculaires qui captent l\'attention.',
      image: '/Images/services/LaunchParty.png',
      fallbackImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&auto=format',
    },
  ];

  // Données pour la galerie à afficher sur la page d'accueil
  const featuredGalleryItems = [
    {
      id: 1,
      image: '/Images/testimonials/Wedding3.png',
      category: 'Mariage',
      title: 'Mariage de Kamwanya & Mukeba',
    },
    {
      id: 2,
      image: '/Images/testimonials/Corporate3.png',
      category: 'Corporatif',
      title: 'Conférence annuelle TechVision',
    },
    {
      id: 3,
      image: '/Images/testimonials/Party3.png',
      category: 'Anniversaire',
      title: 'Les 50 ans de Mwamba',
    },
    {
      id: 4,
      image: '/Images/testimonials/Party4.png',
      category: 'Lancement',
      title: 'Présentation nouvelle collection',
    },
    {
      id: 5,
      image: '/Images/testimonials/Diner.png',
      category: 'Gala',
      title: 'Dîner de charité Fondation Nkosi',
    },
    {
      id: 6,
      image: '/Images/testimonials/Wedding4.png',
      category: 'Mariage',
      title: 'Cérémonie de Tshibola & Kalala',
    },
  ];

  // Données des témoignages clients
  const testimonials = [
    {
      id: 1,
      text: "L'équipe d'Accenty & Co a transformé notre mariage en un moment magique. Chaque détail était parfait, et nous avons pu profiter pleinement de notre journée sans stress.",
      author: "Kamwanya & Mukeba",
      role: "Mariage Juin 2024",
      image: "/Images/testimonials/Wedding5.jpg"
    },
    {
      id: 2,
      text: "Notre conférence annuelle a été un succès retentissant grâce à Accenty & Co. Organisation impeccable, décoration élégante, et une équipe toujours à l'écoute de nos besoins.",
      author: "Kabedi Lukusa",
      role: "Directrice Marketing, TechVision",
      image: "/Images/testimonials/Corporate3.png"
    },
    {
      id: 3,
      text: "Pour mes 40 ans, je voulais quelque chose de spécial. Accenty & Co a dépassé toutes mes attentes avec une fête sur-mesure que mes invités n'oublieront jamais.",
      author: "Mwamba Mudimbi",
      role: "Anniversaire Avril 2024",
      image: "/Images/testimonials/Party3.png"
    }
  ];
  return (
    <div>
      <Hero />

      <Services
        title="Nos Services"
        subtitle="Des prestations sur-mesure pour tous vos événements"
        description="Chez Accenty & Co, nous proposons une gamme complète de services événementiels adaptés à vos besoins et à votre budget."
        services={featuredServices}
        showButton={true}
      />

      <Gallery
        title="Nos Réalisations"
        subtitle="Découvrez nos événements mémorables"
        description="Explorez notre galerie d'événements exceptionnels que nous avons eu le plaisir d'organiser pour nos clients."
        items={featuredGalleryItems}
        showButton={true}
        limit={6}
      />

      <Team 
        title="Notre Équipe" 
        subtitle="Des experts passionnés à votre service" 
        description="Derrière chaque événement réussi se cache une équipe de professionnels dévoués et créatifs."
        showButton={true}
        limit={3}
      />

      <Testimonials
              title="Ils Nous Font Confiance"
              subtitle="La satisfaction de nos clients est notre priorité"
              testimonials={testimonials}
            />


            <section className="section" id="contact-section">
        <div className="container">
          <div className="section-title">
            <h2>Contactez-Nous</h2>
            <p>Parlons de votre projet et concrétisons vos idées</p>
          </div>
          
          <div className="grid grid-cols-2">
            <div>
              <h3>Prenons rendez-vous</h3>
              <p>
                Vous avez un événement en tête ? Contactez-nous pour discuter de vos besoins 
                et obtenir un accompagnement personnalisé. Notre équipe est à votre disposition 
                pour répondre à toutes vos questions.
              </p>
              
              <div className="mt-4">
                <p>
                  <i className="fas fa-map-marker-alt"></i>
                  <span className="ml-2">382, avenue Colonel Mondjiba Quartier/ Basoko,<br/> Commune/ Ngaliema Kinshasa</span>
                </p>
                <p className="mt-2">
                  <i className="fas fa-phone"></i>
                  <span className="ml-2">+243 894 79 79 36</span>
                </p>
                <p className="mt-2">
                  <i className="fas fa-envelope"></i>
                  <span className="ml-2">contact@accenty-co.org</span>
                </p>
              </div>
              
              <div className="mt-4">
                <Link to="/appointment" className="button">
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

    </div>

    


  );
};

export default Home;
