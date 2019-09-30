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

1. Cette étape n'est pas nécessaire si vous travaillez sur votre projet
   personnel et non sur l'exemple fourni. Allez sur
   https://github.com/Ynote/workshop-express-example et faites un fork de ce
   dépôt Git :
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
   (ex : `workshop-express-example`) et cliquez sur `Search`. Puis, cliquez sur
   `Connect` :
   <p align="center">
     <img width="1341" alt="Screenshot 2019-09-28 at 17 53 44"
     src="https://user-images.githubusercontent.com/548778/65819122-45864d00-e219-11e9-88d8-1cbcfbcbc732.png">
   </p>

Voilà, votre application est maintenant prête ! Nous allons maintenant aborder
le fonctionnement d'Heroku pour comprendre comment le déploiement continu peut
se mettre en place.

## Le fonctionnement basique d'Heroku

> Heroku est une [plateforme
__polyglotte__](https://blog.heroku.com/polyglot_platform) qui permet aux
développeurs et développeuses de construire et déployer facilement des
applications web. L'un de ses avantages est de fournir une infrastructure rapide
à mettre en place pour de nombreux langages de programmation :
- des outils spécifiques relatifs au langage de programmation choisi
  (gestionnaires de dépendances, console interactive, etc.),
- une expérience et un configuration similaires de l'environnement quelque soit
  le langage utilisé.

### Choix du langage de programmation utilisé

> Heroku founit un ensemble d'outils adapté pour chaque langage afin de gérer
  l'installation des dépendances et le process de build de votre application.
  Ces outils sont appelés [buildpacks](https://blog.heroku.com/buildpacks). Ils
  sont nécessaire pour configurer correctement l'environnement de votre
  application.

1. Pour choisir le buildpack de votre application, allez dans les `Settings` de
   votre application :
   <p align="center">
     <img width="1256" alt="Screenshot 2019-09-30 at 16 56 35"
     src="https://user-images.githubusercontent.com/548778/65890658-83af7800-e3a3-11e9-9531-dbf4b5811252.png">
   </p>

2. Choisir le buildpack correspondant au langage de programmation de votre
   application dans la section `Buildpacks` :
   <p align="center">
     <img width="1286" alt="Screenshot 2019-09-30 at 16 56 51"
     src="https://user-images.githubusercontent.com/548778/65890752-b35e8000-e3a3-11e9-8a08-5b26a706c90d.png">
   </p>

3. Dans notre exemple, vous allez choisir `Node.js` :
   <p align="center">
     <img width="1007" alt="Screenshot 2019-09-30 at 16 57 01"
     src="https://user-images.githubusercontent.com/548778/65890841-e143c480-e3a3-11e9-8571-f0ff23fa590f.png">
   </p>

4. Voilà ! Au prochain déploiement de votre application, ce buildpack sera
   utilisé. Vous pouvez également en ajouter d'autres en fonction de votre
   application ou en supprimer si nécessaire :
   <p align="center">
     <img width="1263" alt="Screenshot 2019-09-30 at 16 57 23"
     src="https://user-images.githubusercontent.com/548778/65890994-20721580-e3a4-11e9-8965-cb4e358e4c16.png">
   </p>

### Configuration du lancement de votre application

> Maintenant que le gestionnaire de dépendances ainsi que les dépendances de
  sont installées, il faut indiquer à l'outil comment lancer votre application
  elle-même. Heroku se base sur un [Procfile] pour connaître les différents
  process à lancer pour votre application.

1. Un `Procfile` est un simple fichier texte qui liste un ensemble de clé-valeur
   avec un nom de process et une commande à lancer. Il suit le format suivant :
   ```
   <process type>: <command>
   ```
   - `process type` : un nom alphanumérique comme `web`, `worker` ou autre.
     Vous pouvez utiliser n'importe quel nom. Cependant, sur Heroku, le process
     `web` est un process particulier. Il est le seul à pouvoir recevoir du
     trafic externe HTTP provenant des routeurs d'Heroku. Si vous utilisez une
     commande pour lancer un serveur web, il faut l'intégrer dans votre
     `Procfile` sous la clé `web`.
    - `command` : une commande à lancer. Sur Heroku, cela correspond à une
      commande qui sera lancée au démarrage de la machine (ou __dynos__) qui
      héberge votre application.

2. À la racine de votre application, ajoutez un fichier `Procfile` avec une
   commande pour lancer votre serveur web. Dans notre exemple :
   ```
   web: npm start
   ```

Votre application est maintenant configurée pour être déployée !

## Livraison continue

>  La livraison continue permet de mettre à disposition des nouvelles
   fonctionnalités ou des bugfixes le plus rapidement possible en délivrant une
   application avec une **seule et unique action humaine**, le plus souvent une
   ligne de commande ou un clic sur un bouton.

1. Avec Heroku, la configuration de l'environnement de votre application, ainsi
   que son build, est entièrement géré avec les buildpacks et le `Procfile`.
   L'unique action à faire est donc d'activer le lancement de ces outils pour
   déployer votre application. Cela est possible dans l'onglet `Deploy` :
   <p align="center">
     <img width="1261" alt="Screenshot 2019-09-30 at 17 37 25"
     src="https://user-images.githubusercontent.com/548778/65893878-0be44c00-e3a9-11e9-9a79-7f1605c92f9c.png">
   </p>

2. Allez dans la section `Manual deploy` et choisissez la branche à déployer.
   Dans notre exemple, vous allez déployer la dernière version de la branche
   `master` de votre dépôt Git qui se trouve sur GitHub en cliquant sur `Deploy
   Branch` :
   <p align="center">
     <img width="1039" alt="Screenshot 2019-09-30 at 17 38 41"
     src="https://user-images.githubusercontent.com/548778/65894049-5bc31300-e3a9-11e9-9c79-1755a977f3a9.png">
   </p>

3. Vous pouvez voir les différentes étapes de l'installation et le build de
   votre application :
   <p align="center">
     <img width="881" alt="Screenshot 2019-09-30 at 17 40 59"
     src="https://user-images.githubusercontent.com/548778/65894223-a93f8000-e3a9-11e9-96a3-e8300eb6bf4b.png">
   </p>

4. Lorsque le déploiement est terminée, vous avez la possibilité de voir
   directement votre application en production :
   <p align="center">
     <img width="861" alt="Screenshot 2019-09-30 at 17 41 32"
     src="https://user-images.githubusercontent.com/548778/65894338-e441b380-e3a9-11e9-91de-12118860d298.png">
   </p>

## Déploiement continu

> Maintenant que la livraison continue est en place, une dernière action vous
  permettra de facilement de déployer automatiquement en fonction de nouveaux
  commits sur une branche.

1. Allez dans l'onglet `Deploy` :
   <p align="center">
     <img width="1261" alt="Screenshot 2019-09-30 at 17 37 25"
     src="https://user-images.githubusercontent.com/548778/65893878-0be44c00-e3a9-11e9-9a79-7f1605c92f9c.png">
   </p>

2. Allez dans la section `Automatic deploy`, choisissez la branche à déployer en
   production et activez le déploiement automatique de votre application. Dans
   notre exemple, vous allez déployer la branche `master` à chaque nouveau
   commit sur cette branche en cliquant sur `Enable Automatic Deploys`
   <p align="center">
     <img width="1292" alt="Screenshot 2019-09-30 at 17 46 01"
     src="https://user-images.githubusercontent.com/548778/65894688-777ae900-e3aa-11e9-8cba-c761a18db6b2.png">
   </p>

3. Si vous avez mis en place un autre outil de CI qui écoute votre dépôt Git,
   vous pouvez également indique à Heroku d'attendre que le CI passe avant de
   déployer votre application :
   <p align="center">
     <img width="1267" alt="Screenshot 2019-09-30 at 17 49 22"
     src="https://user-images.githubusercontent.com/548778/65894858-c32d9280-e3aa-11e9-95ae-19a9055f09cd.png">
   </p>

   - Le dépôt d'exemple https://github.com/Ynote/workshop-express-example
     contient un script pour lancer des tests `npm test`. Vous pouvez utiliser
     ce [tutoriel CodeShip pour ajouter un
     CI](https://github.com/Ynote/workshop-ci/blob/master/docs/codeship/basic-ci_FR.md)
     sur votre dépôt et ainsi mettre en place un déploiement continu fiable et
     efficace.
    - Si vous utilisez un projet personnel, pensez à :
      - créer une suite de tests pour votre application,
      - mettre en place un CI,
      - mettre en place le déploiement continu avec ce CI.
    - Une autre manière de mettre en place un CI est d'utiliser [Heroku
      CI](https://devcenter.heroku.com/articles/heroku-ci). Toutefois, cela
      nécessite d'utiliser leur fonctionnalité de
      [pipelines](https://devcenter.heroku.com/articles/pipelines).

## Ressources












