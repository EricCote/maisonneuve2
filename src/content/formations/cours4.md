---
title: 'Formation 4'
date: '2023-02-22'
slug: 'cours4'
---


## Une variable ne suffit pas

<Sandpack>

```js
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

```js data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>


`handleClick` modifie une variable locale, `index`. Mais il y a deux problèmes:

1. **Une variable locale ne persiste pas entre les rendus.** Chaque fois qu'on fait un nouveau rendu, toutes les variables locales sont recréées.
2. **Modifier une variable locale ne génèere pas de rendu .** React ne réalise pas qu'il faut générer un nouveau rendu.

## Solution fournie par React

Il faut:

1. **Conserver** les données entre les rendus
2. **Déclencher** la génération d'un nouveau rendu (_re-rendering_)

Le Hook [`useState`](https://beta.reactjs.org/reference/react/useState) fournit ces deux choses.
1. **variable state** Garde les données entre les rendus.
2. **fonction state setter** pour modifier la donnée et générer un rendu.


## Ajouter une variable State

D'abord, il faut ajouter l'importation `useState`

```js
import {useState} from 'react';
```

Et ajouter dans le composant

```js
const [index, setIndex] = useState(0);
```

`index` est une variable d'état, et `setIndex` est la fonction setter.

> La syntaxe `[` et `]` se nomme _décomposition de tableau_ ([array destructuring](https://javascript.info/destructuring-assignment)) Cela permet de lire des valeurs provenant d'un tableau. Le tableau retourné par `useState` a toujours 2 items.

Ils collaborent dans `handleClick`:

```js
function handleClick() {
  setIndex(index + 1);
}
```

Voici le code réparé:


<Sandpack>

```js
import {useState} from 'react';
import {sculptureList} from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
```

```js data.js
export const sculptureList = [
  {
    name: 'Homenaje a la Neurocirugía',
    artist: 'Marta Colvin Andrade',
    description:
      'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
    url: 'https://i.imgur.com/Mx7dA2Y.jpg',
    alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.',
  },
  {
    name: 'Floralis Genérica',
    artist: 'Eduardo Catalano',
    description:
      'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
    url: 'https://i.imgur.com/ZF6s192m.jpg',
    alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.',
  },
  {
    name: 'Eternal Presence',
    artist: 'John Woodrow Wilson',
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: 'https://i.imgur.com/aTtVpES.jpg',
    alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.',
  },
  {
    name: 'Moai',
    artist: 'Unknown Artist',
    description:
      'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
    url: 'https://i.imgur.com/RCwLEoQm.jpg',
    alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.',
  },
  {
    name: 'Blue Nana',
    artist: 'Niki de Saint Phalle',
    description:
      'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
    url: 'https://i.imgur.com/Sd1AgUOm.jpg',
    alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.',
  },
  {
    name: 'Ultimate Form',
    artist: 'Barbara Hepworth',
    description:
      'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
    url: 'https://i.imgur.com/2heNQDcm.jpg',
    alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.',
  },
  {
    name: 'Cavaliere',
    artist: 'Lamidi Olonade Fakeye',
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: 'https://i.imgur.com/wIdGuZwm.png',
    alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.',
  },
  {
    name: 'Big Bellies',
    artist: 'Alina Szapocznikow',
    description:
      'Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.',
    url: 'https://i.imgur.com/AlHTAdDm.jpg',
    alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.',
  },
  {
    name: 'Terracotta Army',
    artist: 'Unknown Artist',
    description:
      'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
    url: 'https://i.imgur.com/HMFmH6m.jpg',
    alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.',
  },
  {
    name: 'Lunar Landscape',
    artist: 'Louise Nevelson',
    description:
      'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
    url: 'https://i.imgur.com/rN7hY6om.jpg',
    alt: 'A black matte sculpture where the individual elements are initially indistinguishable.',
  },
  {
    name: 'Aureole',
    artist: 'Ranjani Shettar',
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: 'https://i.imgur.com/okTpbHhm.jpg',
    alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.',
  },
  {
    name: 'Hippos',
    artist: 'Taipei Zoo',
    description:
      'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
    url: 'https://i.imgur.com/6o5Vuyu.jpg',
    alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.',
  },
];
```

```css
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

---

### useState, votre premier Hook

`useState` n'est pas le seul Hook. Toute fonction démarrant par "`use`" est un Hook.

_Hooks_ sont des fonctions spéciales, disponibles seulement pendant que React fait un [rendu](https://beta.reactjs.org/learn/render-and-commit#step-1-trigger-a-render) Les _hooks_ permettent de se connecter ("hook into") dans les fonctionnalités de React.

"State" est une fonctionalité, mais on en verra d'autres. 

<Pitfall>

**Attention:** les hooks (débutant par `use`) ne peuvent être appelés qu'à partir du "top niveau" de votre composant, ou de votre propres hooks. 

On ne peut **PAS** appeler un hook dans:
- une condition 
- une boucle 
- une fonction imbriquée (gestionnaire d'événements). 

Même si les hooks sont des fonctions, vaut mieux considérer ceux-ci comme des déclarations des besoins de votre composant. On utilise les fonctionalités React au "top niveau" d'un composant, de la même façon qu'on importe les modules au début des fichiers.

</Pitfall>

### Anatomie du `useState`

Quand on appelle [`useState`](https://beta.reactjs.org/reference/react/useState), React stocke la valeur.

```js
const [index, setIndex] = useState(0);
```


> **Convention:** On nomme cette paire: `const [chose, setChose]`. On pourrait nommer différemment, mais la convention aide la compréhension.

L'argument de `useState` est la **valeur initiale** de l'état. (Ici, la valeur 0). 

À chaque rendu, `useState` donne un tableau de 2 valeurs:

1. La **variable d'état** (`index`) qui stocke la valeur.
2. La **fonction state setter** (`setIndex`) pour modifier la valeur de l'état et déclencher un rendu.

Voici en détail:

```js
const [index, setIndex] = useState(0);
```

1. **Au premier rendu**, on passe `0` à `useState`, le hook retourne `[0, setIndex]`. React stocke `0` dans l'état.
2. **On met à jour le state** quand l'usager clique, l'événement appelle `setIndex(index + 1)`. Puisqu'`index` est `0`, cela appelle `setIndex(1)`. React stocke `1` et génère un nouveau rendu. 
3. **Au second rendu** React appelle `useState(0)`, mais React a déjà stocké `1` dans `index`. Donc React retourne `[1, setIndex]`.
4. Ainsi de suite...

---

## Composants avec des états multiples

Un composant peut avoir de multiples variables d'états.  

L'exemple suivant possède deux variables d'état: un nombre `index` et un booléen `showMore`.

You can have as many state variables of as many types as you like in one component. This component has two state variables, a number `index` and a boolean `showMore` that's toggled when you click "Show details":

<Sandpack>

```js
import {useState} from 'react';
import {sculptureList} from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
```

```js data.js
export const sculptureList = [
  {
    name: 'Homenaje a la Neurocirugía',
    artist: 'Marta Colvin Andrade',
    description:
      'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
    url: 'https://i.imgur.com/Mx7dA2Y.jpg',
    alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.',
  },
  {
    name: 'Floralis Genérica',
    artist: 'Eduardo Catalano',
    description:
      'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
    url: 'https://i.imgur.com/ZF6s192m.jpg',
    alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.',
  },
  {
    name: 'Eternal Presence',
    artist: 'John Woodrow Wilson',
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: 'https://i.imgur.com/aTtVpES.jpg',
    alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.',
  },
  {
    name: 'Moai',
    artist: 'Unknown Artist',
    description:
      'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
    url: 'https://i.imgur.com/RCwLEoQm.jpg',
    alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.',
  },
  {
    name: 'Blue Nana',
    artist: 'Niki de Saint Phalle',
    description:
      'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
    url: 'https://i.imgur.com/Sd1AgUOm.jpg',
    alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.',
  },
  {
    name: 'Ultimate Form',
    artist: 'Barbara Hepworth',
    description:
      'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
    url: 'https://i.imgur.com/2heNQDcm.jpg',
    alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.',
  },
  {
    name: 'Cavaliere',
    artist: 'Lamidi Olonade Fakeye',
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: 'https://i.imgur.com/wIdGuZwm.png',
    alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.',
  },
  {
    name: 'Big Bellies',
    artist: 'Alina Szapocznikow',
    description:
      'Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.',
    url: 'https://i.imgur.com/AlHTAdDm.jpg',
    alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.',
  },
  {
    name: 'Terracotta Army',
    artist: 'Unknown Artist',
    description:
      'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
    url: 'https://i.imgur.com/HMFmH6m.jpg',
    alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.',
  },
  {
    name: 'Lunar Landscape',
    artist: 'Louise Nevelson',
    description:
      'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
    url: 'https://i.imgur.com/rN7hY6om.jpg',
    alt: 'A black matte sculpture where the individual elements are initially indistinguishable.',
  },
  {
    name: 'Aureole',
    artist: 'Ranjani Shettar',
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: 'https://i.imgur.com/okTpbHhm.jpg',
    alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.',
  },
  {
    name: 'Hippos',
    artist: 'Taipei Zoo',
    description:
      'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
    url: 'https://i.imgur.com/6o5Vuyu.jpg',
    alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.',
  },
];
```

```css
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

On sépare le state quand les valeurs ne sont pas liées. (C'est le cas ci-haut).

Si les valeurs sont liées ou modifiées ensemble, on préfère les combiner dans un objet. (Ex: un formulaire)


---

## Comment React sait quoi retourner?

Il n'y a pas d'identifiant passé en arguments à `useState`.  Comment sait-il quelle valeur retourner? 

Les hooks se fient sur **un ordre d'appel, qui reste stable** dans un composant donné. C'est grâce à la règle des hooks: il faut les placer au "top niveau" d'un composant.  (Il y a même un [linter](https://www.npmjs.com/package/eslint-plugin-react-hooks) qui permet de détecter les erreurs.) 
 
React utilise un tableau de paires pour chaque composant. Il maintient un index sur l'usage des hooks et l'incrémente à chaque appel de useState. Voir: [React Hooks: Not Magic, Just Arrays.](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

L'exemple suivant n'utilise **PAS** React. Mais il démontre comment fonctionne les hooks.


<Sandpack>

```js index.js active
let componentHooks = [];
let currentHookIndex = 0;

// Démontre le concept de useState (simplifié).
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // Après le premier rendu,
    // La paire d'état existe déjà
    // Il faut incrémenter l'index et retourner la paire
    currentHookIndex++;
    return pair;
  }

  // Quand c'est un premier rendu,
  // On créé la paire d'état et on la stocke. 
  pair = [initialState, setState];

  function setState(nextState) {
    // Quand on modifie l'état,
    // On met la nouvelle valeur dans la paire
    pair[0] = nextState;
    updateDOM();
  }

  // Stockons la paire pour les prochains rendus
  // Et on se prépare pour le prochain appel Hook
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // Each useState() call will get the next pair.
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  // On n'utilise pas React
  // On retourne un objet plutôt que du JSX.
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} by ${sculpture.artist}`,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? 'Hide' : 'Show'} details`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt,
  };
}

function updateDOM() {
  // Reset the current Hook index
  // before rendering the component.
  currentHookIndex = 0;
  let output = Gallery();

  // Update the DOM to match the output.
  // This is the part React does for you.
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = '';
  } else {
    description.style.display = 'none';
  }
}

let nextButton = document.getElementById('nextButton');
let header = document.getElementById('header');
let moreButton = document.getElementById('moreButton');
let description = document.getElementById('description');
let image = document.getElementById('image');
let sculptureList = [
  {
    name: 'Homenaje a la Neurocirugía',
    artist: 'Marta Colvin Andrade',
    description:
      'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
    url: 'https://i.imgur.com/Mx7dA2Y.jpg',
    alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.',
  },
  {
    name: 'Floralis Genérica',
    artist: 'Eduardo Catalano',
    description:
      'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
    url: 'https://i.imgur.com/ZF6s192m.jpg',
    alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.',
  },
  {
    name: 'Eternal Presence',
    artist: 'John Woodrow Wilson',
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: 'https://i.imgur.com/aTtVpES.jpg',
    alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.',
  },
  {
    name: 'Moai',
    artist: 'Unknown Artist',
    description:
      'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
    url: 'https://i.imgur.com/RCwLEoQm.jpg',
    alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.',
  },
  {
    name: 'Blue Nana',
    artist: 'Niki de Saint Phalle',
    description:
      'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
    url: 'https://i.imgur.com/Sd1AgUOm.jpg',
    alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.',
  },
  {
    name: 'Ultimate Form',
    artist: 'Barbara Hepworth',
    description:
      'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
    url: 'https://i.imgur.com/2heNQDcm.jpg',
    alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.',
  },
  {
    name: 'Cavaliere',
    artist: 'Lamidi Olonade Fakeye',
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: 'https://i.imgur.com/wIdGuZwm.png',
    alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.',
  },
  {
    name: 'Big Bellies',
    artist: 'Alina Szapocznikow',
    description:
      'Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.',
    url: 'https://i.imgur.com/AlHTAdDm.jpg',
    alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.',
  },
  {
    name: 'Terracotta Army',
    artist: 'Unknown Artist',
    description:
      'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
    url: 'https://i.imgur.com/HMFmH6m.jpg',
    alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.',
  },
  {
    name: 'Lunar Landscape',
    artist: 'Louise Nevelson',
    description:
      'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
    url: 'https://i.imgur.com/rN7hY6om.jpg',
    alt: 'A black matte sculpture where the individual elements are initially indistinguishable.',
  },
  {
    name: 'Aureole',
    artist: 'Ranjani Shettar',
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: 'https://i.imgur.com/okTpbHhm.jpg',
    alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.',
  },
  {
    name: 'Hippos',
    artist: 'Taipei Zoo',
    description:
      'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
    url: 'https://i.imgur.com/6o5Vuyu.jpg',
    alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.',
  },
];

// Make UI match the initial state.
updateDOM();
```

```html public/index.html
<button id="nextButton">Next</button>
<h3 id="header"></h3>
<button id="moreButton"></button>
<p id="description"></p>
<img id="image" />

<style>
  * {
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    margin: 20px;
    padding: 0;
  }
  button {
    display: block;
    margin-bottom: 10px;
  }
</style>
```

```css
button {
  display: block;
  margin-bottom: 10px;
}
```

</Sandpack>

---


## L'état est isolé et privé

L'état est local à l'instance du composant. **Si vous affichez deux fois le même composant, chacun d'eux aura son propre état isolé.** Changer l'un n'affecte pas l'autre. 

Dans l'exemple suivant, le composant `Gallery` est rendu deux fois.  Les états sont indépendants. 

<Sandpack>

```js
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}
```

```js Gallery.js
import {useState} from 'react';
import {sculptureList} from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <section>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </section>
  );
}
```

```js data.js
export const sculptureList = [
  {
    name: 'Homenaje a la Neurocirugía',
    artist: 'Marta Colvin Andrade',
    description:
      'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
    url: 'https://i.imgur.com/Mx7dA2Y.jpg',
    alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.',
  },
  {
    name: 'Floralis Genérica',
    artist: 'Eduardo Catalano',
    description:
      'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
    url: 'https://i.imgur.com/ZF6s192m.jpg',
    alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.',
  },
  {
    name: 'Eternal Presence',
    artist: 'John Woodrow Wilson',
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: 'https://i.imgur.com/aTtVpES.jpg',
    alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.',
  },
  {
    name: 'Moai',
    artist: 'Unknown Artist',
    description:
      'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
    url: 'https://i.imgur.com/RCwLEoQm.jpg',
    alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.',
  },
  {
    name: 'Blue Nana',
    artist: 'Niki de Saint Phalle',
    description:
      'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
    url: 'https://i.imgur.com/Sd1AgUOm.jpg',
    alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.',
  },
  {
    name: 'Ultimate Form',
    artist: 'Barbara Hepworth',
    description:
      'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
    url: 'https://i.imgur.com/2heNQDcm.jpg',
    alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.',
  },
  {
    name: 'Cavaliere',
    artist: 'Lamidi Olonade Fakeye',
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: 'https://i.imgur.com/wIdGuZwm.png',
    alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.',
  },
  {
    name: 'Big Bellies',
    artist: 'Alina Szapocznikow',
    description:
      'Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.',
    url: 'https://i.imgur.com/AlHTAdDm.jpg',
    alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.',
  },
  {
    name: 'Terracotta Army',
    artist: 'Unknown Artist',
    description:
      'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
    url: 'https://i.imgur.com/HMFmH6m.jpg',
    alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.',
  },
  {
    name: 'Lunar Landscape',
    artist: 'Louise Nevelson',
    description:
      'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
    url: 'https://i.imgur.com/rN7hY6om.jpg',
    alt: 'A black matte sculpture where the individual elements are initially indistinguishable.',
  },
  {
    name: 'Aureole',
    artist: 'Ranjani Shettar',
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: 'https://i.imgur.com/okTpbHhm.jpg',
    alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.',
  },
  {
    name: 'Hippos',
    artist: 'Taipei Zoo',
    description:
      'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
    url: 'https://i.imgur.com/6o5Vuyu.jpg',
    alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.',
  },
];
```

```css
button {
  display: block;
  margin-bottom: 10px;
}
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

L'état n'est lié ni à une fonction, ni à un module. Il est lié à l'instance d'un composant qui affiche sur la page. Quand on affiche deux composants `Gallery`, React gère donc deux states.

Le composant `Page` ne connait rien de l'état de `Gallery`. L'état est complètement privé au composant qui le déclare. Le parent ne peut le changer. On peut ajouter ou enlever de l'état sans affecter le reste des composants.  

Si on veut que les deux galleries partagent leurs états?  La bonne pratique en React, c'est d'enlever l'état aux composants enfants pour le rajouter à leur parent partagé. On couvrira cela plus tard.


---

### Défi 1

Quand on clique "Next" à la dernière image, le code plante. Réparons le code. 2 approches: On ajoute de la logique au gestionnaire d'événments, ou on désactive le bouton quand l'action n'est pas possible. 

Après avoir réparé le code, ajoutez un bouton "previous" pour revenir en arrière. Empêchez que ça plante à la première image. 

<Sandpack>

```js
import {useState} from 'react';
import {sculptureList} from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
```

```js data.js
export const sculptureList = [
  {
    name: 'Homenaje a la Neurocirugía',
    artist: 'Marta Colvin Andrade',
    description:
      'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
    url: 'https://i.imgur.com/Mx7dA2Y.jpg',
    alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.',
  },
  {
    name: 'Floralis Genérica',
    artist: 'Eduardo Catalano',
    description:
      'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
    url: 'https://i.imgur.com/ZF6s192m.jpg',
    alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.',
  },
  {
    name: 'Eternal Presence',
    artist: 'John Woodrow Wilson',
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: 'https://i.imgur.com/aTtVpES.jpg',
    alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.',
  },
  {
    name: 'Moai',
    artist: 'Unknown Artist',
    description:
      'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
    url: 'https://i.imgur.com/RCwLEoQm.jpg',
    alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.',
  },
  {
    name: 'Blue Nana',
    artist: 'Niki de Saint Phalle',
    description:
      'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
    url: 'https://i.imgur.com/Sd1AgUOm.jpg',
    alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.',
  },
  {
    name: 'Ultimate Form',
    artist: 'Barbara Hepworth',
    description:
      'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
    url: 'https://i.imgur.com/2heNQDcm.jpg',
    alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.',
  },
  {
    name: 'Cavaliere',
    artist: 'Lamidi Olonade Fakeye',
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: 'https://i.imgur.com/wIdGuZwm.png',
    alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.',
  },
  {
    name: 'Big Bellies',
    artist: 'Alina Szapocznikow',
    description:
      'Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.',
    url: 'https://i.imgur.com/AlHTAdDm.jpg',
    alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.',
  },
  {
    name: 'Terracotta Army',
    artist: 'Unknown Artist',
    description:
      'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
    url: 'https://i.imgur.com/HMFmH6m.jpg',
    alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.',
  },
  {
    name: 'Lunar Landscape',
    artist: 'Louise Nevelson',
    description:
      'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
    url: 'https://i.imgur.com/rN7hY6om.jpg',
    alt: 'A black matte sculpture where the individual elements are initially indistinguishable.',
  },
  {
    name: 'Aureole',
    artist: 'Ranjani Shettar',
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: 'https://i.imgur.com/okTpbHhm.jpg',
    alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.',
  },
  {
    name: 'Hippos',
    artist: 'Taipei Zoo',
    description:
      'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
    url: 'https://i.imgur.com/6o5Vuyu.jpg',
    alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.',
  },
];
```

```css
button {
  display: block;
  margin-bottom: 10px;
}
.Page > * {
  float: left;
  width: 50%;
  padding: 10px;
}
h2 {
  margin-top: 10px;
  margin-bottom: 0;
}
h3 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 100%;
}
img {
  width: 120px;
  height: 120px;
}
```

</Sandpack>


---

### Défi 2

Quand on tape dans les champs de saisie, rien n'apparait. Le valeurs sont "bloquées" avec des strings vides. La valeur `value` du premier `<input>` est liée à `firstName`.  La valeur du second `<input>` est liée à `lastName`. Les deux entrées ont le gestionnaire d'événements `onChange`, qui modifie les variables d'après le champ de saisie (`e.target.value`). Par contre, les variables ne se rappellent pas de leur valeurs entre les rendus. Il faudrait reprogrammer en utilisant des variables d'état. 

<Sandpack>

```js
export default function Form() {
  let firstName = '';
  let lastName = '';

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = '';
    lastName = '';
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>
        Hi, {firstName} {lastName}
      </h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```css
h1 {
  margin-top: 10px;
}
```

</Sandpack>


---

### Défi 3

Ce formulaire permet aux usagers de laisser du feedback. Quand on soumet du feedback, on devrait afficher "Merci".  Mais cela plante avec le message d'erreur: "Rendered fewer hooks than expected". Il faut réparer l'erreur

<Hint>

D'où peut-on appeler un hook? Ce composant brise-t-il une règle? Y a-t-il un commentaire qui désactive les validations du linter?

</Hint>

<Sandpack>

```js
import {useState} from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    // eslint-disable-next-line
    const [message, setMessage] = useState('');
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Sending: "${message}"`);
          setIsSent(true);
        }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
```

</Sandpack>

--- 
## Rendu et commit

React gère un cycle pour afficher des données.  Voici ce cycle:

1. **Lancer un déclencheur** qui provoque un rendu
2. **Génèrer le rendu** du composant
3. **Écrire le commit** vers le DOM

---

## Étape 1: Lancer un déclencheur

Il y a deux raisons pour qu'un composant soit rendu.

1. C'est le **rendu initial** du composant
2. **L'état est modifié** sur le composant (ou l'un des parents).

### Rendu initial

Quand l'application démarre, il faut déclencher le rendu initial. Certaines boîtes à outils cachent ce code. Quand ce code n'est pas caché, on appelle `createRoot` sur l'élément du DOM, et on appelle la méthode `render`.

<Sandpack>

```js index.js active
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

```js Image.js
export default function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

</Sandpack>

**NOTE:** Commentez `root.render()` et le composant disparait.

### Re-rendus déclenchés par une modification de l'état

Après le rendu initial, on peut déclencher des rendus additionnels en modifiant l'état avec `setState`. Modifier l'état va placer un re-rendu dans la file. On peut ajouter plusieurs rendus additionnels dans la file. 

---
## Étape 2: On génère un Rendu du composant

Après le déclenchement du rendu, React appelle vos composants pour déterminer quoi afficher. . **"Faire un rendu", c'est React qui appelle vos composants.**

* **Au rendu initial** React appelle le composant racine.
* **Pour les rendus suivants** React appelle le composant ayant le state modifié. 

C'est un processus recursif. Si le composant retourne d'autres composants, ils seront aussi appelés, ainsi que leurs enfants et ainsi de suite. Le processus continue jusqu'à ce que tous les sous-composants soient rendus, et que React sache exactement quoi afficher sur l'écran. 

Dans l'exemple qui suit, React appelle `Gallery()` et  `Image()` plusieurs fois:

<Sandpack>

```js Gallery.js active
export default function Gallery() {
  return (
    <section>
      <h1>Inspiring Sculptures</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

```js index.js
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

* **Pendant le rendu initial** React devra [créer des noeuds (node) du DOM](https://developer.mozilla.org/docs/Web/API/Document/createElement) pour `<section>`, `<h1>`, et trois balises `<img>`. 
* **Pendant le re-rendu,** React déterminera quelles propriétés ont changé, si c'est le cas.  C'est ce que l'on appellait la "comparaison du **DOM Virtuel**". La nouvelle documentation ne discute plus du DOM virtuel.

<Pitfall>

Le rendu doit toujours être une [fonction pure](https://beta.reactjs.org/learn/keeping-components-pure):

* **'Mêmes entrées, mêmes sorties'** Avec les même entrées et paramètres, le composant retourne le même JSX
* **On ne touche à rien à l'extérieur du composant** On ne doit modifier ni objets, ni variables existantes. 

Si on oublie ces pricipes, on pourrait rencontrer des bogues difficiles à détecter. Quand on développe en "Strict Mode", React appelle chaque fonction 2 fois au rendu initial. Ceci aide à détecter les fonctions impures. 

</Pitfall>

---

<DeepDive>
#### Optimiser la performance

Le comportement par défaut, de faire un re-rendu du composant et de tous ses sous-composants, n'est pas ce qu'il y a de plus performant.  Il existe donc des stratégies pour optimiser la performane. Voir la documentation sur createMemo. 

**Note:** Evitez l'optimisation prématurée

</DeepDive>

---

## Étape 3: React écrit le commit vers le DOM

Après le rendu (l'appel) des composants, React modifie le DOM.


* **Pour le rendu initial** React appelle [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) pour ajouter les noeuds DOM. 
* **Pour les rendus suivants** React applique les modifications minimales (comparées pendant le rendu) pour que le DOM corresponde au dernier rendu généré. 

**React modifie le DOM que pour les éléments modifiés** Par exemple, dans l'exemple suivant, le composant génèere un re-rendu avec de nouvelles props à chaque seconde. On peut ajouter du texte au `<input>`, modifier la `value`, et le texte ne disparait pas au moment du re-rendu:

<Sandpack>

```js Clock.js active
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  return (
    <Clock time={time.toLocaleTimeString()} />
  );
}
```

</Sandpack>

Durant la dernière étape, React ne modifie que le contenu `<h1>` avec la nouvelle heure. `<input>` apparait à chaque nouveau re-rendu, mais sans modification. Donc React ne touche pas à `<input>`.

---

## Epilogue: Browser paint 

Après la génération du rendu et la modification du commit vers le DOM, le navigateur pourra enfin afficher le résultat. Les navigateurs appellent ce processus le "browser rendering".  Pour éviter la confusion, la documentation React appelle cela "browser painting". 

---

## En résumé

* Voici les trois étapes d'affichage sur React
  1. Déclencheur (Trigger) 
  2. Rendu (Render)
  3. Écriture du DOM (Commit)
* You can use Strict Mode to find mistakes in your components
* React does not touch the DOM if the rendering result is the same as last time


---

## Modifier l'état déclenche un rendu

...

---

## Devoir 4

Générer des composants React qui devrait avoir ces caractéristiques:

Un composant parent nommé "Compteur" qui gère un état nommé "compte". Ce composant aura aussi quelques gestionnaires d'états. 

Ce composant génère des composants enfants. 

- Un "Titre" qui affiche le contenu du compteur dans un `<h1>`.
- Des "Bouton" qui permetent d'incrémenter le contenu du compteur. On affiche 3 de ces boutons:
  - Un "Bouton" qui permet d'incrémenter le contenu par 1.
  - Un "Bouton" qui permet d'incrémenter le contenu par 10.
  - Un "Bouton" qui permet d'incrémenter le contenu par 100.

On veut le bouton affiché 3 fois, avec des props correctement configurés.


**Extra 1:**  Modifier le code du bouton permettre d'ajouter un bouton qui décrémente le contenu de 10. (C'est-à-dire qui incrémente de -10) Gérer le formattage pour que ce bouton affiche d'une couleur différente quand on décrémente, et qui utilie le vocabulaire "incrémente/décrémente" correctement.
 
**Extra 2:** Ajouter un composant nommé "Boite", qui affiche un `<input>` avec le nombre.  Il faudra gérer correctment le gestionnaire d'événement `onChange` pour lire le contenu du input (e.target.value).  Il faudra convertir ce contenu vers un nombre pour modifier correctement l'état. (indice: utiliser parseInt ou (+) unaire.)  


Bonne chance!x
