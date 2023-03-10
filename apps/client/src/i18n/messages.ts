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
        explorer: 'D??couvrir',
      },
    },
    auth: {
      title: 'Bienvenue sur la plateforme 100% engag??e !',
      subTitle: 'Suivez l\'actualit?? de notre soci??t?? avec des cr??ateurs engag??s',
      btnLogin: 'Se connecter',
      btnSignin: 'S\'inscrire',
    },
    signin: {
      errorApi: {
        400: 'L\'adresse mail est d??j?? utilis??e',
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
      legal: 'En cochant cette case, j\'accepte les <router-link to="/legal" id="termes">termes et confidentialit??</ router-link> de l\'application.',
      createAccount: 'Cr??er mon compte',
      loginWithGoogle: 'S\'inscrire avec Google',
      alreadyAccount: 'Vous avez d??j?? un compte ? <router-link to="/auth/signin">Se connecter</router-link>',
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
            default: 'Le champ ne peut pas ??tre vide',
            pattern: 'L\'adresse mail n\'est pas valide',
          },
        },
        {
          label: 'Mot de passe',
          error: {
            default: 'Le champ ne peut pas ??tre vide',
          },
        },
      ],
    },
    bookmarks: {
      noData: 'Aucune publication sauvegard??e',
      noBookmarks: 'Ajout??s recemment',
    },
    discover: {
      filters: [
        'G??opolitique',
        'Reportage',
        'Actualit??',
        'France',
        'Histoire',
        'Soci??t??',
      ],
      inputPlaceholder: 'Rechercher un cr??ateur ou une vid??o',
      trendsVideosTitle: 'Vid??os tendances',
      trendsCreatorsTitle: 'Cr??ateurs tendances',
      cta: 'Voir plus',
    },
    comments: {
      head: 'Commentaires',
      createdAt: 'Il y a {creationTime}',
      noComments: 'Aucun commentaire pour le moment',
    },
    user: {
      follow: 'Abonn??',
      noFollow: 'S\'abonner',
    },
    userPublications: {
      seeDetails: 'Voir les d??tails',
    },
    userAbout: {
      tabTitle: '?? propos',
      publications: 'Publications',
      contributors: 'Contributeurs actifs',
      socialTitle: 'Mes r??seaux sociaux',
      activeSince: 'Actif depuis le {date}',
      noSocial: 'Aucun r??seau social',
      noDescription: 'Aucune description',
    },
    userCommunity: {
      tabTitle: 'Communaut??',
      needFollow: 'Vous devez suivre {name} pour voir sa communaut??',
    },
    cardMedia: {
      needFollow: 'Vous devez suivre {name} pour voir cette vid??o',
    },
  },
};
