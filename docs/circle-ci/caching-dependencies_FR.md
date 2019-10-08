# La mise en cache de dépendances sur CircleCI

**Objectif** : ce tutoriel présente comment gérer la mise en cache de données,
principalement celles issues des dépendances de votre projet, afin de permettre
un build plus rapide lors du lancement des tests dans CircleCI.

**Contexte** : nous continuerons à utiliser l'exemple avec le fichier
[`hello_world.rb`](https://github.com/Ynote/workshop-ci/blob/master/hello_world.rb)
dans ce tutoriel. Vous pouvez également adapter cela en fonction de votre
projet personnel.

**Niveau** : intermédiaire.

**Pré-requis** : un projet GitHub avec un fichier de configuration de base pour
CircleCI, comme sur
[ce tutoriel](https://github.com/Ynote/workshop-ci/blob/master/docs/circle-ci/basic-ci_FR.md).

## Sommaire

- [Qu'est-ce que la mise en cache ?](#quest-ce-que-la-mise-en-cache-)
- [Enregistrer des données à mettre en cache pour un job
  donné](#enregistrer-des-données-à-mettre-en-cache-pour-un-job-donné)
- [Récupérer les données mises en cache pour un job
  donné](#récupérer-les-données-mises-en-cache-pour-un-job-donné)
- [Vérifier l'exécution sur CircleCI](#vérifier-lexécution-sur-circleci)
  - [Quand les dépendances nécessaires n'ont pas encore été mise en cache](#quand-les-dépendances-nécessaires-nont-pas-encore-été-mise-en-cache)
  - [Quand les dépendances nécessaires sont déjà mises en
    cache](#quand-les-dépendances-nécessaires-sont-déjà-mises-en-cache)
- [Les points d'attention](#les-points-dattention)
  - [Le choix de la clé de cache](#le-choix-de-la-clé-de-cache)
  - [La mise à jour de votre gestionnaire de dépendances](#la-mise-à-jour-de-votre-gestionnaire-de-dépendances)
- [Ressources](#ressources)

## Qu'est-ce que la mise en cache ?

La mise en cache de données permet de ne pas télécharger à nouveau des données
qui ont déjà été téléchargées auparavant. Avant de se lancer dans la configuration
pour CircleCI, il est important de comprendre la notion de "clé de cache". Une
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
  sont possibles avec CircleCI. Nous allons utiliser celle du `checksum`.

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
   des dossiers dans lesquels vos gestionnaires de dépendances installent par
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
   - la clé `save_cache` indique à CircleCI qu'il faut générer un cache pour
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

> Pour que la mise en cache des dépendances ait une utilité, il faut à la fois
  récupérer les données mise en cache auparavant pour ne pas installer les
  dépendances si ces dernières existent déjà.

Récupérez les données mise en cache avant l'installation de vos dépendances :

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
+      - restore_cache:
+          key: bundler-{{ checksum "Gemfile.lock" }}
       - run:
           name: Install project dependencies
           command: bin/install
       - run:
           name: Test the project
           command: bundle exec rspec hello_world_spec.rb
       - save_cache:
           key: bundler-{{ checksum "Gemfile.lock" }}
           paths:
             - vendor/bundle
```

- la clé `restore_cache` indique à CircleCI qu'il faut aller récupérer les
  données mise en cache sous la clé de cache `key`. Ces données seront
  rangées dans les mêmes dossiers indiqués dans `save_cache.paths`.

Optionnel : vous pouvez également indiquer au gestionnaire de dépendances Bundler de ne lancer l'installation que si ses dépendances ne sont pas vérifiées. Dans `bin/install`, ajoutez la commande `bundle check` qui permet de faire cette vérification :

```diff
-bundle install
+bundle check || bundle install
```

## Vérifier l'exécution sur CircleCI

### Quand les dépendances nécessaires n'ont pas encore été mise en cache

1. Si une clé de cache correspondante aux dépendances nécessaires n'existe pas,
   l'outil ne récupère aucune donnée:

   <p align="center">
     <img width="1328" alt="Screenshot 2019-09-27 at 18 45 47"
     src="https://user-images.githubusercontent.com/548778/65786606-4a82c800-e157-11e9-8a95-9935138e88eb.png">
   </p>

2. Les dépendances n'étant pas installées, le gestionnaire de dépendances va
   installer toutes les librairies nécessaires à votre projet :

   <p align="center">
     <img width="1320" alt="Screenshot 2019-09-27 at 18 46 06"
     src="https://user-images.githubusercontent.com/548778/65786767-a2213380-e157-11e9-9289-7df018b44d84.png">
   </p>

3. Les dépendances installées n'ayant jamais été mises en cache auparavant,
   l'outil va enclencher la sauvegarde de ces données :

   <p align="center">
     <img width="1331" alt="Screenshot 2019-09-27 at 18 46 15"
     src="https://user-images.githubusercontent.com/548778/65786819-c9780080-e157-11e9-9c53-51b7b8969742.png">
   </p>

### Quand les dépendances nécessaires sont déjà mises en cache

1. Si une clé de cache existe pour les dépendances fixées dans le
   `Gemfile.lock`, l'outil va récupérer ces données et les ranger dans les
   dossiers adéquats :

   <p align="center">
     <img width="1331" alt="Screenshot 2019-09-27 at 18 28 59"
     src="https://user-images.githubusercontent.com/548778/65785748-671e0080-e155-11e9-8421-297dc4524532.png">
   </p>

2. Comme les dépendances ont été récupérées, seule l'installation du
   gestionnaire de dépendance Bundler va être lancée. Le reste des dépendances
   est déjà prêt :

   <p align="center">
     <img width="1335" alt="Screenshot 2019-09-27 at 18 30 55"
     src="https://user-images.githubusercontent.com/548778/65786001-fd522680-e155-11e9-83bc-180a8b912234.png">
   </p>

3. Les dépendances nécessaires étant déjà mises en cache, la sauvegarde des
   données en cache n'a pas d'utilité :

   <p align="center">
     <img width="1331" alt="Screenshot 2019-09-27 at 18 31 57"
     src="https://user-images.githubusercontent.com/548778/65786112-368a9680-e156-11e9-990a-300a1bee8246.png">
   </p>

## Les points d'attention

La mise en cache peut permettre une meilleure performance de votre intégration
continue. Néanmoins, il faut prendre en compte les effets de bord possibles.

### Le choix de la clé de cache

Comme expliqué précedemment, il existe plusieurs stratégies possibles pour créer
votre clé de cache. Dans notre tutoriel, nous avons utilisé le `checksum`. Mais
il est également possible d'utiliser [le nom de la branche courante ou encore le
numéro de révision du build en
cours](https://circleci.com/docs/2.0/caching/#using-keys-and-templates).

Il faut être prudent dans l'usage de toutes les stratégies possibles. Si votre
cache n'expire jamais (sauf au bout du mois par défaut), si vos dépendances
ne sont pas mises à jour alors qu'elles le devraient, il est fortement possible
que votre clé de cache ne prenne pas en compte toutes les informations
nécessaires à son expiration.

Pensez toujours à vérifier que votre clé de cache contient des données relatives
au contenu mis en cache.

### La mise à jour de votre gestionnaire de dépendances

Lorsque vous mettez à jour votre gestionnaire de dépendances, cela peut impacter
les dépendances qui sont installées avec. Pensez à associer une donnée
permettant de versionner votre clé de cache (ex : `v1` ou `bundler-1.17.2`).

## Ressources

- [Caching Dependencies with CircleCI](https://circleci.com/docs/2.0/caching/)
- [CircleCI reference: `save_cache`](https://circleci.com/docs/2.0/configuration-reference/#save_cache)
- [CircleCI reference: `restore_cache`](https://circleci.com/docs/2.0/configuration-reference/#restore_cache)
