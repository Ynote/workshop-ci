# Implémentation basique avec Circle CI

**Objectif** : ce tutoriel présente les premières étapes pour mettre en place une intégration
continue avec Circle CI sur un de vos projets. Il vous permettra de créer
l'environnement nécessaire pour lancer un simple `echo` sur Circle CI.

**Niveau** : débutant.

**Pré-requis** :
- Un compte GitHub.

## Table des matières
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
     - l'étape `checkout` correspond à un raccourci pour indiquer à Circle CI
       qu'il faut récupérer le dernier commit de la branche concernée avec un
       `git checkout`.
     - la clé `run` indique à Circle CI de lancer une commande.

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


Voilà, la configuration de votre intégration continue est prête ! Vous pouvez
ajouter davantage d'étapes et d'options en suivant les autres modules proposés
dans ce dépôt.

## Ressources

- [Pull request correspondante à ce
  tutoriel](https://github.com/Ynote/workshop-ci/pull/2)
- [Circle CI getting started
  introduction](https://circleci.com/docs/2.0/getting-started/)
