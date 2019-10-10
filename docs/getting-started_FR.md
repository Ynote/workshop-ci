# Préparer votre environnement de développement

**Objectif** : dans le cadre de l'atelier, vous allez installer un
environnement de développement en local, ainsi qu'un dépôt Git d'exemple pour
pouvoir suivre pas à pas les étape de la création d'un projet en déploiement
continu.

**Contexte** : Si vous êtes à l'aise avec l'installation de langages et la
configuration de votre ordinateur, vous pouvez suivre ces étapes. Sinon,
préférez l'utilisation d'un IDE en ligne en suivant [ce
tutoriel](https://github.com/Ynote/workshop-ci/blob/master/docs/codeanywhere-online-IDE-setup_FR.md).

**Niveau** : avancé.

**Pré-requis** : un compte GitHub.

## Sommaire

- [Installation de l'environnement](#installation-de-lenvironnement)
- [Installation du projet d'exemple](#installation-du-projet-dexemple)
- [Vérification des tests](#vérification-des-tests)

## Installation de l'environnement

Vérifiez si Ruby est installé sur votre ordinateur. Sinon, installez la
version dernière version de Ruby. Une des solutions pour installer Ruby et gérer
facilement ses différentes versions est l'utilisation de
[rbenv](https://github.com/rbenv/rbenv).

**L'idée est de perdre le moins de temps possible sur l'installation. Si vous
constatez que vous rencontrez de réelles difficultés, nous vous invitons à
suivre [ce tutoriel et utiliser l'IDE Codeanywhere en ligne](https://github.com/Ynote/workshop-ci/blob/master/docs/codeanywhere-online-IDE-setup_FR.md).**

## Installation du projet d'exemple

1. Allez sur https://github.com/Ynote/workshop-ci et cliquez sur le bouton `fork`
   pour avoir un fork de ce dépôt Git sur votre compte personnel GitHub :

   <p align="center">
     <img width="1045" alt="Screenshot 2019-09-30 at 18 51 39"
     src="https://user-images.githubusercontent.com/548778/65899324-c7aa7900-e3b3-11e9-9e22-a220db0fd5c2.png">
   </p>

2. En local, dans votre console, clonez ce dépôt en ssh avec l'url fournie sur
   l'interface de GitHub :
   ```sh
   git clone git@github.com:VOTRE-NOM-UTILISATEUR/workshop-ci.git
   ```

   _Assurez-vous d'utiliser un clone en SSH. Cela sera plus facile d'utilisation
   pour la suite._

3. Allez dans le dossier `workshop-ci` et installez les dépendances de ce projet
   :
   ```sh
   cd workshop-ci && bin/install
   ```

## Vérification des tests

Vérifiez que les tests de ce projet se lancent correctement :
```sh
bundle exec rspec hello_world_spec.rb
```

<p align="center">
  <img width="545" alt="Screenshot 2019-10-10 at 19 32 31"
  src="https://user-images.githubusercontent.com/548778/66592197-dc95c200-eb94-11e9-9cfd-b509a91d3add.png">
</p>

Voilà ! Votre environnement de développement est prêt ! Vous allez pouvoir
commencer l'implémentation d'une intégration continue dessus.
