# Pistes de travail pour améliorer votre intégration continue

## Outils d'intégration continue

D'autres outils à tester.

- [Getting started with Travis](https://docs.travis-ci.com/user/tutorial/)
- [Getting started with
  Jenkins](https://jenkins.io/doc/pipeline/tour/getting-started/)
- [Using GitHub Actions](https://lab.github.com/github/hello-github-actions!)
  (ce tutoriel nécessite de tout d'abord s'enregistrer à
  [GitHub Actions Beta](https://github.com/features/actions/signup/))
- [Getting started with GitLab
  CI/CD](https://docs.gitlab.com/ee/ci/quick_start/README.html)

## Revue de code automatique

Pour ne lancer les tests ou les linters que sur ce qui change dans votre PR
et en faire des messages sur votre Pull-Request, vous pouvez utiliser un outil
comme [Pronto](https://github.com/prontolabs/pronto), voir aussi [Ruby et
GitHub : faire des revues de code automatique avec Pronto et
CircleCI](https://lafabrique.kisskissbankbank.com/faire-des-revues-automatiques-de-code-avec-pronto-et-circleci-76f1f7928dfc)
sur le blog tech et produit de KissKissBankBank.

## Linters

Dans tout code, vous trouverez des conventions d'écriture. [Les
linters](https://blog.nathanaelcherrier.com/fr/linting-good-practices/) servent
à encourager ou forcer des conventions et bonnes pratiques. Il existe des
linters pour multitudes de langages. Par exemple :

- [webhint](https://webhint.io/docs/user-guide/) pour les bonnes pratiques Web
- [ESLint](https://eslint.org/docs/user-guide/getting-started) pour JavaScript
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
  pour tester l'accessibilité via ESLint
- [stylelint](https://stylelint.io/) pour CSS et SCSS
- [RuboCop](https://github.com/rubocop-hq/rubocop) pour Ruby
- [phplint](https://www.npmjs.com/package/phplint) pour PHP
- [pylint](http://pylint.pycqa.org/en/latest/) pour Python
- [proselint](https://github.com/wooorm/alex) pour améliorer sa prose en anglais
- [et bien d'autres encore…](https://github.com/caramelomartins/awesome-linters)

## Tests

En fonction de votre application et des languages utilisés il y a de nombreuses
façon de faire des tests. Ils peuvent être unitaires, fonctionnels, "end to end".

## Couverture de code

Des outils automatisés vous permettent Savoir à quel point les tests couvrent
votre code:

- [simplecov](https://github.com/colszowka/simplecov) en Ruby
- [instanbul.js](https://istanbul.js.org) en JavaScript
- [coverage.py](https://coverage.readthedocs.io/en/v4.5.x/) en Python

Une fois les métriques de couverture générées on pourra générer un rapport et
l'envoyer quelque part via d'autres outils. Un service comme
[Codecov](https://codecov.io) vous permets d'héberger et comparer votre couverture
au fil du temps.

## Tester les changements visuels

Vous pouvez comparer des captures d'écran grâce à différents outils qui testent
les régressions visuelles [Percy](https://percy.io).

## Auditer les dépendances

Un CI peut permettre de s'assurer que les librairies qu'on utilise ne contiennent
pas de failles de sécurité connues en lançant automatiquement un script qui
compare les dépendances avec des listes de soucis de sécurité. Par exemple:

- `npm audit` pour s'assurer qu'on a pas de vulnérabilités dans nos paquets
  JavaScript
- `bundler audit` pour s'assurer qu'on a pas de vulnérabilités dans nos paquets
  Ruby

## Script de déploiement

Une des étapes pour la livraison et le déploiement continu, c'est de disposer
d'un script de déployement. Pour écrire ce script :

- noter toutes les étapes manuelles que vous faites pour déployer (build des
  assets, connexion à votre hébergeur, build de l'application, etc.). En
  fonction de votre stack, ces étapes seront plus ou moins difficiles à
  automatiser.
- Pour chacune des étapes, essayez de trouver une manière de les effectuer avec
  une ligne de commande. Par exemple, la connexion à votre hébergeur peut
  peut-être se faire avec une connexion ssh ou un call API si votre hébergeur
  expose une API pour les utilisateurs.
- Commencez votre script de déploiement avec une première et unique étape (une
  seule ligne de commande). Puis, ajoutez les étapes au fur et à mesure afin
  d'éprouver votre script.
