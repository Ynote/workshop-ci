# Comprendre le déploiement continu avec Heroku

**Objectif** : ce tutoriel vous permet de mettre en place un déploiement continu
sur un de vos projets avec Heroku.

**Contexte** : nous allons utiliser un exemple d'application en Node.js servie
avec Express. Vous pouvez évidemment adapter cela en fonction de votre projet
personnel.

**Niveau** : intermédiaire.

**Pré-requis** : un projet GitHub avec une application dynamique (Node.js, PHP,
Rails, Python, etc.)

## Sommaire

## Création du compte

1. Allez sur l'url https://signup.heroku.com/ et remplissez le formulaire de
   création de compte :

   <p align="center">
     <img width="864" alt="Screenshot 2019-09-28 at 17 12 04"
     src="https://user-images.githubusercontent.com/548778/65818588-24226280-e213-11e9-998d-d8dc841f58fa.png">
   </p>

2. Confirmez votre compte avec votre adresse email.

3. Créez votre mot de passe :
   <p align="center">
     <img width="631" alt="Screenshot 2019-09-28 at 17 13 30"
     src="https://user-images.githubusercontent.com/548778/65818628-79f70a80-e213-11e9-8a54-0c811247221e.png">
   </p>

4. Votre compte est créé !

## Ajout d'une application

> Pour pouvoir mettre en place du déploiement continu avec Heroku, il vous faut
  créer un environnement spécifique pour votre application et le connecter avec
  votre dépôt Git sur GitHub.

1. Allez sur https://github.com/Ynote/workshop-express-example et faites un fork
   de ce dépôt Git :
   <p align="center">
     <img width="1064" alt="Screenshot 2019-09-28 at 17 16 12"
     src="https://user-images.githubusercontent.com/548778/65818660-cb9f9500-e213-11e9-8d26-ad1e51945822.png">
   </p>

2. Retournez sur l'[interface d'Heroku](https://dashboard.heroku.com/apps) et
   créez une nouvelle application en cliquant sur le bouton `Create new app` :
   <p align="center">
     <img width="1266" alt="Screenshot 2019-09-28 at 17 17 48"
     src="https://user-images.githubusercontent.com/548778/65818683-2933e180-e214-11e9-8695-c6bd9fda486c.png">
   </p>

3. Indiquez le nom que vous souhaitez pour votre application, ainsi que la
   région du monde dans laquelle vous voulez déployer votre application. Passez
   l'option `Add to pipeline…` (cette option est payante, n'hésitez pas à nous
   demander davantage information dessus si vous le souhaitez) :
   <p align="center">
     <img width="807" alt="Screenshot 2019-09-28 at 17 18 22"
     src="https://user-images.githubusercontent.com/548778/65818699-56808f80-e214-11e9-856d-44ca7305ee19.png">
   </p>

4. Vous allez être redirigé·e sur une interface pour configurer le déploiement
   de votre application. Connectez votre compte GitHub :
   <p align="center">
     <img width="1292" alt="Screenshot 2019-09-28 at 17 24 20"
     src="https://user-images.githubusercontent.com/548778/65819054-30f58500-e218-11e9-853e-d2864e377f25.png">
   </p>

5. Acceptez les permissions à accorder à Heroku :
   <p align="center">
     <img width="634" alt="Screenshot 2019-09-28 at 17 51 26"
     src="https://user-images.githubusercontent.com/548778/65819098-cc86f580-e218-11e9-94ed-171b063cf2a0.png">
   </p>

6. Votre application Heroku est maintenant liée à votre compte GitHub. Il faut
   maintenant lui indiquer quel dépôt suivre. Indiquez le nom du dépôt
   `workshop-express-example` et cliquez sur `Search`. Puis, cliquez sur
   `Connect` :
   <p align="center">
     <img width="1341" alt="Screenshot 2019-09-28 at 17 53 44"
     src="https://user-images.githubusercontent.com/548778/65819122-45864d00-e219-11e9-88d8-1cbcfbcbc732.png">
   </p>

Voilà, votre application est maintenant prête ! Nous allons maintenant aborder
le fonctionnement d'Heroku pour comprendre comment le déploiement continu peut
se mettre en place.

## Le fonctionnement basique d'Heroku
