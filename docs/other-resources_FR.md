# Liens et pistes de travail pour améliorer votre intégration continue

## Liens

### Autres outils d'intégration continue

- [Getting started with Travis](https://docs.travis-ci.com/user/tutorial/)
- [Getting started with
  Jenkins](https://jenkins.io/doc/pipeline/tour/getting-started/)
- [Using GitHub Actions](https://lab.github.com/github/hello-github-actions!)
  (ce tutoriel nécessite de tout d'abord s'enregistrer à
  [GitHub Actions Beta](https://github.com/features/actions/signup/))
- [Getting started with GitLab
  CI/CD](https://docs.gitlab.com/ee/ci/quick_start/README.html)

### Revue de code automatique

- [Ruby et GitHub : faire des revues de code automatique avec Pronto et
  CircleCI](https://lafabrique.kisskissbankbank.com/faire-des-revues-automatiques-de-code-avec-pronto-et-circleci-76f1f7928dfc)

## Pistes de travail

### Script de déploiement

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

### Les linters

Dans tout code, vous trouverez des conventions d'écriture. [Les
linters](https://blog.nathanaelcherrier.com/fr/linting-good-practices/) servent
à encourager ces conventions, voire les forcer. Il existe des linters pour
multitudes de langages. Voici une liste non-exhaustive :

- HTML
- CSS
- JavaScript
- Ruby

Cela peut être très utile de les intégrer dans les étapes de votre intégration
continue afin de favoriser une cohérence d'écriture dans votre base de code.

### Les tests end-to-end
