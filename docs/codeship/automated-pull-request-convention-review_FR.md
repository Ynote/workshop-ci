# L'automatisation de vos conventions d'écriture avec Danger et CodeShip

**Objectif** : ce tutoriel présente une manière d'automatiser vos conventions
personnelles d'écriture que vous souhaitez mettre en place sur votre projet :
- celles de code : _"Je veux des tests pour chaque fichier de l'application"_,
- celles de format : _"Une pull request ne doit pas être trop longue"_,
- celles de process : _"Une pull request doit toujours comporter une description_.

Cette automatisation permet de déplacer la charge de certains commentaires
récurrents lors des revues sur un script qui se lance à chaque nouveau commit
sur une branche.

**Contexte** : nous allons utiliser un exemple d'application en Node.js servie
avec Express, ainsi que le module [Danger](https://danger.systems/) pour gérer
l'automatisation de vos conventions d'écriture. À la place de l'application
d'exemple vous pouvez utiliser un projet personnel en Node.js.

**Niveau** : intermédiaire.

**Pré-requis** : un projet Node.js sur GitHub avec des tests.

## Sommaire

- [Mise en place d'une intégration continue sur votre
  projet](#mise-en-place-dune-intégration-continue-sur-votre-projet)
- [Utilisation du module Danger](#utilisation-du-module-danger)
- [Ajout de Danger dans votre intégration
  continue](#ajout-de-danger-dans-votre-intégration-continue)
- [Vérification de l'implémentation de
  Danger](#vérification-de-limplémentation-de-danger)
- [Allez plus loin avec Danger](#allez-plus-loin-avec-danger)
  - [Votre process de travail](#votre-process-de-travail)
  - [La revue de code](#la-revue-de-code)
  - [Les conventions de votre code](#les-conventions-de-votre-code)
- [Ressources](#ressources)

## Mise en place d'une intégration continue sur votre projet

1. Si vous travaillez sur votre projet personnel et non sur l'exemple fourni,
   cette étape de fork n'est pas nécessaire. Sinon, allez sur
   https://github.com/Ynote/workshop-express-example et faites un fork de ce
   dépôt Git :
   <p align="center">
     <img width="1064" alt="Screenshot 2019-09-28 at 17 16 12"
     src="https://user-images.githubusercontent.com/548778/65818660-cb9f9500-e213-11e9-8d26-ad1e51945822.png">
   </p>

2. En local, clonez ce dépôt avec l'url fournie sur l'interface de GitHub :
   <p align="center">
     <img width="1054" alt="Screenshot 2019-10-06 at 18 01 13"
     src="https://user-images.githubusercontent.com/548778/66271886-7abb1c80-e863-11e9-9028-2c6cc1603e58.png">
   </p>

   ```sh
   git clone git@github.com:VOTRE-NOM-UTILISATEUR/workshop-express-example.git
   ```

   Assurez-vous d'utiliser un clone en SSH. Cela sera plus facile d'utilisation
   pour la suite.

3. Reprenez le tutoriel sur l'[intégration continue avec
   CodeShip](https://github.com/Ynote/workshop-ci/blob/master/docs/codeship/basic-ci_FR.md)
   et ajoutez CodeShip sur votre projet et configurez-le de la façon suivante :
   - Choisissez le dépôt sur lequel vous voulez travailler,
   - Pour la section `Setup commands`, utilisez la commande : `npm install`,
   - Pour le pipeline de test, ajoutez la commande : `npm test`.

4. En local, faites une modification sur la branche `master` de votre dépôt pour
   vérifier que la configuration des _builds_ sur CodeShip fonctionne bien :
   1. Faites une modification dans le fichier `README.md` avec votre éditeur
      favori :
      <p align="center">
        <img width="562" alt="Screenshot 2019-10-06 at 18 07 04"
        src="https://user-images.githubusercontent.com/548778/66271959-22384f00-e864-11e9-8548-3bf628398472.png">
      </p>
   2. Ajoutez votre modification et poussez-la sur votre dépôt sur GitHub :
      ```sh
      git add README.md
      git commit -m 'Update README :cactus:'
      git push origin master
      ```
   3. Vérifiez sur l'interface CodeShip qu'un _build_ se lance bien sur votre
      branche `master` :
      <p align="center">
        <img width="1440" alt="Screenshot 2019-10-06 at 18 10 47"
        src="https://user-images.githubusercontent.com/548778/66272020-c15d4680-e864-11e9-80b6-8707000a941e.png">
      </p>

## Utilisation du module Danger

> [Danger](https://danger.systems/js/) est un outil qui s'intègre dans une
  intégration continue et permet d'automatiser certaines tâches récurrentes que
  vous pouvez effectuer lors d'une revue de code. En pratique, l'outil vous
  offre la possibilité d'écrire vos propres règles dans un fichier avec une
  [syntaxe spécifique](https://danger.systems/js/reference.html) et poste
  automatiquement des messages sur vos pull requests à partir du moment où
  l'outil de CI que vous utilisez est [implémenté dans leur
  module](https://danger.systems/js/guides/getting_started.html#setting-up-danger-to-run-on-your-ci).

1. Voici un petit aperçu de ce que Danger peut poster sur vos pull requests :
   <p align="center">
     <img src="https://danger.systems/images/dangerjs-screenshot-2e2a9281.png"
     alt="Présentation de Danger">
   </p>

2. Ajoutez Danger à votre projet en tant que dépendance de développement :
   ```sh
   npm add --save-dev --save-exact danger
   ```
   _L'argument `--save-exact` permets d'avoir une version fixe dans le
   `package.json`. Cela vous assure un build plus déterministe, qui sera
   exactement le même build sur votre environnement local et celui de
   votre intégration continue._

3. Créez un fichier `dangerfile.js` à la racine de votre projet et ajoutez-lui
   la règle suivante qui consiste à écrire un commentaire sur votre pull request
   avec la liste des fichiers modifiés :
   ```js
   import { danger, markdown } from 'danger'

   const modifiedMD = danger.git.modified_files.join("\n- ")
   markdown("Changed Files in this PR: \n- " + modifiedMD)
   ```

   Cet exemple est directement repris de la [documentation de
   Danger](https://danger.systems/js/guides/getting_started.html#creating-a-dangerfile)
   :
   - Vous pouvez voir que l'objet `danger` contient un objet `git` qui lui-même
     a des propriétés qui vous permettent de récupérer des informations
     concernant votre branche Git en cours. D'autres objets sont disponibles et
     expliqués dans la [documentation de
     Danger](https://danger.systems/js/reference.html#the-danger-dsl-root-objects).
   - la fonction `markdown` est fournie directement par Danger et permet de
     poster des commentaires au format Markdown sur les pull requests.

4. Pour appliquer les règles que vous avez établies dans votre `dangerfile.js`,
   vous devez permettre à votre intégration continue de les lancer. Pour cela,
   créez un script npm dans votre fichier `package.json` :
   ```diff
   {
     "name": "workshop-express-example",
     "version": "1.0.0",
     "description": "an simple Express application",
     "main": "index.js",
     "scripts": {
       "start": "node index.js",
   -   "test": "mocha server.test.js"
   +   "test": "mocha server.test.js",
   +   "danger": "danger ci"
     },
     "author": "",
     "license": "ISC",
     "dependencies": {
       "express": "^4.17.1"
     },
     "devDependencies": {
       "mocha": "^6.2.0",
       "supertest": "^4.0.2"
     }
   }
   ```
   - Ce script peut désormais se lancer avec `npm run danger`.
   - En local, cette commande est inutile car l'usage de Danger est uniquement
     restreint aux pull requests.

5. Ajoutez toutes ces modifications sur votre projet et poussez-le sur votre
   dépôt distant sur GitHub :
   ```sh
   git add dangerfile.js package.json package-lock.json
   git commit -m 'Add Danger module to automate code review messages'
   git push origin master
   ```

## Ajout de Danger dans votre intégration continue

> Pour que Danger puisse communiquer avec votre dépôt GitHub, il faut lui
  attribuer un [token d'API unique](https://github.com/settings/tokens).
  Ce token va lui permettre d'utiliser l'[API
  GitHub](https://developer.github.com/) et ainsi lui permettre de poster des
  messages sur vos pull requests ou encore de lancer des actions (comme
  attribuer un label sur vos pull requests).

1. Allez sur https://github.com/settings/tokens/new et créez votre token d'API
   unique que vous allez utiliser pour Danger. Indiquez l'usage que vous allez
   faire de ce token et donnez-lui uniquement le droit `repo` (ainsi que les
   sous-droits associés) :
   <p align="center">
     <img width="1109" alt="Screenshot 2019-10-07 at 17 12 05"
     src="https://user-images.githubusercontent.com/548778/66324465-ca621c80-e925-11e9-90c4-fcd0f07367b8.png">
   </p>

2. Puis, générez ce token :
   <p align="center">
     <img width="1026" alt="Screenshot 2019-10-07 at 14 36 51"
     src="https://user-images.githubusercontent.com/548778/66312231-903a5000-e910-11e9-9185-e3340e7e699d.png">
   </p>

3. Prenez le temps de copier ce token et de le garder quelque part. Nous allons
   l'utiliser pour implémenter Danger dans l'intégration continue avec CodeShip.
   <p align="center">
     <img width="1032" alt="Screenshot 2019-10-07 at 14 37 42"
     src="https://user-images.githubusercontent.com/548778/66312363-ce377400-e910-11e9-93d0-d1bed59e27cf.png">
   </p>

   *Attention, par sécurité, le token est visible uniquement après sa
   génération. Il n'est pas possible de le relire par la suite.* Si vous le
   perdez avant d'avoir configuré CodeShip, il vous faudra en générer un
   nouveau.

4. Allez sur l'interface de CodeShip et cliquez sur l'onglet `Projects`. Puis
   sur votre projet :
   <p align="center">
     <img width="1439" alt="Screenshot 2019-10-07 at 16 56 21"
     src="https://user-images.githubusercontent.com/548778/66323057-7ce4b000-e923-11e9-82ca-6745dc2b65c6.png">
   </p>

5. Puis, cliquez sur le bouton en haut à droite `Project Settings` :
   <p align="center">
     <img width="1440" alt="Screenshot 2019-10-07 at 16 59 00"
     src="https://user-images.githubusercontent.com/548778/66323289-df3db080-e923-11e9-8a65-dc6dda60ffdd.png">
   </p>

6. Cliquez ensuite sur l'onglet `Environment` :
   <p align="center">
     <img width="1440" alt="Screenshot 2019-10-07 at 14 46 55"
     src="https://user-images.githubusercontent.com/548778/66312762-82d19580-e911-11e9-9d61-3caafd89cfd5.png">
   </p>

7. Ici, vous allez ajouter une variable d'environnement qui va permettre, lors
   du lancement du _build_ sur CodeShip, de passer le token d'API que vous avez
   créé pour Danger. Ce dernier sera capable de l'utiliser pour ses appels à
   l'API de GitHub.

   Dans le champ `Key`, indiquez `DANGER_GITHUB_API_TOKEN`. Dans le
   champ `Value`, collez le token que vous avec précédemment généré sur GitHub.
   Puis, cliquez sur l'icône `+` pour ajouter cette variable :
   <p align="center">
     <img width="1440" alt="Screenshot 2019-10-07 at 14 47 25"
     src="https://user-images.githubusercontent.com/548778/66313216-49e5f080-e912-11e9-9627-a42166ffd774.png">
   </p>

8. Puis, enregistrez ces modifications :
   <p align="center">
     <img width="1415" alt="Screenshot 2019-10-07 at 14 55 34"
     src="https://user-images.githubusercontent.com/548778/66313423-9fba9880-e912-11e9-8822-5ce0caec2f9c.png">
   </p>

9. Retournez sur la configuration des tests en cliquant sur l'onglet `Tests` :
   <p align="center">
     <img width="1440" alt="Screenshot 2019-10-07 at 14 58 20"
     src="https://user-images.githubusercontent.com/548778/66313662-03dd5c80-e913-11e9-8912-8c5f0bb6b954.png">
   </p>

10. Dans le pipeline `Test` que vous avez créé précédemment, ajoutez la commande
    `npm run danger` et enregistrez vos modifications :
    <p align="center">
      <img width="1433" alt="Screenshot 2019-10-07 at 15 01 56"
      src="https://user-images.githubusercontent.com/548778/66313935-78b09680-e913-11e9-8c9b-04aaaa04b34f.png">
    </p>

    - Cette commande va se lancer après vos tests. Elle correspond au script
      `danger` que vous avez ajouté dans votre fichier `package.json` et exécute
      la commande `danger ci`.
    - La commande `danger ci` est fournie par le module Danger et permet d'appliquer
      les règles que vous avez établies dans le fichier `dangerfile.js` sur vos
      pull requests.

## Vérification de l'implémentation de Danger

> Maintenant, Danger est implémenté dans votre intégration continue. Nous allons
  créer une pull request en modifiant plusieurs fichiers pour vérifier que
  Danger se lance bien selon la règle que nous avons ajouté dans le fichier
  `dangerfile.js`.

1. En local, créez une nouvelle branche :
   ```sh
   git checkout -b test-danger
   ```

1. Modifiez les fichiers `README.md` et `server.js` avec votre éditeur
   préféré :
   <p align="center">
     <img width="578" alt="Screenshot 2019-10-07 at 15 13 26"
     src="https://user-images.githubusercontent.com/548778/66314896-093ba680-e915-11e9-8b0e-72b2da287ce0.png">
   </p>

2. Ajoutez ces modifications et poussez-les sur votre dépôt distant sur GitHub :
   ```sh
   git add README.md server.js
   git commit -m '[Test] Minor changes to test Danger implementation'
   git push origin test-danger
   ```

3. Retournez sur GitHub et lancez la création d'une nouvelle pull request avec
   votre nouvelle branche :
   <p align="center">
     <img width="1059" alt="Screenshot 2019-10-07 at 15 17 01"
     src="https://user-images.githubusercontent.com/548778/66315216-a1d22680-e915-11e9-906b-f58187c27694.png">
   </p>

4. Choisissez votre propre dépôt comme base pour cette pull request :
   <p align="center">
     <img width="1133" alt="Screenshot 2019-10-07 at 15 18 37 2"
     src="https://user-images.githubusercontent.com/548778/66315325-df36b400-e915-11e9-9d63-500847d7f46e.png">
   </p>

5. Puis, créez la pull request :
   <p align="center">
     <img width="1100" alt="Screenshot 2019-10-07 at 15 20 15"
     src="https://user-images.githubusercontent.com/548778/66315397-02f9fa00-e916-11e9-9ed4-ae4ea96aa532.png">
   </p>

6. Cliquez sur le lien `Details` dans la section des "checks" pour voir si
   l'implémentation de Danger est correctement exécutée dans CodeShip :
   <p align="center">
     <img width="1117" alt="Screenshot 2019-10-07 at 15 20 45"
     src="https://user-images.githubusercontent.com/548778/66316022-296c6500-e917-11e9-8f98-89433b8bce62.png">
   </p>

7. Vous pouvez voir que la commande `npm run danger` a bien été lancée pendant
   le _build_ de la branche correspondante à votre pull request :
   <p align="center">
     <img width="1440" alt="Screenshot 2019-10-07 at 15 29 07"
     src="https://user-images.githubusercontent.com/548778/66316154-6b95a680-e917-11e9-927c-e2d199b462e8.png">
   </p>

8. Retournez sur votre pull request sur GitHub. Vous pouvez voir qu'un nouveau
   commentaire a été posté automatiquement ! Ce commentaire liste les fichiers
   modifiés sur votre pull request en suivant la règle que vous avez écrite dans
   votre fichier `dangerfile.js` :
   <p align="center">
     <img width="1060" alt="Screenshot 2019-10-07 at 17 10 11"
     src="https://user-images.githubusercontent.com/548778/66324273-6c353980-e925-11e9-89ca-cf6618aec849.png">
   </p>

## Allez plus loin avec Danger

Danger est mis en place sur votre intégration continue. Vous pouvez maintenant
personnaliser votre fichier `dangerfile.js` pour y mettre les règles ou les
conventions que vous souhaitez appliquer automatiquement sur votre projet.

Nous vous listons quelques exemples et des idées ci-dessous pour des règles que
vous pourriez appliquer pour améliorer votre intégration continue.

Pour information, Danger est également disponible en
[Ruby](https://danger.systems/ruby/) et en
[Swift](https://danger.systems/swift/).

### Votre process de travail

#### S'assurer que quelqu'un soit assigné sur vos PR

```js
import { danger, warn, fail } from 'danger'

if (!danger.github.pr.assignee) {
  const method = danger.github.pr.title.includes("WIP") ? warn : fail

  method(
    `Cette pull request a besoin que quelqu'un soit assigné dessus.`
  )
}
```

#### Autres idées

- Ajouter automatiquement un label
- S'assurer du format des titres de vos PRs

### La revue de code

#### Encourager l'ajout d'une description sur vos PR

```js
import { danger, warn } from 'danger'

if (danger.github.pr.body.length < 5) {
  warn(
    `La description d'une pull request permet de comprendre le contexte du \
     code produit et facilite la revue de code. Prenez le temps de la \
     détailler davantage`
  )
}
```

#### Encourager des PRs plus courtes

```js
import { danger, warn } from 'danger'

danger.git.linesOfCode().then((length) => {
  if (length > 1) {
    warn(
      `Cette pull request est assez longue à lire. Est-il possible de la
      découper ?`
    )
  }
})
```

### Les conventions de votre code

- [Garder vos lockfiles à jour](https://danger.systems/js/tutorials/dependencies.html#lockfiles)
- [Imposer la mise à jour du CHANGELOG](https://danger.systems/js/tutorials/node-library.html#keeping-on-top-of-your-library)
- S'assurer de la présence de tests pour les fichiers modifiés

## Ressources

- [Getting started with Danger](https://danger.systems/js/guides/getting_started.html)
- [The Dangerfile](https://danger.systems/js/guides/the_dangerfile.html)
- [The Danger Git DSL](https://danger.systems/js/reference.html#GitDSL)
- [The Danger GitHub DSL](https://danger.systems/js/reference.html#GitHubDSL)
- [Node Danger tutorials](https://danger.systems/js/tutorials.html)
- [GitHub personnal access token](https://github.com/settings/tokens)
