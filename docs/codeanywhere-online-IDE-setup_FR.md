# Création de votre IDE Codeanywhere en ligne

[Codeanywhere](https://codeanywhere.com) est un environnement de développement
intégré (IDE) en ligne.

**Objectif** : dans le cadre de l'atelier, Codeanywhere va vous permettre de
mettre en place un environnement de développement rapidement et de pouvoir
suivre pas à pas les étapes de la création d'un projet en déploiement continu.

**Contexte** : Si vous êtes à l'aise avec l'installation de langages et la
configuration de votre ordinateur, il n'est pas nécessaire pour vous de suivre
ce tutoriel.

**Niveau** : débutant.

**Pré-requis** : un compte GitHub.

## Sommaire

- [Fork du projet tutoriel](#fork-du-projet-tutoriel)
- [Création de votre compte Codeanywhere](#création-de-votre-compte-codeanywhere)
- [Création de votre espace de travail](#création-de-votre-espace-de-travail)
- [Installation des dépendances pour l'atelier](#installation-des-dépendances-pour-latelier)
- [Configuration pour GitHub](#configuration-pour-github)
- [Retrouver sa console](#retrouver-sa-console)

## Fork du projet tutoriel

Allez sur https://github.com/Ynote/workshop-ci et cliquez sur le bouton `fork`
pour avoir un fork de ce dépôt Git sur votre compte personnel GitHub :

<p align="center">
  <img width="1045" alt="Screenshot 2019-09-30 at 18 51 39"
  src="https://user-images.githubusercontent.com/548778/65899324-c7aa7900-e3b3-11e9-9e22-a220db0fd5c2.png">
</p>

## Création de votre compte Codeanywhere

1. Allez sur l'url https://codeanywhere.com/login et connectez-vous avec votre
   compte GitHub :

   <p align="center">
     <img width="725" alt="Screenshot 2019-07-28 at 18 15 31"
   src="https://user-images.githubusercontent.com/548778/62009867-1180a400-b164-11e9-927e-dc33e0c1ea7f.png">
   </p>

2. Donnez l'autorisation à Codeanywhere d'accéder à vos données GitHub nécessaires
   pour pouvoir utiliser l'outil :

   <p align="center">
     <img width="1552" alt="Screenshot 2019-07-28 at 17 54 54"
     src="https://user-images.githubusercontent.com/548778/62009872-15142b00-b164-11e9-8811-2b55089fc716.png">
   </p>

3. Vérifiez vos emails pour retrouver l'email envoyé par Codeanywhere et validez
   votre compte.

## Création de votre espace de travail

1. Lorsque vous êtes connecté·e, une popup s'ouvre pour vous permettre de créer
   votre premier espace de travail. La popup se nomme `Connection wizard`.
   Cliquez sur `Git from URL` et tapez l'url suivante dans le champ :

   ```
   https://github.com/VOTRE-NOM-UTILISATEUR/workshop-ci
   ```

   <p align="center">
     <img width="839" alt="Screenshot 2019-09-30 at 19 04 35"
     src="https://user-images.githubusercontent.com/548778/65899985-35a37000-e3b5-11e9-8bea-eec6bf9f556b.png">
   </p>

   Cela va permettre à Codeanywhere de préparer votre environnement de travail avec
   le dépôt Git `workshop-ci` de votre propre compte GitHub.

2. Sur l'étape suivante :
   - Tapez le nom du projet : `Workshop-CI`,
   - Recherchez un container `ruby`,
   - Choisissez le container Ruby pour `Ubuntu 16.04`,
   - Puis, cliquez sur `Create`.

   <p align="center">
     <img width="846" alt="Screenshot 2019-09-30 at 19 06 14"
     src="https://user-images.githubusercontent.com/548778/65900122-80bd8300-e3b5-11e9-82f1-df0d57689e9b.png">
   </p>

3. Si tout se passe bien, une popup vous notifiant de la création de votre
   container devrait s'afficher :

   <p align="center">
     <img width="650" alt="Screenshot 2019-07-28 at 17 57 36"
     src="https://user-images.githubusercontent.com/548778/62010080-59082f80-b166-11e9-8bee-ab8fcaf2961d.png">
   </p>

4. Dans certains cas une popup d'erreur peut s'afficher :

   <p align="center">
     <img width="815" alt="Screenshot 2019-07-28 at 17 57 03"
     src="https://user-images.githubusercontent.com/548778/62010077-54437b80-b166-11e9-9ae8-ffe9a11f94e3.png">
   </p>

   Si vous êtes dans ce cas, c'est que vous n'avez pas pris le temps de valider
   votre compte. Dans ce cas, retournez dans vos emails, validez votre compte et
   [recommencez les étapes](#création-de-votre-espace-de-travail). Pour retourner
   sur la popup de création de container, allez dans
   `File > New connection > Git from URL` :

   <p align="center">
     <img width="553" alt="Screenshot 2019-07-28 at 18 40 37"
     src="https://user-images.githubusercontent.com/548778/62010160-7093e800-b167-11e9-9f7b-7643864f58f0.png">
   </p>

## Installation des dépendances pour l'atelier

> Lorsque votre container est crée, deux onglets vont automatiquement s'ouvrir.
  Vous pouvez fermer le dernier onglet. Dans le premier onglet, vous disposerez
  d'une console en ligne dans un environnement créé spécifiquement pour notre
  atelier.

1. Installez les dépendances liées à notre projet. Dans votre console, tapez :

   ```sh
   bin/install
   ```


2. Les dépendances installées sont principalement liées à la commande `rspec` qui
   va nous permettre de lancer les tests sur notre projet. Pour tester que ces
   dépendances ont bien été installées, testez `rspec` en tapant :

   ```sh
   bundle exec rspec hello_world_spec.rb
   ```

   Normalement, la commande devrait vous sortir en output :

   ```sh
   1 example, 0 failures
   ```

   Voici un screenshot des commandes ci-dessous et leur output :

   <p align="center">
     <img width="1440" alt="Screenshot 2019-07-28 at 17 59 43"
   src="https://user-images.githubusercontent.com/548778/62010203-fb74e280-b167-11e9-8f9b-4d42e4eae12b.png">
   </p>

### Configuration pour GitHub

1. Par défaut, Codeanywhere utilise un clone `https` pour votre dépôt. Cela
   n'est pas pratique car pour chaque commande Git, un authentification vous
   sera demandée. Remplacez donc le serveur distant de votre dépôt par une
   authentification SSH :
   ```sh
   # Suppression du serveur distant
   git remote remove origin

   # Ajout du serveur distant SSH
   git remote add origin git@github.com:VOTRE-NOM-UTILISATEUR/workshop-ci.git

   # Vérification du serveur distant
   git remote -v
   ```
   <p align="center">
     <img width="447" alt="Screenshot 2019-09-30 at 19 28 20"
     src="https://user-images.githubusercontent.com/548778/65901425-7c469980-e3b8-11e9-953d-dfb128161ded.png">
   </p>

2. Récupérez la clé SSH de votre serveur Codeanywhere et copiez-la quelque part
   :
   ```sh
   cat ~/.ssh/id_rsa.pub
   ```

3. Ajoutez cette clé SSH dans GitHub. Allez sur https://github.com/settings/keys
   et cliquez sur `New SSH key` :
   <p align="center">
     <img width="1015" alt="Screenshot 2019-09-30 at 19 29 30"
     src="https://user-images.githubusercontent.com/548778/65901718-0d1d7500-e3b9-11e9-86fd-a8fb9f96b15e.png">
   </p>

4. Donnez un nom à cette clé et collez la clé préalablement copiée dans le champ
   `key` :
   <p align="center">
     <img width="1015" alt="Screenshot 2019-09-30 at 19 32 17"
     src="https://user-images.githubusercontent.com/548778/65901868-5c63a580-e3b9-11e9-8e32-00824bfcf908.png">
   </p>

Voilà ! Votre environnement de développement est prêt !

## Retrouver sa console

Si votre console ne répond plus ou que vous l'avez fermée, vous pouvez la
rouvrir en faisant un clic-droit sur votre container et cliquer sur `SSH
Terminal`:

<p align="center">
  <img width="403" alt="Screenshot 2019-07-28 at 18 47 05"
  src="https://user-images.githubusercontent.com/548778/62010340-e305c780-b169-11e9-8bae-d58f4a3a3dad.png">
</p>
