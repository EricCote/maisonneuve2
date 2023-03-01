---
title: 'Formation 3'
date: '2023-02-22'
slug: 'cours3'
---


## Répondre aux événements

Voici un bouton qui ne fait rien:

```js
export default function Button() {
  return <button>Je ne fais rien</button>;
}
```

1. Pour gérer le click, on déclare une fonction `handleClick`.
2. On implémente la logique dans cette fonction (afficher un message avec `alert`)
3. On ajoute `onClick={handleClick}` au `<button>`

```js
export default function Button() {
  function handleClick() {
    alert('On a cliqué!');
  }

  return <button onClick={handleClick}>Cliquez-moi</button>;
}
```

Note: on a passé une fonction dans les props.

`handleClick` est un **gestionnaire d'événements** (event handler)

Les gestionnaires d'événements sont:

- Définis dans nos composants.
- Par convention, ils ont un nom qui débute par `handle`

Par exemple: `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}`

## À la volée

Alternative: on peut définir un gestionnaire d'événements à la volée, directement dans le JSX.

```js
<button onClick={function handleClick() {
  alert('On a cliqué!');
}}>
```

On préfère souvent la syntaxe flèche, plus simple.

```js
<button onClick={() => {
  alert('On a cliqué!');
}}>
```

Cette méthode à la volée est souvent utilisée pour les fonctions courtes.

## Passage

Les fonctions doivent être passées, pas appelées:

| passer une fonction (correct)    | appeler une fonction (incorrect)   |
| -------------------------------- | ---------------------------------- |
| `<button onClick={handleClick}>` | `<button onClick={handleClick()}>` |

Même souci pour le code à la volée

| passer une fonction (correct)           | appeler une fonction (incorrect)  |
| --------------------------------------- | --------------------------------- |
| `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>` |

Si on se trompe, et on fait un appel plutôt que de passer, alors le code exécute au moment du rendu plutôt qu'au moment de l'événement.

`<button onClick={handleClick}>` passe la fonction `handleClick`.

`<button onClick={() => alert('...')}>` passe la fonction `() => alert('...')`.

## Lire des props dans le gestionnaire d'événements

Parce que les gestionnaires d'événements sont souvent définis dans la composante englobante, ils ont
accès aux props et toutes les variables du composant.

<Sandpack>

```js
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Je joue le film!">
        Jouer Film
      </AlertButton>
      <AlertButton message="Je télécharge!">
        Téléchager Image
      </AlertButton>
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>


---

## Passer le gestionnaire d'événements dans les props

Il est possible de passer un gestionnaire d'événements dans les props

<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Je joue ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Jouer "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Je télécharge image')}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="SpiderMan 2" />
      <UploadButton />
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>



---

## Nommer les props de gestionnaire d'événements

Par convention, vos gestionnaires d'événements commencent par `on`. ex: `onClick`.

Dans cet exemple, on utilise onSmash:

<Sandpack>

```js
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('Je joue film!')}>
        Jouer film
      </Button>
      <Button onSmash={() => alert('Je télécharge!')}>
        Télécharger image
      </Button>
    </div>
  );
}

```

```css
button { margin-right: 10px; }
```

</Sandpack>

---

## Propagation d'événements

Un événement peut se gérer à différents niveaux.  

Devinez l'ordre des événements de l'exemple suivant:

<Sandpack>

```js
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('On a cliqué sur la barre!');
    }}>
      <button onClick={() => alert('Je joue!')}>
        Jouer film
      </button>
      <button onClick={() => alert('Je télécharge!')}>
        Télécharger Image
      </button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>

Les événements se propagent du gestionnaire le plus spécifique au gestionnaire parent. 

**Exception:** l'événement onScroll ne se propage pas. 

---

## Interrompre la propagation

Les gestionnaires d'événements reçoivent un **event object** nommé `e` par convention (e pour "event").

Une méthode nommée `e.stopPropagation()` permet de stopper la propagation vers le parent. 


<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('On a cliqué sur la barre!');
    }}>
      <Button onClick={() => alert('Je joue!')}>
        Jouer film
      </Button>
      <Button onClick={() => alert('Je télécharge!')}>
        Télécharger Image
      </Button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>

---

## Événements en capture plutôt qu'en propagation. 

Il existe deux facons de s'attacher avec le gestionnaires d'événement:
1. En **capture**, du parent plus générique vers l'enfant plus spécifique (on descend)
2. En **propagation**,  de l'enfant plus spécifique vers le parent plus générique (on remonte)


Normalement, on gère les événements en mode **propagation**. Mais dans de **rares** situations, on préférera gérer un événement en mode **capture**. 

```js
<div onClickCapture={() => { /* Ceci est géré avant les boutons */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

---

### Passer des gestionnaires plutôt que de propager 
Ce gestionnaire roule du code _et ensuite _ appelle la prop `onClick` passée par le parent:

```js {4,5}
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

On pourrait donc rouler notre code avant d'appeler le gestionnaire `onClick`. Ce patron est une **alternative** à la propagation. Ce n'est pas automatique, comme la propagation. C'est plus clair quel code est appelé et dans quel ordre.


## Prévenir le comportement par défaut

Certains événements du naviagateur sont associés à un comportement. Un `submit`sur un `<Form>` (déclenché par un click d'un bouton), provoque un "reload" de la page. 
<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={() => alert('On envoie!')}>
      <input />
      <button>Envoyer</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

Utiliser `e.preventDefault()` empêche le déclenchement du comportement. 

<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('On envoie!');
    }}>
      <input />
      <button>Envoyer</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

Ne pas confondre `e.stopPropagation()` and `e.preventDefault()`. 

* [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) empêche les gestionnaire d'événements parents de se déclencher
* [`e.preventDefault()` ](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) empêche le comportement par défaut de se déclencher. (Pour les quelques composants qui ont un compotement par défaut.)


---

## Gestionnaire d'événements et Effets de bord

On peut mettre des effets de bord dans un gestionnaire d'événement. 

En fait, c'est la **meilleure place**, car un gestionnaire n'a pas besoin d'être pur (comme dans le rendu.)

---

### Défi #1

Cliquer le bouton devrait basculer le fond entre blanc et noir. Ça ne fonctionne pas.  Réparez le problème (Ne modifiez pas `handleClick`, son code est correct.)

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick()}>
      Basculez la lumière
    </button>
  );
}
```

</Sandpack>


---

### Défi #2

Le composant `ColorSwitch` génère un bouton qui doit changer la couleur de page. Il faut attacher le gestionnaire d'événements `onChangeColor` à l'événement `onClick` du bouton.

Après le succès, on remarque que le bouton incrémente aussi le compteur de page. Que faudrait-il faire pour que `onChangeColor` ne puisse plus incrémenter le compteur?

<Sandpack>

```js ColorSwitch.js active
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button>
      Changer couleur
    </button>
  );
}
```

```js App.js hidden
import { useState } from 'react';
import ColorSwitch from './ColorSwitch.js';

export default function App() {
  const [clicks, setClicks] = useState(0);

  function handleClickOutside() {
    setClicks(c => c + 1);
  }

  function getRandomLightColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleChangeColor() {
    let bodyStyle = document.body.style;
    bodyStyle.backgroundColor = getRandomLightColor();
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={handleClickOutside}>
      <ColorSwitch onChangeColor={handleChangeColor} />
      <br />
      <br />
      <h2>Nombre de clics sur la page: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>



---

## Devoir 3

Pour ce devoir, vous devez compléter le code du composant YouTube.

Voici une référence des [paramètres](https://developers.google.com/youtube/player_parameters?hl=fr).
Vous pouvez améliorer l'expérience.

Le résultat final désiré ressemblerait à ceci:

```js
<iframe
  type='text/html'
  width={480}
  height={270}
  src='https://www.youtube.com/embed/M7lc1UVf-VE'
  title='Vidéo YouTube'
  frameBorder={0}
  allowFullscreen
/>
```

Voici le code avec lequel vous allez démarrer:

```js
const videos = [
  {
    id: 'Tn6-PIqc4UM',
    name: 'React in 100 seconds',
  },
  {
    id: '8pDqJVdNa44',
    name: 'React.js: The Documentary',
  },
  {
    id: 'kvkAoCbTM3Q',
    name: 'Stop Using Create React App',
  },
];

export default function App() {
  return <ListerVideos videos={videos} />;
}

function ListerVideos({ videos }) {
  return (
    <>
      <h1>Liste de vidéos</h1>
      {videos.map((video) => (
        <YouTube key={video.id} id={video.id} width={368} height={207} />
      ))}
    </>
  );
}

function YouTube({ id, width = 480, height = 270 }) {
  return 'à compléter';
}
```
