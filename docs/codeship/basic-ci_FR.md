# Implémentation basique d'un CI avec Codeship

## Création du compte Codeship

Allez sur l'url https://app.codeship.com/sessions/new et connectez-vous avec
votre compte GitHub:

<p align="center">
  <img width="658" alt="Screenshot 2019-08-11 at 19 00 39"
  src="https://user-images.githubusercontent.com/548778/62837132-1ec18680-bc6c-11e9-84db-4544cde8afc1.png">
</p>

Dans la fenêtre de permission pour ajouter l'application Codeship, renseignez le
dépôt Git que nous venons de forker et validez l'installation :

<p align="center">
  <img width="555" alt="Screenshot 2019-08-11 at 18 53 03"
  src="https://user-images.githubusercontent.com/548778/62837158-7233d480-bc6c-11e9-8a27-64c85e5658bd.png">
</p>

## Ajout d'un projet

Pour ajouter un projet dans Codeship, allez sur l'url
https://app.codeship.com/projects et cliquez sur le bouton `New project` en
haut à droite de votre fenêtre :

<p align="center">
  <img width="358" alt="Screenshot 2019-08-11 at 18 54 37"
  src="https://user-images.githubusercontent.com/548778/62837180-ad360800-bc6c-11e9-8be2-e6bc4a224d72.png">
</p>

Choisissez l'option GitHub comme source de votre projet :

<p align="center">
  <img width="861" alt="Screenshot 2019-08-11 at 19 19 03"
  src="https://user-images.githubusercontent.com/548778/62837194-030ab000-bc6d-11e9-9a7f-e59c1ac3c0ac.png">
</p>

Sélectionnez votre organisation et votre dépôt Git :

<p align="center">
  <img width="854" alt="Screenshot 2019-08-11 at 18 53 46"
  src="https://user-images.githubusercontent.com/548778/62837195-22a1d880-bc6d-11e9-8827-52588f013b5b.png">
</p>

Puis, choisissez l'option de base pour le type de projet :

<p align="center">
  <img width="1002" alt="Screenshot 2019-08-11 at 18 54 53"
  src="https://user-images.githubusercontent.com/548778/62837210-47964b80-bc6d-11e9-9848-846db76a1d45.png">
</p>

## Configuration du CI

Dans l'étape suivante, nous allons configurer le CI.

Par défaut, dans l'offre basique de Codeship, le code est lancé sur [une machine
Ubuntu](https://documentation.codeship.com/general/about/vm-and-infrastructure)
avec plusieurs langages par défaut installés dessus.

- puis, créer un "pipeline" pour lui indiquer les étapes suivantes de notre
  intégration continue.

Dans un premier temps, nous allons indiquer à Codeship quelles commandes sont
nécessaires pour installer les dépendances de notre application. Pour cela, dans
la section `Setup commands`, écrivez :
```
bin/install
```

<p align="center">
  <img width="1414" alt="Screenshot 2019-08-11 at 18 55 21"
src="https://user-images.githubusercontent.com/548778/62837306-5cbfaa00-bc6e-11e9-8e21-7ceca5cfaf25.png">
</p>

Ensuite, nous allons créer un "pipeline". Dans Codeship, un "pipeline" est un
ensemble de commandes qui sont lancés à chaque fois qu'une modification apparait
sur votre dépôt Git (nouvelle branche, nouveau commit, etc.). Pour cela, cliquez
sur le lien `Add pipeline` et donnez un nom à votre "pipeline" :

<p align="center">
  <img width="1422" alt="Screenshot 2019-08-11 at 18 55 41"
  src="https://user-images.githubusercontent.com/548778/62837370-f8e9b100-bc6e-11e9-9c7c-f679f4db2328.png">
</p>

Puis, cliquez sur le lien `Save changes` :

<p align="center">
  <img width="339" alt="Screenshot 2019-08-11 at 18 55 59"
  src="https://user-images.githubusercontent.com/548778/62837384-11f26200-bc6f-11e9-8dcb-562a6a877795.png">
</p>

Un nouveau panneau avec votre "pipeline" a été créé. Dans ce dernier, écrivez la
commande pour lancer les tests sur notre projet :
```
bundle exec rspec hello_world_spec.rb
```

<p align="center">
  <img width="1410" alt="Screenshot 2019-08-11 at 19 37 24"
src="https://user-images.githubusercontent.com/548778/62837422-83caab80-bc6f-11e9-9c7a-b5a993c65de7.png">
</p>

Puis, cliquez sur `Save and go to dashboard` :

<p align="center">
  <img width="350" alt="Screenshot 2019-08-11 at 19 39 34"
  src="https://user-images.githubusercontent.com/548778/62837453-d6a46300-bc6f-11e9-90a2-4888ef1ee174.png">
</p>

Voilà, la configuration de votre intégration continue est prête !










