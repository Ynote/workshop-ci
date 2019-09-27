# Utiliser des données persistentes sur Circle CI

**Objectif** : ce tutoriel présente comment gérer la mise en cache de données,
principalement celles issues des dépendances de votre projet, afin de permettre
un build plus rapide lors du lancement des tests dans Circle CI.

**Contexte** : nous continuerons à utiliser l'exemple avec le fichier
[`hello_world`](https://github.com/Ynote/workshop-ci/blob/master/hello_world.rb)
dans ce tutoriel. Vous pouvez évidemment adapter cela en fonction de votre
projet personnel.

**Niveau** : intermédiaire.

**Pré-requis** : un projet GitHub avec un fichier de configuration de base pour
Circle CI.

## Sommaire

- [Qu'est-ce que la mise en cache ?]()
- [Enregistrer des données à mettre en cache pour un job donné]()
- [Récupérer les données mises en cache pour un job donné]()
- [Ressources](#ressources)

## Qu'est-ce que la mise en cache ?

La mise en cache de données permet de ne pas télécharger à nouveau des données
qui ont déjà été téléchargées auparavant. Avant se lancer dans la configuration
pour Circle CI, il est important de comprendre la notion de "clé de cache". Une
clé de cache permet de savoir lorsque des données mise en cache ne sont plus
valides.

Une bonne clé de cache doit donc être un compromis entre :

- la fiabilité des données mise en cache : les données sont-elles à jour ou sur
  la bonne version ?
- la performance : ne pas télécharger à nouveau des données qui ont déjà été
  téléchargées auparavant

## Enregistrer des données à mettre en cache pour un job donné

> Pour pouvoir mettre des données en cache, le point le plus important est donc
  de savoir quelle clé de cache utiliser. [Différentes
  stratégies](https://circleci.com/docs/2.0/caching/#using-keys-and-templates)
  sont possibles avec Circle CI. Nous allons utiliser celle du `checksum`.

1. Mettez à jour les variables d'environnement nécessaires. Pour Ruby, la
   variable `BUNDLE_PATH` permet d'indiquer au gestionnaire de dépendances
   Bundler où installer les dépendances Ruby de votre projet.

   ```diff
   version: 2
   jobs:
     build:
       docker:
         - image: circleci/ruby:2.6.3
   +    environment:
   +      BUNDLE_PATH: vendor/bundle

       steps:
         - checkout
         - run:
             name: Install project dependencies
             command: bin/install
         - run:
             name: Test the project
             command: bundle exec rspec hello_world_spec.rb
   ```

   Note : cette étape n'est pas nécessaire pour tous les langages. Informez-vous
   des dossiers dans lesquels vos gestionnaires dépendances installent par
   défaut les librairies (ex : `node_modules` pour Node). La spécification via
   une variable d'environnement peut être utile dans certains cas ou non.

2. Ajoutez l'enregistrement des données en cache dans votre fichier de
configuration :

   ```diff
   version: 2
   jobs:
     build:
       docker:
         - image: circleci/ruby:2.6.3
       environment:
         BUNDLE_PATH: vendor/bundle

       steps:
         - checkout
         - run:
             name: Install project dependencies
             command: bin/install
         - run:
             name: Test the project
             command: bundle exec rspec hello_world_spec.rb
   +      - save_cache:
   +          key: bundler-{{ checksum "Gemfile.lock" }}
   +          paths:
   +            - vendor/bundle
   ```
   - la clé `save_cache` indique à Circle CI qu'il faut générer un cache pour
     certaines données :
     - la clé `key` représente la clé de cache. Le `checksum`  est un hash
       SHA256 encodé en base64 d'un fichier. Dans notre cas, on utilise le
       fichier `Gemfile.lock` car il contient les versions exactes des
       dépendances installées et permet donc une fiabilité sur les dépendances
       installées dans le dossier `vendor/bundle`. Par défaut, une clé de cache,
       si elle ne change pas, expire au bout d'un mois sur CircleCI.
     - la clé `paths` liste tous les dossiers à mettre en cache sous la clé de
       cache indiquée juste au-dessus.

## Récupérer les données mises en cache pour un job donné

## Ressources

- [Caching Dependencies with CircleCI](https://circleci.com/docs/2.0/caching/)
- [CircleCI reference: `save_cache`](https://circleci.com/docs/2.0/configuration-reference/#save_cache)
- [CircleCI reference: `restore_cache`](https://circleci.com/docs/2.0/configuration-reference/#restore_cache)
