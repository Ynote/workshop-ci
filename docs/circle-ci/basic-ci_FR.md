# Implémentation basique d'un CI avec Circle CI

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

Dans cette étape, nous allons ajouter un simple fichier de configuration sur
votre projet pour activer le lancement de Circle CI.

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
     - l'étape `checkout` correspond à un raccourci pour indique à Circle CI de
       récupérer le dernier commit de la branche concernée avec un
       `git checkout`.
     - la clé `run` indique à Circle CI de lancer une commande.



