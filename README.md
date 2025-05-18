# Accenty & Co - Frontend

Ce repository contient le code frontend pour le site web d'Accenty & Co, une agence d'événementiel professionnelle.

## Fonctionnalités

- Site web responsive avec design moderne
- Galerie de réalisations avec filtres par catégorie
- Système de prise de rendez-vous en ligne
- Formulaire de demande de devis personnalisés
- Interface de suivi de projet pour les clients
- Présentation de l'équipe
- Témoignages clients
- Formulaire de contact

## Technologies utilisées

- React.js
- React Router pour la navigation
- CSS Modules pour les styles
- Context API pour la gestion de l'état global
- Responsive design pour tous les appareils
- Font Awesome pour les icônes

## Structure du projet

```
accenty-co-frontend/
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── images/
│       ├── logo.png
│       ├── team/
│       │   └── ...
│       ├── events/
│       │   └── ...
│       └── ...
│
├── src/
│   ├── App.js
│   ├── index.js
│   ├── components/
│   │   ├── Navigation/
│   │   ├── Hero/
│   │   ├── Services/
│   │   ├── Gallery/
│   │   ├── Team/
│   │   ├── Appointment/
│   │   ├── Quote/
│   │   ├── ProjectTracking/
│   │   ├── Testimonials/
│   │   ├── Contact/
│   │   └── Footer/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── GalleryPage.jsx
│   │   ├── TeamPage.jsx
│   │   ├── AppointmentPage.jsx
│   │   ├── QuotePage.jsx
│   │   ├── ProjectTrackingPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── LoginPage.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── AppointmentContext.js
│   │
│   ├── utils/
│   │   ├── api.js
│   │   ├── dateUtils.js
│   │   └── validators.js
│   │
│   └── styles/
│       ├── variables.css
│       ├── global.css
│       └── animations.css
│
├── package.json
└── README.md
```

## Mise en route

### Prérequis

- Node.js (v14.0.0 ou supérieur)
- npm ou yarn

### Installation

1. Clonez le repository
   ```bash
   git clone https://github.com/votre-username/accenty-co-frontend.git
   cd accenty-co-frontend
   ```

2. Installez les dépendances
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Lancez le serveur de développement
   ```bash
   npm start
   # ou
   yarn start
   ```

4. Ouvrez http://localhost:3000 dans votre navigateur

### Construction pour la production

Pour construire l'application pour la production :

```bash
npm run build
# ou
yarn build
```

Les fichiers de production seront générés dans le dossier `build/`.

## Déploiement

### Hébergement avec Netlify

1. Créez un compte sur [Netlify](https://netlify.com)
2. Connectez votre repository GitHub à Netlify
3. Configurez les options de déploiement :
   - Commande de build : `npm run build`
   - Répertoire de publication : `build`
4. Cliquez sur "Déployer le site"

### Hébergement avec Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre projet depuis GitHub
3. Configurez les options de déploiement (les valeurs par défaut fonctionnent généralement)
4. Cliquez sur "Déployer"

## Personnalisation

### Couleurs et thème

Modifiez les variables CSS dans `src/styles/variables.css` pour personnaliser les couleurs, les polices et les espacements.

### Images et contenu

Remplacez les images dans le dossier `public/images/` avec votre propre contenu.

### Configuration

Pour modifier les informations de contact, mettez à jour le composant `Footer` et la page `Contact`.

## Fonctionnalités à venir

- Intégration avec un système de paiement pour les acomptes
- Calendrier d'événements
- Blog et section actualités
- Version multilingue (Français/Anglais)
- Système de chat en direct avec les clients

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contact

Pour toute question ou suggestion, contactez-nous à [contact@accenty-co.fr](mailto:contact@accenty-co.fr).