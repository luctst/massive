# massive
*Onboarding massive app*

## Prérequis

* Install Node avec NVM [https://formulae.brew.sh/formula/nvm](https://formulae.brew.sh/formula/nvm)
* Install Docker [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
* Install PNPM [https://pnpm.io/installation#using-homebrew](https://pnpm.io/installation#using-homebrew)
* Create NGROK account [https://ngrok.com/](https://ngrok.com/)

## Installer les dependances avec PNPM:
À la racine du projet ouvrir un terminal et lancer la commande suivante:
```
pnpm i
```

## Créer .env files
1. Créer un fichier `.env` à la racine du projet en copiant à l'intérieur le contenu du fichier `.env.dist` en remplaçant les valeurs entre `<>`.
2. Créer un fichier `.env` à l'intérieur du dossier `strapi` en copiant la partie **strapi** située dans le fichier `.env.dist`.

## Lancer docker:
1. Vérifier que docker est lancé en exécutant la commande `docker -v`, un numéro de version doit être retournée.
2. Une fois docker lancé, executé la commande `docker compose up -d --remove-orphans --force-recreate` à la racine du projet.

## Ouvrir le front et le back-office(strapi)
Si aucune erreur est remontée strapi devrait être accessible à l'adresse suivante `http://localhost:1337/admin`, le front `http://localhost:{CLIENT_PORT}/` ou **CLIENT_PORT** correspond au port rentré dans la variable située dans le fichier `.env`.

## Accéder au front via NGROK (url en ligne)
Afin d'accéder à l'appli vue depuis une URL en ligne entrez la commande suivante dans un terminal:
```
docker compose ngrok
```
Copié l'url indiquée.
