---
title: 'Installation'
date: '2023-02-03'
---

#### Durée: 15 minutes

<div className='bg-sky-100  rounded-xl p-8 my-8 dark:bg-sky-800 border-solid border-blue-800'>
  
## Installation pour la formation virtuelle

###### 1. Logiciel Teams

Teams est le logiciel utilisé pour la formation virtuelle. Teams est gratuit, disponible sur les tablettes, les téléphones et les PC. Pour installer Teams, visitez le site web de Microsoft.

###### 2. Deux écrans (ou écran ultra-large)

Votre ordinateur a besoin de deux écrans (ou d'un écran ultra-large). Un écran servira pour programmer vos projets en React. L'autre est utilisé pour suivre la rencontre virtuelle et interagir avec l'écran du formateur.

Si vous n'avez pas accès à un second écran, vous pouvez utiliser un second ordinateur portable. Ou une tablette avec un support. Un écran ultra-large séparé en deux fait aussi l'affaire.

###### 3. Écouteurs et environnement propice

Afin d'avoir la meilleure expérience possible, vous aurez besoin de vous installer dans un environnement calme et sans distraction. Vous devez être capable de communiquer et interagir avec le formateur en utilisant des écouteurs ou un micro. Vous devez porter attention à la matière et ne pas consulter votre téléphone ou vos messages. Il y aura des pauses de 10 minutes pour vous permettre de gérer vos messages urgents.

</div>

<div className='bg-indigo-100  rounded-xl  p-8 dark:bg-indigo-800 border-solid border-red-500'>

## Installation sur l'ordinateur

Installez les outils de développement sur votre ordinateur!

Une partie importante de cette formation sera dédiée à créer vos propres applications sur votre équipement. Vous allez coder, déboguer et éxécuter dans un environnement propice à la création. Vous pouvez utiliser _Windows_, _Mac_ ou _Linux_ pour votre développement.

Voici la configuration necessaire:

- Avoir des permissions **Admin Local** sur votre équipement. (Nous allons installer des outils de programmation durant le cours).
- Ayez un ou plusieurs navigateurs installés pour vos tests (_**Chrome**_, _Firefox_, _Safari_, _Edge_, _Opera_, etc.)
- Ayez un éditeur de code installé. Le formateur utilise **Visual Studio Code** (un outil gratuit). Mais vous pouvez utiliser ce qui vous convient:
  - Visual Studio Code
  - Atom
  - WebStorm
  - Sublime
  - PHPStorm
  - Brackets

---

### Installation de git

Écrivez les instructions suivantes dans une ligne de commande (_bash_, _powershell_, _cmd_, etc.)

- Vous devez avoir installé git version 2.36 ou plus. Vérifiez la version avec la commande <br /> `> git --version`
  - Installez une nouvelle version au besoin (http://git-scm.com/downloads).

---

{/* prettier-ignore */}
### Installation de nvm

Pour installer **Node.js**, nous utilisons l'installateur **nvm** (node version manager).

- Validez la version de **nvm** installée
  - Tapez sur la ligne de commande: <br /> `> nvm version` _(pc)_ `$ nvm -v` _(mac)_
    - Il faut v0.39.3 ou plus sur MacOS
    - Il faut 1.1.10 ou plus sur Windows PCs
- Pour mettre à jour ou installer _nvm_

  - D'abord désinstallez toutes les versions de **nvm** et **Node.js**
    - Sur Windows, allez sur **Paramètres**, **Applications** , **Applications et fonctionalités**.
      - Désinstallez **NVM for Windows** et **Node.js** (si elles existent)
    - Sur MacOS, tapez la commande suivante dans le Terminal: <br /> `$ rm -rf $NVM_DIR ~/.npm ~/.bower`

- Pour installer **nvm** sur _Windows_

  - Allez sur https://github.com/coreybutler/nvm-windows/releases/latest
  - Tout en bas de la page, téléchargez **nvm-setup.zip**
  - Installez **nvm** en utilisant l'installateur

- Pour installer **nvm** sur _MacOS_

  - Tapez cette commande dans votre Terminal <br /> `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

- Une fois installé, il est possible que **nvm** ne soit pas immédiatement détecté.
  - Fermez la fenêtre et ouvrez une nouvelle ligne de commande.

---

### Installation de Node.js

Sur Windows, dans une **Invite de commandes** exécutée en tant qu'_administrateur_:

```
nvm install lts
nvm use lts
```

Sur Terminal de _MacOS_:

```
nvm install --lts
nvm use --lts
```

---

### Creation d'une application React

- Sur la ligne de commande, déplacez-vous dans un dossier dans lequel vous allez créer vos projets du cours. (Nous utilisons ici un dossier nommé `Projets`)
- Naviguez vers votre dossier: <br /> `> cd Projets`
- Créez votre application nommée test: <br />`> npm create vite@latest test -- --template react-swc`
  - Notez que la commande possède un double tiret vide (--)
  - Vous aurez un message _Need to install the following packages. Ok to
    proceed?_ Faites _Y_ (ou O) et <kbd>enter</kbd> pour confirmer.
- Naviguez vers le dossier de cette nouvelle app: <br /> `> cd test`
- Installez les outils et les dépendences: <br /> `> npm install`
  - Ces outils et dépendances seront intallées dans le dossier `node_modules`
- Démarrez le serveur web local de développent: <br /> `> npm run dev`
- Démmarrez votre navigateur et chargez `http://localhost:5173/`.
  - Si vous voyez une page web, vous avez réussi votre installation.
- Faites **ctrl-c** pour stopper le serveur web sur la ligne de commande: <kbd>^C</kbd>

</div>
