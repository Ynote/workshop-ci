# Atelier sur l'intégration continue

> This project contains all the documentation needed for a basic workshop on CI
implementation on a project versionned with Git. As this workshop is created for
[Paris Web](https://www.paris-web.fr/) 2019, all the content will be in French.
You are welcome to provide translations of this project.

Ce projet contient toute la documentation nécessaire pour un atelier basique sur
l'implémentation d'une intégration continue sur un projet versionné avec Git.
L'atelier étant préparé dans le cadre de [Paris Web](https://www.paris-web.fr/)
2019, le contenu sera entièrement écrit en français. Toute traduction est la
bienvenue.

Et maintenant, commençons !

## Pré-requis

Pour pouvoir suivre cet atelier en toute tranquilité, il vous faudra :
- avoir une connaissance basique de Git,
- avoir votre propre compte GitHub.

## 1. Exercice commun

### 1.1. Environnement de développement

Afin de comprendre l'implémentation continue sur un projet, nous allons partir
d'un exemple concret qui se trouve sur le présent dépôt Git. Pour pouvoir suivre
les étapes de l'intégration continue, il faut donc d'abord mettre en place un
environnement de développement avec ce projet d'exemple. Ce dernier est écrit en
Ruby, mais il n'est pas nécessaire de connaître ce langage pour pouvoir suivre
cet exercice.

En fonction de votre niveau en "ordinateur" :

- si Ruby est déjà installé sur votre ordinateur ou si vous savez gérer
  l'installation d'un nouveau langage sur votre ordinateur, **[suivez ce
  tutoriel](https://github.com/Ynote/workshop-ci/blob/master/docs/getting-started_FR.md)**
  qui vous permettra de suivre les autres tutoriels de cet atelier directement
  sur votre machine.
- sinon, si vous n'avez pas envie de vous embarasser avec l'installation d'un
  nouveau langage ou que vous n'avez pas cette connaissance, **[suivez ce tutoriel
  pour utiliser l'éditeur de code Codeanywhere en
  ligne](https://github.com/Ynote/workshop-ci/blob/master/docs/codeanywhere-online-IDE-setup_FR.md).**
  Cela vous permettra de suivre les tutoriels de cet atelier directement via une
  interface web.

### 1.2. Implémentation de l'intégration continue

Nous vous proposons de mettre en place tous ensemble une intégration continue sur
ce présent projet avec [CodeShip](https://codeship.com/). Le projet de ce dépôt
contient :

- un simple fichier écrit en Ruby
  [`hello_world.rb`](https://github.com/Ynote/workshop-ci/blob/master/hello_world.rb),
- un fichier de test associé
  [`hello_world_spec.rb`](https://github.com/Ynote/workshop-ci/blob/master/hello_world_spec.rb).

**[Lançons-nous dans ce tutoriel !](/docs/codeship/basic-ci_FR.md)**

## 2. Modules pour aller plus loin

Nous vous proposons de creuser vous-même les problématiques qui vous
intéressent. Choisissez un tutoriel en fonction de votre envie :

- [L'automatisation de vos conventions d'écriture avec CodeShip et
  Danger](https://github.com/Ynote/workshop-ci/blob/master/docs/codeship/automated-pull-request-convention-review_FR.md)
- [Comprendre le déploiement continu avec
  Heroku](https://github.com/Ynote/workshop-ci/blob/master/docs/heroku/continuous-deployment_FR.md)
- [Mettre en place un CI plus avancé avec
  CircleCI](https://github.com/Ynote/workshop-ci/blob/master/docs/circle-ci/basic-ci_FR.md)
- [Mettre en cache les dépendances sur CircleCI pour une meilleure
  performance](https://github.com/Ynote/workshop-ci/blob/master/docs/circle-ci/caching-dependencies_FR.md)

Si vous êtes ultra motivé·e, nous avons listé [des liens et quelques pistes de
travail](https://github.com/Ynote/workshop-ci/blob/master/docs/other-resources_FR.md)
pour vous permettre de continuer à améliorer votre intégration continue.

Note: this workshop is very cool!