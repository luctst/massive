export default {
  en: {
    appNotAvailable: 'App not available',
    header: {
      routes: {
        home: 'Publications',
        bookmarks: 'Your bookmarks',
        explorer: 'Discover',
      },
    },
    auth: {
      title: 'Welcome to the 100% committed platform!',
      subTitle: 'Follow the news of our company with committed creators',
      btnLogin: 'Login',
      btnSignin: 'Signin',
    },
    signin: {
      errorApi: {
        400: 'The email address is already used',
        default: 'An error has occurred',
      },
      title: 'Signin',
      subTitle: 'Please fill in the fields below',
      firstName: {
        label: 'First name',
        placeholder: 'Emmanuel',
      },
      lastName: {
        label: 'Last name',
        placeholder: 'Macron',
      },
      userName: {
        label: 'Username',
        placeholder: 'Emmanuel Macron',
      },
      mail: {
        label: 'Mail',
        placeholder: 'manu.macron@gmail.com',
      },
      password: {
        label: 'Password',
      },
      legal: 'By checking this box, I accept the <router-link to="/legal" id="termes">terms and privacy</ router-link> of the application.',
      createAccount: 'Create my account',
      loginWithGoogle: 'Signin with Google',
      alreadyAccount: 'You already have an account? <router-link to="/auth/signin">Login</router-link>',
    },
    signup: {
      errorApi: {
        400: 'Incorrect credentials',
        default: 'An error has occurred',
      },
      title: 'Login',
      subTitle: 'Please fill in the fields below',
      noAccount: 'You don\'t have an account?',
      noAccountLink: 'Signin',
      cta: 'Login',
      inputs: [
        {
          label: 'Mail',
          placeholder: 'manu.macron@gmail.com',
          error: {
            default: 'The field cannot be empty',
            pattern: 'The email address is not valid',
          },
        },
        {
          label: 'Password',
          error: {
            default: 'The field cannot be empty',
          },
        },
      ],
    },
    bookmarks: {
      noData: 'No publication saved',
      noBookmarks: 'Added recently',
    },
    discover: {
      filters: [
        'Geopolitics',
        'Report',
        'News',
        'France',
        'History',
        'Society',
      ],
      inputPlaceholder: 'Search a creator or a video',
      trendsVideosTitle: 'Trending videos',
      trendsCreatorsTitle: 'Trending creators',
      cta: 'See more',
    },
    comments: {
      head: 'Comments',
      createdAt: 'There is {creationTime}',
      noComments: 'No comments for the moment',
    },
    user: {
      follow: 'Follow',
      noFollow: 'Followed',
      update: 'Update',
    },
    userPublications: {
      seeDetails: 'See details',
    },
    userAbout: {
      tabTitle: 'About',
      publications: 'Publications',
      contributors: 'Active contributors',
      socialTitle: 'My social networks',
      activeSince: 'Active since {date}',
      noSocial: 'No social network',
      noDescription: 'No description',
    },
    userCommunity: {
      tabTitle: 'Community',
      needFollow: 'You must follow {name} to see his community',
    },
    userUpdate: {
      title: 'MY profile',
      links: {
        subscribes: 'MY subscribes',
        personalData: 'MY personal data',
        support: 'Contact support',
        logout: 'Deconnexion',
      },
    },
    cardMedia: {
      needFollow: 'You must follow {name} to see this video',
    },
  },
  fr: {
    appNotAvailable: 'App non disponible sur ordinateur',
    header: {
      routes: {
        home: 'Publications',
        bookmarks: 'Vos favoris',
        explorer: 'Découvrir',
      },
    },
    auth: {
      title: 'Bienvenue sur la plateforme 100% engagée !',
      subTitle: 'Suivez l\'actualité de notre société avec des créateurs engagés',
      btnLogin: 'Se connecter',
      btnSignin: 'S\'inscrire',
    },
    signin: {
      errorApi: {
        400: 'L\'adresse mail est déjà utilisée',
        default: 'Une erreur est survenue',
      },
      title: 'Inscription',
      subTitle: 'Merci de remplir les champs ci-dessous',
      userName: {
        label: 'Nom d\'utilisateur',
        placeholder: 'Emmanuel Macron',
      },
      mail: {
        label: 'Adresse mail',
        placeholder: 'manu.macro@gmail.com',
      },
      password: {
        label: 'Mot de passe',
      },
      legal: 'En cochant cette case, j\'accepte les <router-link to="/legal" id="termes">termes et confidentialité</ router-link> de l\'application.',
      createAccount: 'Créer mon compte',
      loginWithGoogle: 'S\'inscrire avec Google',
      alreadyAccount: 'Vous avez déjà un compte ? <router-link to="/auth/signin">Se connecter</router-link>',
    },
    signup: {
      errorApi: {
        400: 'Identifiants incorrects',
        default: 'Une erreur est survenue',
      },
      title: 'Connexion',
      subTitle: 'Merci de remplir les champs ci-dessous',
      noAccount: 'Vous n\'avez pas de compte ?',
      noAccountLink: 'S\'inscrire',
      cta: 'Se connecter',
      inputs: [
        {
          label: 'Adresse mail',
          placeholder: 'manu.macron@gmail.com',
          error: {
            default: 'Le champ ne peut pas être vide',
            pattern: 'L\'adresse mail n\'est pas valide',
          },
        },
        {
          label: 'Mot de passe',
          error: {
            default: 'Le champ ne peut pas être vide',
          },
        },
      ],
    },
    bookmarks: {
      noData: 'Aucune publication sauvegardée',
      noBookmarks: 'Ajoutés recemment',
    },
    discover: {
      filters: [
        'Géopolitique',
        'Reportage',
        'Actualité',
        'France',
        'Histoire',
        'Société',
      ],
      inputPlaceholder: 'Rechercher un créateur ou une vidéo',
      trendsVideosTitle: 'Vidéos tendances',
      trendsCreatorsTitle: 'Créateurs tendances',
      cta: 'Voir plus',
    },
    comments: {
      head: 'Commentaires',
      createdAt: 'Il y a {creationTime}',
      noComments: 'Aucun commentaire pour le moment',
    },
    user: {
      follow: 'Abonné',
      noFollow: 'S\'abonner',
      update: 'Modifier',
    },
    userPublications: {
      seeDetails: 'Voir les détails',
    },
    userAbout: {
      tabTitle: 'À propos',
      publications: 'Publications',
      contributors: 'Contributeurs actifs',
      socialTitle: 'Mes réseaux sociaux',
      activeSince: 'Actif depuis le {date}',
      noSocial: 'Aucun réseau social',
      noDescription: 'Aucune description',
    },
    userCommunity: {
      tabTitle: 'Communauté',
      needFollow: 'Vous devez suivre {name} pour voir sa communauté',
    },
    userUpdate: {
      title: 'Mon profil',
      links: {
        subscribes: 'Mes abonnements',
        personalData: 'Mes informations personnelles',
        support: 'Contacter le support',
        logout: 'Déconnexion',
      },
    },
    cardMedia: {
      needFollow: 'Vous devez suivre {name} pour voir cette vidéo',
    },
  },
};
