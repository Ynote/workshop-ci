# L'intégration continue avec CodeShip

**Objectif** : ce tutoriel présente les premières étapes pour mettre en place
une intégration continue avec CodeShip sur un de vos projets. Il vous permettra
de créer l'environnement nécessaire pour lancer une suite de tests à chaque
nouveau commit sur une branche nouvelle ou existante de votre projet.

**Niveau** : débutant.

**Pré-requis** : un compte GitHub.

## Sommaire
- [Création du compte CodeShip](#création-du-compte-codeship)
- [Ajout d'un projet](#ajout-dun-projet)
- [Configuration du CI](#configuration-du-ci)
- [Vérification de l'implémentation sur
  CodeShip](#vérification-de-limplémentation-sur-codeship)
- [Ressources](#ressources)

## Création du compte CodeShip

1. Allez sur l'url https://app.codeship.com/sessions/new et connectez-vous avec
votre compte GitHub:

   <p align="center">
     <img width="658" alt="Screenshot 2019-08-11 at 19 00 39"
     src="https://user-images.githubusercontent.com/548778/62837132-1ec18680-bc6c-11e9-84db-4544cde8afc1.png">
   </p>

2. Dans la fenêtre de permission pour ajouter l'application CodeShip, renseignez le
dépôt Git que nous venons de forker et validez l'installation :

   <p align="center">
     <img width="555" alt="Screenshot 2019-08-11 at 18 53 03"
     src="https://user-images.githubusercontent.com/548778/62837158-7233d480-bc6c-11e9-8a27-64c85e5658bd.png">
   </p>

## Ajout d'un projet

> Pour permettre à CodeShip de se lancer régulièrement en fonction de
nouveaux commits sur votre projet, il faut paramétrer une connexion entre
CodeShip et votre dépôt Git sur GitHub.

1. Pour ajouter un projet dans CodeShip, allez sur l'url
https://app.codeship.com/projects et cliquez sur le bouton `New project` en
haut à droite de votre fenêtre :

   <p align="center">
     <img width="358" alt="Screenshot 2019-08-11 at 18 54 37"
     src="https://user-images.githubusercontent.com/548778/62837180-ad360800-bc6c-11e9-8be2-e6bc4a224d72.png">
   </p>

2. Choisissez l'option GitHub comme source de votre projet :

   <p align="center">
     <img width="861" alt="Screenshot 2019-08-11 at 19 19 03"
     src="https://user-images.githubusercontent.com/548778/62837194-030ab000-bc6d-11e9-9a7f-e59c1ac3c0ac.png">
   </p>

3. Sélectionnez votre organisation et votre dépôt Git :

   <p align="center">
     <img width="854" alt="Screenshot 2019-08-11 at 18 53 46"
     src="https://user-images.githubusercontent.com/548778/62837195-22a1d880-bc6d-11e9-8827-52588f013b5b.png">
   </p>

4. Puis, choisissez l'option de base pour le type de projet :

   <p align="center">
     <img width="1002" alt="Screenshot 2019-08-11 at 18 54 53"
     src="https://user-images.githubusercontent.com/548778/62837210-47964b80-bc6d-11e9-9848-846db76a1d45.png">
   </p>

L'offre basique de CodeShip va nous permettre de lancer nos tests sur [une machine
Ubuntu](https://documentation.codeship.com/general/about/vm-and-infrastructure)
avec plusieurs langages par défaut installés dessus.

## Configuration du CI

> L'un des points importants pour mettre en place une intégration continue sur
un projet, c'est d'avoir une suite de tests solides à lancer sur un
environnement donné. Il faut donc pouvoir installer l'environnement que l'on
veut sur CodeShip, ainsi que lancer les tests nécessaires.

1. Dans un premier temps, nous allons indiquer à CodeShip quelles commandes sont
nécessaires pour installer les dépendances de notre application. Pour cela, dans
la section `Setup commands`, écrivez :

   ```
   bin/install
   ```

   <p align="center">
     <img width="1414" alt="Screenshot 2019-08-11 at 18 55 21"
     src="https://user-images.githubusercontent.com/548778/62837306-5cbfaa00-bc6e-11e9-8e21-7ceca5cfaf25.png">
  </p>

2. Ensuite, nous allons créer un "pipeline". Dans CodeShip, un "pipeline" est un
ensemble de commandes qui sont lancés à chaque fois qu'une modification apparait
sur votre dépôt Git (nouvelle branche, nouveau commit, etc.). Pour cela, cliquez
sur le lien `Add pipeline` et donnez un nom à votre "pipeline" :

   <p align="center">
     <img width="1422" alt="Screenshot 2019-08-11 at 18 55 41"
     src="https://user-images.githubusercontent.com/548778/62837370-f8e9b100-bc6e-11e9-9c7c-f679f4db2328.png">
   </p>

3. Puis, cliquez sur le lien `Save changes` :

   <p align="center">
     <img width="339" alt="Screenshot 2019-08-11 at 18 55 59"
     src="https://user-images.githubusercontent.com/548778/62837384-11f26200-bc6f-11e9-8dcb-562a6a877795.png">
   </p>

4. Un nouveau panneau avec votre "pipeline" a été créé. Dans ce dernier, écrivez la
commande pour lancer les tests sur notre projet :

   ```
   bundle exec rspec hello_world_spec.rb
   ```

   <p align="center">
     <img width="1410" alt="Screenshot 2019-08-11 at 19 37 24"
   src="https://user-images.githubusercontent.com/548778/62837422-83caab80-bc6f-11e9-9c7a-b5a993c65de7.png">
   </p>

5. Puis, cliquez sur `Save and go to dashboard` :

   <p align="center">
     <img width="350" alt="Screenshot 2019-08-11 at 19 39 34"
     src="https://user-images.githubusercontent.com/548778/62837453-d6a46300-bc6f-11e9-90a2-4888ef1ee174.png">
   </p>

## Vérification de l'implémentation sur CodeShip

> La configuration de votre intégration continue de base est prête !
>
> Maintenant les développeurs et développeuses peuvent fixer rapidement
> des conflits et les ajouter le plus vite possible sur la base de code
> commune, à savoir la branche `master` dans la plupart des cas.
>
> Pour comprendre son impact direct sur un projet, nous allons créer ensemble une
> pull request, vérifier l'exécution de CodeShip dessus et merger cette pull
> request dans `master`.

1. Créez une nouvelle branche `update-readme` sur votre dépôt :
   ```sh
   git checkout -b update-readme origin/master
   ```

2. Avec votre éditeur préféré, ajoutez une modification sur le fichier
   `README.md` :
   <p align="center">
     <img width="695" alt="Screenshot 2019-10-06 at 16 13 02"
     src="https://user-images.githubusercontent.com/548778/66270456-38d6aa00-e854-11e9-8b09-9e2a19f889ca.png">
   </p>

3. Ajoutez votre modification et poussez-la sur le dépôt distant sur GitHub :
   ```sh
   git add README.md
   git commit -m 'Update README :sunflower:'
   git push origin update-readme
   ```

4. Sur GitHub, lancez la création d'une nouvelle pull request à partir de cette
   nouvelle branche :
   <p align="center">
     <img width="1007" alt="Screenshot 2019-10-06 at 16 22 27"
     src="https://user-images.githubusercontent.com/548778/66270779-91f40d00-e857-11e9-894b-ae8a032de5fa.png">
   </p>

5. Utilisez la branche `master` de votre propre dépôt pour créer cette pull
   request :
   <p align="center">
     <img width="1065" alt="Screenshot 2019-10-06 at 16 36 00"
     src="https://user-images.githubusercontent.com/548778/66270796-b64fe980-e857-11e9-8afb-b82b3822cf98.png">
   </p>

6. Créez votre pull request :
   <p align="center">
     <img width="1044" alt="Screenshot 2019-10-06 at 16 33 42 2"
     src="https://user-images.githubusercontent.com/548778/66270811-ca93e680-e857-11e9-8aeb-433bf24adf08.png">
   </p>

7. Sur votre pull request, vous pouvez voir un nouvel encart qui liste ce que
   GitHub appelle les "checks". Ces "checks" correspondent à toutes les étapes
   de CI que vous allez connecter à votre dépôt. Vous pouvez cliquer sur `Show
   all checks` pour voir le CI CodeShip que vous venez de connecter :
   <p align="center">
     <img width="1050" alt="Screenshot 2019-10-06 at 16 44 46"
     src="https://user-images.githubusercontent.com/548778/66270906-ce743880-e858-11e9-9ec0-fcdaa2931e27.png">
   </p>

8. En cliquant sur le lien `Details`, vous serez redirigé sur CodeShip pour
   accéder au déroulement des différentes étapes que vous avez configuré pour
   votre intégration continue :
   <p align="center">
     <img width="1091" alt="Screenshot 2019-10-06 at 16 44 01"
     src="https://user-images.githubusercontent.com/548778/66270966-3f1b5500-e859-11e9-892a-5cd62bab920f.png">
   </p>

9. Sur CodeShip, l'interface vous liste toutes les commandes lancées pour
   construire votre application et lancer les tests :
   <p align="center">
     <img width="1440" alt="Screenshot 2019-10-06 at 16 18 26"
     src="https://user-images.githubusercontent.com/548778/66270519-0aa59a00-e855-11e9-9cc6-7f9f8abedf93.png">
   </p>

10. Retournez sur votre interface CodeShip et cliquez sur l'onglet `Builds` dans
   le menu. Vous pouvez voir votre _build_ soit en cours d'exécution, soit en
   réussi.
   <p align="center">
     <img width="1432" alt="Screenshot 2019-10-06 at 16 15 54"
     src="https://user-images.githubusercontent.com/548778/66270511-fd88ab00-e854-11e9-96ee-6f36b30ef756.png">
   </p>

   <p align="center">
     <img width="1437" alt="Screenshot 2019-10-06 at 16 19 47"
     src="https://user-images.githubusercontent.com/548778/66270529-2741d200-e855-11e9-9a74-030934ebed6a.png">
   </p>

11. Retournez sur votre pull request sur GitHub. Vous pouvez y voir également
    directement l'état de votre _build_ :
    <p align="center">
      <img width="1087" alt="Screenshot 2019-10-06 at 16 54 25"
      src="https://user-images.githubusercontent.com/548778/66271064-0b8cfa80-e85a-11e9-803f-27be7ac29a2f.png">
    </p>

12. Maintenant que vous êtes assurés que votre pull request n'a pas de conflit
    avec la branche `master` et qu'elle passe bien tous vos tests de façon
    automatique, vous savez que vous pouvez merger votre pull request en toute
    tranquilité. Cliquez sur `Merge pull request` :
    <p align="center">
      <img width="805" alt="Screenshot 2019-10-06 at 16 57 03"
      src="https://user-images.githubusercontent.com/548778/66271096-6f172800-e85a-11e9-9fba-f28c115cd975.png">
    </p>

13. Retournez sur l'interface CodeShip et cliquez sur l'onglet `Builds`. Vous
    pouvez voir qu'un nouveau _build_ s'est lancé sur la branche `master` comme
    vous venez de merger votre pull request :
    <p align="center">
      <img width="1422" alt="Screenshot 2019-10-06 at 16 58 47"
      src="https://user-images.githubusercontent.com/548778/66271138-da60fa00-e85a-11e9-8381-5e81400eb53d.png">
    </p>

Voilà ! Vous avez maintenant une intégration continue sur votre projet. Vous
pouvez l'améliorer en y ajoutant d'autres étapes (linting, convention de code,
etc.), reprendre ce tutoriel pour l'adapter à votre propre projet ou vous
plonger dans les autres modules de ce dépôt pour découvrir d'autres outils ou
creuser davantage les concepts liés à l'intégration continue.

## Ressources :

- [Setting up continuous integration with
  CodeShip](https://documentation.codeship.com/basic/quickstart/getting-started/#setting-up-continuous-integration-with-codeship)
