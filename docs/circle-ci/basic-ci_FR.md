# L'intégration continue avec Circle CI

**Objectif** : ce tutoriel présente les premières étapes pour mettre en place
une intégration continue avec Circle CI sur un de vos projets. Il vous permettra
de créer l'environnement nécessaire pour lancer un test ou une suite de tests
à chaque nouveau commit sur une branche nouvelle ou existante de votre projet.

**Contexte** : nous continuerons à utiliser l'exemple avec le fichier
[`hello_world`](https://github.com/Ynote/workshop-ci/blob/master/hello_world.rb)
dans ce tutoriel. Vous pouvez évidemment adapter cela en fonction de votre
projet personnel.

**Niveau** : débutant.

**Pré-requis** : un compte GitHub.

## Sommaire
- [Création du compte](#création-du-compte)
- [Ajout d'un projet](#ajout-dun-projet)
- [Configuration du CI](#configuration-du-ci)
- [Ressources](#ressources)

## Création du compte

1. Allez sur l'url https://circleci.com/signup/ et connectez-vous avec
votre compte GitHub:

   <p align="center">
     <img width="467" alt="Screenshot 2019-09-27 at 12 20 53"
     src="https://user-images.githubusercontent.com/548778/65763905-abdd7380-e124-11e9-9179-5fa1aad28fd7.png">
   </p>

2. Dans la fenêtre de permission pour ajouter l'application Circle CI et validez
l'installation :

   <p align="center">
     <img width="609" alt="Screenshot 2019-09-27 at 12 44 15"
     src="https://user-images.githubusercontent.com/548778/65763963-cb749c00-e124-11e9-9635-33d962f5b493.png">
   </p>

## Ajout d'un projet

> Pour permettre à Circle CI de se lancer régulièrement en fonction de
nouveaux commits sur votre projet, il faut paramétrer une connexion entre
Circle CI et votre dépôt Git sur GitHub.

Par défaut, après votre inscription, Circle CI vous propose d'ajouter un projet.
Choisissez votre dépôt Git et cliquez sur `Follow` :

<p align="center">
  <img width="1360" alt="Screenshot 2019-09-27 at 12 48 08"
  src="https://user-images.githubusercontent.com/548778/65764300-93ba2400-e125-11e9-9984-4a4132934676.png">
</p>

Pour l'instant, comme aucune configuration n'est en place sur votre projet, le
build sur la branche `master` est en échec :

<p align="center">
  <img width="1370" alt="Screenshot 2019-09-27 at 13 19 39"
  src="https://user-images.githubusercontent.com/548778/65765860-a59dc600-e129-11e9-8179-edad5587adaa.png">
</p>

## Configuration du CI

> La première étape pour mettre en place une intégration continue sur un projet,
  c'est de configurer l'environnement dans lequel les tests vont s'exécuter.
  Contrairement à CodeShip où la configuration de l'environnement se fait via
  une interface web sur le site de CodeShip, la configuration de Circle CI se
  fait directement avec un fichier dans votre projet.

1. Créez une nouvelle branche `add-circle-ci-config` :

   ```
   git co -b add-circle-ci-config origin/master
   ```

2. Circle CI utilise un fichier [YAML](https://en.wikipedia.org/wiki/YAML) pour
   identifier la manière dont vous voulez lancer votre environnement de test et
   vos tests eux-mêmes. Le fichier doit se nommer `config.yml` et être rangé
   dans un dossier `.circleci` à la racine de votre projet. Créez le fichier de
   configuration `.circleci/config.yml` avec les informations suivantes :

   ```yml
   version: 2
   jobs:
     build:
       docker:
         - image: circleci/ruby:2.6.3
       steps:
         - checkout
         - run: echo "Youpi ! On est dans la première étape de l'installation de notre CI :)"
   ```
   - la clé `jobs` liste les différentes actions que vous voulez lancer sur
     votre environnement de tests. Par défaut, le job `build` est lancé sur
     Circle CI.
   - la clé `docker` définit l'environnement dans lequel vos tests sont
     exécutés. Il existe plusieurs [environnements
     possibles](https://circleci.com/docs/2.0/executor-types/).
     Nous utilisons l'environnement Docker dans ce tutoriel pour sa facilité de
     configuration :
     - la clé `image` définit l'utilisation d'un environnement dans lequel
       Ruby est installé.
   - la clé `steps` indique chaque étape de votre `job` :
     - l'étape `checkout` correspond à un raccourci pour indiquer à Circle CI
       qu'il faut récupérer le dernier commit de la branche concernée avec un
       `git checkout`.
     - la clé `run` indique à Circle CI de lancer une commande. Nous lançons
       pour l'instant un simple `echo`, l'idée étant de lancer dans un second
       temps, les tests de votre projet.

3. Ajoutez ce fichier à votre projet et poussez vos modifications :

   ```
   git add .circleci
   git commit -m 'Add Circle CI configuration'
   git push origin add-circle-ci-config
   ```

4. Sur GitHub, lancez la création d'une pull request avec votre nouvelle
   branche :
   <p align="center">
     <img width="1032" alt="Screenshot 2019-09-27 at 13 59 20"
   src="https://user-images.githubusercontent.com/548778/65767796-4347c400-e12f-11e9-8987-07f718c8de81.png">
   </p>

5. Choisissez votre propre dépôt comme base pour la pull request et créez-la :
   <p align="center">
     <img width="1058" alt="Screenshot 2019-09-27 at 13 59 49"
     src="https://user-images.githubusercontent.com/548778/65767866-70947200-e12f-11e9-9ea8-8133c1a99f30.png">
   </p>

6. Sur votre pull request, cliquez sur `Show all checks` dans la section des
   actions de la pull request. Vous pouvez voir qu'une vérification est faite
   avec l'intégration de Circle CI. Cliquez sur `Details` pour voir directement
   ce qu'il se passe sur Circle CI :
   <p align="center">
     <img width="1095" alt="Screenshot 2019-09-27 at 14 04 05"
     src="https://user-images.githubusercontent.com/548778/65768826-5740f500-e132-11e9-96ec-7523d1d4ccdb.png">
   </p>

7. Sur l'interface de Circle CI, vous pouvez voir les différentes étapes de
   votre `job` :
   <p align="center">
     <img width="1358" alt="Screenshot 2019-09-27 at 14 09 38"
     src="https://user-images.githubusercontent.com/548778/65768232-b0a82480-e130-11e9-8d5d-ab82008e6a5f.png">
   </p>

L'environnement de test est prêt. Maintenant, il faut pouvoir lancer les tests !

## Lancement des tests

1. Installez les dépendances nécessaires à votre projet pour lancer les tests.
   Pour cela, mettez à jour la commande de la clé `run` dans votre fichier de
   configuration. Remplacez le `echo` avec la commande pour installer les
   dépendances dans `.circleci/config.yml` :

   ```diff
   version: 2
   jobs:
     build:
       docker:
         - image: circleci/ruby:2.6.3
       steps:
         - checkout
   -      - run: echo "Youpi ! On est dans la première étape de l'installation de notre CI :)"
   +      - run:
   +          name: Install project dependencies
   +          command: bin/install
   ```
   - la commande `run` peut prendre directement une commande ou un objet
     clé-valeur qui définit la commande et le nom de la commande. Cela permet
     des étapes nommées dans l'interface de Circle CI :

     <p align="center">
       <img width="1338" alt="Screenshot 2019-09-27 at 16 49 31"
       src="https://user-images.githubusercontent.com/548778/65778805-d93b1900-e146-11e9-98ff-3d69116798de.png">
     </p>

2. Ajoutez la commande pour les tests de votre projet :

   ```diff
   version: 2
   jobs:
     build:
       docker:
         - image: circleci/ruby:2.6.3
       steps:
         - checkout
         - run:
             name: Install project dependencies
             command: bin/install
   +      - run:
   +          name: Test the project
   +          command: bundle exec rspec hello_world_spec.rb

Voilà, la configuration de votre intégration continue est prête ! Vous pouvez
ajouter davantage d'étapes et d'options en suivant les autres modules proposés
dans ce dépôt.

## Ressources

- [Circle CI getting started
  introduction](https://circleci.com/docs/2.0/getting-started/)
