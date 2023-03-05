---
title: 'Formation 4 b'
date: '2023-02-22'
slug: 'cours4b'
---


## React regroupe les modification d'états en lots (batch)

On pourrait s'attendre que cliquer le bouton "+3" incrémente le compteur trois fois à cause des trois appels `setNumber(number + 1)`.
<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Mais chaque rendu est fixé au moment qu'il est généré, donc la valeur `number` demeure `0`, même lorsqu'on appelle `setNumber(1)` plusieurs fois. 

```js
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```

Il y a aussi une autre raison. **React attend que tous les gestionnaires d'événements aient fini de rouler avant de modifier l'état.** 
C'est pourquoi le re-rendu ne s'exécute *qu'après* tous les `setNumber()`;

Similaire à l'expérience au resto: un serveur prend tous les détails de la commande avant de partir à la cuisine. 

S'il n'était pas très futé, il pourrait partir à la cuisine dès que vous commandez de la soupe, et revenir... Et repartir dès que vous commandez un drink, et revenir... ainsi de suite... ça ne serait pas très efficace.

Cette approche permet de modifier plusieurs variables d'états, provenant de plusieurs composants, dans un seul re-rendu. L'Interface Usager ne sera pas mis-à-jour tant qu'on aura pas complété le gestionnaire d'événements.  C'est ce qu'on appelle le regroupement par lot (batching). Cette optimisation améliore les performances. Cela évite les "rendus à moitié",  où seulement certaines variables ont été mises-à-jour. 

**React ne regroupe pas à travers de *multiples* événements intentionnels (comme de multiples clics).**  Chaque clic est géré séparément. React regroupe que là où ça fait du sens. Cela nous assure que si le premier clic désactive le fomulaire, le second clic ne soumettra pas le formulaire une seconde fois.  

## Modifier la variable d'état de multiples fois avant le prochain rendu

C'est un cas rare, mais si vous désirez modifier l'état plusieurs fois avant le prochain rendu, plutôt que de passer une valeur du genre `setNumber(number + 1)`, il faut passer une fonction qui détermine le prochain état basé sur l'état précédent dans la file. `setNumber(n => n + 1)`. Ceci dit à React "d'exécuter le code plus tard". 

Ce code fonctionne:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Ici, `n => n + 1` est une **fonction d'updater.**  Quand on passe cette fonction à un setState():

1. React ajoute cette fonction à la file pour être traité après le gestionnaire d'événements ait terminé.
2. Durant le prochain rendu, React passe à travers la file pour exécuter et retourner l'état modifié.


```js
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

Voici comment React gère ces lignes de code dans le gestionnaire d'événements 
1. `setNumber(n => n + 1)`: `n => n + 1` est une fonction. React l'ajoute à la file. 
1. `setNumber(n => n + 1)`: `n => n + 1` est une fonction. React l'ajoute à la file. 
1. `setNumber(n => n + 1)`: `n => n + 1` est une fonction. React l'ajoute à la file. 

Quand vous appelez `useState` au prochain rendu, React passe à travers la file. L'état précédent `number` étant `0`, React passe cela à la première fonction updater (par le paramètre `n`).  La fonction retourne la nouvelle valeur, qui sera passée à la prochaine fonction, et ainsi de suite.  


| file de fonctions | `n` | retourne |
|--------------|---------|-----|
| `n => n + 1` | `0` | `0 + 1 = 1` |
| `n => n + 1` | `1` | `1 + 1 = 2` |
| `n => n + 1` | `2` | `2 + 1 = 3` |

React stocke `3` comme résultat final et le retourne via le `useState`.

C'est pour cela que l'exemple précédent fonctionne lorsqu'on clique "+3" 

### Si on modifie le state après l'avoir remplacé

Que penser de ce gestionnaire d'événements.

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Voici ce qui se passe:
1. `setNumber(number + 5)`: `number` est `0`, donc `setNumber(0 + 5)`. React ajoute *"replacer avec `5`"* dans la file.
2. `setNumber(n => n + 1)`: `n => n + 1` est une fonction updater. React ajoute *cette fonction* dans la file.

Pendant le prochain rendu, React passe par la file d'état:

|   file       | `n` | retourne |
|--------------|---------|-----|
| "remplace par `5`" | `0` (inutile) | `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |

React stocke `6` comme résultat final et le retourne via le `useState`

> Remarquez que `setState(x)` fonctionne comme `setState(n => x)`, mais `n` n'est pas utilisé!

### Si on remplace l'état après l'avoir modifié

que sera la valeur ici?

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>
```

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
      }}>Increase the number</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Voici le détail:

1. `setNumber(number + 5)`: `number` est `0`, donc `setNumber(0 + 5)`. React ajoute *"remplacer avec `5`"* à la file.
2. `setNumber(n => n + 1)`: `n => n + 1` est une fonction updater. React ajoute *cette fonction* à la file.
3. `setNumber(42)`: React ajoute *"remplacer avec `42`"* à la file.

Pendant le prochain rendu, React passe à travers la file

|  file       | `n` | retourne |
|--------------|---------|-----|
| "remplacer avec `5`" | `0` (inutile) | `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |
| "remplacer avec `42`" | `6` (inutile) | `42` |

React stocke `42` comme résultat final et le retourne via le `useState`

En résumé, voici comment appeler `setNumber`:

* **Avec une fonction updater n** (i.e. `n => n + 1`) qui se fait ajouter dans la file.
* **Avec une valeur** (i.e. nombre `5`) ajoute "remplacer avec `5`" à la file, en ignorant ce qui est déjà présent.

Après que le gestionnaire d'événements complète, React déclenche alors un re-rendu. Pendant ce re-rendu, React exécute les éléments de la file. Les fonctions updater exécutent durant le rendu, donc les **fonctions updater doivent être purs ([pure](/learn/keeping-components-pure))** et seulement *retourner* le résultat. N'esayez pas d'activer le setState ou de provoquer tout autre effet de bord. En mode Strict, React exécute chaque fonction updater deux fois (mais exclut le second résultat) to aider à touver les erreurs.

### Conventions de noms

C'est commun de nommer l'argument de la fonction par les premières lettres du state. 

```js
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```

Si on préfère utiliser plus de lettres, une autre convention serait d'utiliser le nom de l'état, avec ou sans préfixe. Par exemple: `setEnabled(enabled => !enabled)`, ou `setEnabled(prevEnabled => !prevEnabled)`.

---

### Défi 1

Vous travaillez sur une application de marché d'euvres d'art où les usagers peuvent soumettre plusieurs commandes simultanément à une oeuvre. Chaque fois qu'un usager clic le boutton "Acheter", le compteur "achats en attente" doit augmenter de un. Après 3 secondes, le compteur "en attente" doit diminuer et le compteur "achats complétés" doit augmenter.

Par contre, le compteur "en attente" ne fonctionne pas. Quand on clique "Acheter", il diminue à "-1" (ça ne devrait pas être possible). Et si on clique rapidement, le résultat est bizarre.

Réparez les compteurs.

<Sandpack>

```js
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCompleted(completed + 1);
  }

  return (
    <>
      <h3>
        Achats en attente: {pending}
      </h3>
      <h3>
        Achats complétés: {completed}
      </h3>
      <button onClick={handleClick}>
        Acheter  
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
```

</Sandpack>


---
## React et les objets

En React, on ne devrait jamais modifier un objet stocké dans l'état. Plutôt que de muter un objet, on devrait créer de nouvelles copies qu'on modifie. 


## Qu'est-ce qu'une mutation

N'importe quel type de valeur peut être stocké par l'état.

```js
const [x, setX] = useState(0);
```

Jusqu'à maintenant, on travaille avec des nombres, des chaines de caractères et des booléens.  Ces types de valeurs sont "immuables". (En lecture seulement, qu'on ne peut modifier.) On peut déclencher un re-rendu pour _remplacer_ une valeur. 


```js
setX(5);
```

L'état `x` est modifié de `0` à `5`, mais le _nombre `0`_ n'a pas changé. Il n'est pas possible de modifer les valeurs primitives en JavaScript, tel que les nombres, les booléens et les chaînes de caractères.  

Mais considérons un objet dans l'état

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

Techniquement, il est possible de changer le contenu de l'objet lui-même. **C'est nommé une mutation:**

```js
position.x = 5;
```

Même si les objets dans un état React sont, techniquement, mutables, on devrait toujours les traiter **comme si** ils étaient immuables. (tel que les nombres, booléens et chaînes de caractères). Plutôt que de les muter, il est préférable de les remplacer.

##  Considérer l'état comme un objet "read-only"

On devrait toujours traiter les **objets JS placés dans l'état comme étant en lecture seulement.**

Cet objet détient un objet dans l'état pour représenter la position d'un pointeur. Le point rouge devrait se déplacer via l'état quand on touche ou déplace le curseur. Mais le point reste immobile:

<Sandpack>

```js
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

```css
body { margin: 0; padding: 0; height: 250px; }
```

</Sandpack>

Le problème se situe ici.

```js
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```

Ce code mute l'objet assigné à `position`du rendu précédent. Mais sans utiliser la fonction `setState`, React n'a pas moyen de savoir que l'objet est modifié. Donc React ne réagit pas. 

Pour déclencher un re-rendu, **il faut créer un nouvel objet dans lequel on place les informations.** 

```js
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

Avec `setPosition`, on dit à React de:

* Remplacer `position` avec ce nouvel objet
* Faire un re-rendu du composant. 

Maintenant, le point rouge suit notre curseur.

<Sandpack>

```js
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

```css
body { margin: 0; padding: 0; height: 250px; }
```

</Sandpack>

<DeepDive>

#### La mutation locale est permise

Ce code est problématique car il modifie un objet d'état *existant*:

```js
position.x = e.clientX;
position.y = e.clientY;
```

Mais ce code est **parfaitement correct** car on mute un nouvel object qui vient tout juste d'être créé.

```js
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

C'est équivalent à ceci:

```js
setPosition({
  x: e.clientX,
  y: e.clientY
});
```

La mutation est un problème seulement quand on chage des objets *existants* dans l'état.  Muter un objet qui tout juste d'être créé est correct, car *aucun autre code n'y fait encore référence.*  Muter ce nouvel objet n'aura pas d'impact. C'est ce qu'on appelle une "mutation locale". On peut même faire des mutation locales durant le rendu. 

</DeepDive>  

## Copier des objets avec la syntaxe de décomposition. 

Dans l'exemple précédent, l'objet position est toujours recréé avec les nouvelles positions. Mais que faire si on désire inclure les données existantes dans le nouvel objet. Par exemple, si on désire modifier un seul champ d'un formulaire, tout en gardant les autres données existantes. 

Les champs de saisie ne fonctionneront pas car les handlers `onChange` vont muter l'état:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

Par exemple, ceci mute l'objet `person` en modifiant le "firstName" du rendu précédent.

```js
person.firstName = e.target.value;
```

La façon fiable d'obtenir le comportement désiré est de créer un nouvel objet et de le passer à `setPerson`.  En plus, il faut **copier les données existantes** car seulement un des champs a changé.

```js
setPerson({
  firstName: e.target.value, // Nouveau prénom
  lastName: person.lastName,
  email: person.email
});
```

On peut utiliser la syntaxe `...` de la [décomposition d'objet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) pour ne pas avoir besoin de recopier chaque propriété séparément. 

```js
setPerson({
  ...person, // copie les anciennes propriétés
  firstName: e.target.value // Modifie firstName 
});
```

Maintenant, le formulaire fonctionne.

Pas besoin de déclarer une variable d'état pour chaque champ de saisie. Pour les gros formulaires, garder toutes les données groupées dans un seul objet est très pratique.  (En autant qu'il soit modifié correctement.)
<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

Notez que `...` (la syntaxe de décomposition, spread syntax) est "superficielle". Elle ne copie qu'à un seul niveau de profondeur. Ça garde de bonnes performances, mais qaund on a des objets imbriqués, il faut utiliser cette syntaxe à de multiples niveaux. 

<DeepDive>

#### Utiliser qu'un seul gestionnaire d'événements pour plusieurs champs

Il est possible d'utiliser les accolades carrées `[` et `]` dans votre objet pour spécifier une propriété avec un nom dynamique. Voici le même exemple, avec un seul gestionnaire d'événement plutôt que trois. 

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

Ici, `e.target.name` réfère à la propriété `name` dans l'élément `<input>` du DOM.

</DeepDive>

## Mettre à jour un objet imbriqué

Considérez l'objet imbriqué suivant:

```js
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
```

Pour modifier `person.artwork.city`, c'est tout simple avec une mutation.

```js
person.artwork.city = 'New Delhi';
```

Mais en React, il faut considérer l'état de façon immuable.  Pour changer `city` il faut créer un nouvel objet `artwork` (préparé avec les données de l'état précédent) ainsi que créer un nouvel objet `person` qui réfère le nouvel `artwork`. 

```js
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

Alternativement, en une seule commande:

```js
setPerson({
  ...person, // Copier les propriétés
  artwork: { // remplacer artwork
    ...person.artwork, // avec les mêmes données
    city: 'New Delhi' // mais à New Delhi!
  }
});
```

C'est pas facile à écrire, mais ça fonctionne très bien.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

<DeepDive>

#### Les objets ne sont pas vraiment imbriqués

Les objets suivants semblent "imbriqués" dans le code.
```js
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
```

Mais cette notion d'imbrication est trompeuse. Quand le code exécute, il n'existe pas de notion d'imbrication. En fait, ce sont deux objets distincts. 

```js
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
```

L'objet `obj1` n'est pas stocké dans `obj2`. La preuve, `obj3` pourrait référer à `obj1` aussi:

```js
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};

let obj3 = {
  name: 'Copycat',
  artwork: obj1
};
```

Si on mute `obj3.artwork.city`, cela affecte `obj2.artwork.city` ainsi que `obj1.city`. C'est que `obj3.artwork`, `obj2.artwork`, ainsi qu'`obj1` réfèrent tous au même objet. C'est difficile à réaliser quand on ne voit que des objets "imbriqués". Il est préférable de les concevoir en tant qu'objets séparés, qui réfèrent ou pointent les uns les autres.  

</DeepDive>  

### Réaliser des modifications complexes avec immer


Si votre état est complexe avec plusieurs objets "imbriqués", on pourrait considérer le rendre plat. Mais si vous désirez conserver la structure  complexe, on pourrait utiliser un outil pour les changements complexes.  [Immer](https://github.com/immerjs/use-immer) est une bibliothèque populaire qui permet d'écrire une syntaxe de changements mutatifs, qui produit un résultat en copie d'objet. Avec Immer, on pourrait croire que le code brise les règles.  Mais ce n'est pas le cas.  



```js
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

Contrairement aux mutations régulières, cela n'écrase pas les états précédents.

<DeepDive>

#### Comment fonctionne Immer?

Le `draft` (brouillon) fourni par Immer est un objet spécial, nommé [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), qui enregistre toutes les mutations qui affectent l'objet. C'est pour cela qu'il est possible de muter l'objet autant qu'on le désire. Dans les coulisses, Immer détermine les modifications à `draft` et produit un nouvel objet avec toutes vos modifications.

</DeepDive>

pour utiliser Immer

1. `npm install use-immer` pour ajouter Immer en tant que dépendance.
2. Remplacez `import { useState } from 'react'` par `import { useImmer } from 'use-immer'`

Voici un exemple qui utilise Immer:

<Sandpack>

```js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

Remarquons que les gestionnaires d'événements sont simples et concis. Il est possible de combiner le `useState` et le `useImmer` dans le même composant. Immer est une façcon de garder votre code simple et concis, surtout avec des objets imbriqués, où la copie d'objet génère du code enuuyeux.

<DeepDive>

#### Pourquoi la mutation d'état n'est pas recommendé en React

Voici les raisons:

* **Débogage:** Si vous utilisez `console.log` et ne mutez pas le state, vos logs précédents ne seront pas écrasés par vos logs plus récents. C'est plus sumple et clair de suivre l'historique des changements. 
* **Optimisations:** Plusieurs stratégies d'optimisation de React (memo) vont 'sauter' le rendu quand les props ou le state n'a pas été modifié. Quand on ne mute jamais l'état, c'est très simple de valider s'il y a des changements avec une simple comparaison `prevObj ===  obj` 
* **Nouvelles fonctionnalités:** L'équipe React prépare de nouvelles fonctionnalités qui se fient que l'état n'est jamais muté. Ces nouvelles fonctionnalités pourraient échouer si votre projet utilise de la mutation.
* **Ajout de besoins:** Certaines fonctionnalités, tel qu'implanter annuler/rétablir, afficher un historique de changements, permettre de réinitialiser un formulaire aux valeurs précédentes, sont des actions simples à réaliser quand rien n'est muté. C'est plus simple de garder des copies des états précédents, et de les ramener au besoin. C'est plus compliqué à implanter quand il y a des mutations.
* **Simplicité:** Quand React ne fait aucune mutation, il n'y a alors rien de spécial à coder. Pas besoin de proxy, ni de propriétés capturées, ni d'objets réactifs à initialiser. C'est pourquoi React nous permet d'ajouter n'importe quel objet dans l'état, sans aucun impact sur la performance. 

Il est souvent possible de muter l'état en React sans ressentir d'impact négatif. Mais à mesure que des nouvelles fonctionnalités sont ajoutées à React, celles-ci s'attendent à ce que les objets soient immuables. Donc, pour que votre code soit compatible avec la future version de React, assurez-vous d'écrire du code avec un état immuable. 

</DeepDive>


## Défi 2

Ce formulaire a quelques bogues. Cliquez le bouton pour ajouter du pointage quelques fois. Rien ne change... Modifiez le prénom, et soudainement le pointage est corrigé. Modifiez le nom, et tout disparait. 

Trouvez les bogues et réparez-les...

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [joueur, setJoueur] = useState({
    prenom: 'Ranjani',
    nom: 'Shettar',
    pointage: 10,
  });

  function handlePlusClick() {
    joueur.pointage++;
  }

  function handlePrenomChange(e) {
    setJoueur({
      ...joueur,
      prenom: e.target.value,
    });
  }

  function handleNomChange(e) {
    setJoueur({
      nom: e.target.value
    });
  }

  return (
    <>
      <label>
        Pointages: <b>{joueur.pointage}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        Prénom:
        <input
          value={joueur.prenom}
          onChange={handlePrenomChange}
        />
      </label>
      <label>
        Nom:
        <input
          value={joueur.nom}
          onChange={handleNomChange}
        />
      </label>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 10px; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>


## Défi 3

Voci un boîte que l'on peut déplacer.  On peut changer sa couleur avec le champ de saisie.

Mais il y a un bogue. Si vous déplacez la boîte d'abord, et ensuite changez sa couleur, le fond va sauter à une nouvelle position. Ce n'est pas normal. 

Réparez le bogue.

<Hint>

Il y a un changement innatendu via mutation.  

</Hint>

<Sandpack>

```js App.js
import { useState } from 'react';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Bougez moi!
      </Box>
    </>
  );
}
```

```js Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

</Sandpack>



### Défi 4


Voici le même exemple que dans le défi précédent. Cette fois-ci, il faut réparer la mutation via Immer. Pour vous aider, `useImmer` est déjà importé.  Il ne reste qu'à changer la variable shape. 
<Sandpack>

```js App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Bougez moi!
      </Box>
    </>
  );
}
```

```js Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

## Modifier les tableaux

En JavaScript, il est permis de muter les tableaux. Mais pour l'état React, on doit les traiter de façon immuable. Comme les objets, quand on veut modifier un tableau, il faut en créer un nouveau ou le cloner.  

## Modifier les tableaux sans mutation

En JS, les tableaux sont un type d'objet.  Et de la même façon qu'on gère les objets en React, on doit gérer les tableaux dans l'état React comme s'ils sont en lecture seule. Il faut éviter la réassignation: `arr[0] = 'non'` ainsi que les méthodes qui mutent le tableau (ex: `push()` et `pop()`).

Chaque fois qu'on veut modifier le tableau, il faut passer un nouveau tableau au setState. On peut utiliser les méthodes `filter()` et `map()`.  On peut écrire l'état avec le nouveau tableau. 

Voici une table de référence des opérations de tableau communes. Evitez les méthodes de la colonne de gauche.  Préférez les méthodes de la colonne de droite.

|           | Évitez (Mute le tableau)            | Adoptez (Crée nouveau tableau)                                        |
| --------- | ----------------------------------- | ------------------------------------------------------------------- |
| Ajouter   | `push`, `unshift`                   | `concat`, `[...arr]` syntaxe décomposition |
| Enlever   | `pop`, `shift`, `splice`            | `filter`, `slice`         |
| Remplacer | `splice`, `arr[i] = ...` assignation | `map`                    |
| Trier     | `reverse`, `sort`                   | Copier le tableau avec de trier |

Alternativement, on peut utiliser Immer qui permet l'usage des deux colonnes.

<Pitfall>

Notez que les méthodes [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) ont [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) ont des noms similaires, mais se comportent de façons différentes.  

* `slice` permet de copier un tableau, en partie ou totalité.
* `splice` **mute** un tableau (en insérant ou enlevant des items).

En React, on recommande d'utiliser `slice` (sans `p`!) pour éviter la mutation. 

</Pitfall>

### Ajouter à un tableau

`push()` mute un tableau en ajoutant un item. 
 
<Sandpack>

```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Sculpteurs:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setName('');
        artists.push({
          id: nextId++,
          name: name,
        });
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

Préférez plutôt la création d'un *nouveau* tableau contenant les items existants et un nouvel item à la fin. Il y a plusieurs approches possibles, mais le plus simple est d'utiliser la syntaxe de décomposition de tableau: `...` 


```js
setArtists( // Replacer l'état
  [ // avec un nouveau tableau
    ...artists, // contenant les anciens items
    { id: nextId++, name: name } // et un item additionnel à la fin. 
  ]
);
```

Maintenant, tout marche correctement.

<Sandpack>

```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Sculpteurs:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setName('');
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Ajouter</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>


La syntaxe de décomposition permet ausi d'ajouter au début du tableau. 

```js
setArtists([
  { id: nextId++, name: name },
  ...artists // Ajouter le contenu existant
]);
```

De cette façon, la décomposition permet autant les `push()` (ajouter à la fin) que les `unshift()` (ajouter au début) 

### Enlever à un Tableau

Pour enlever un item, il suffit de le *filtrer*. le but est de produire un nouveau tableau qui ne contiendra pas cet item. On utilise `filter` pour cela. 

<Sandpack>

```js
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Sculpteurs:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Enlever
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

Cliquez enlever quelques fois.

```js
setArtists(
  artists.filter(a => a.id !== artist.id)
);
```

Ici, `artists.filter(a => a.id !== artist.id)` signifie "créer un nouveau tableau d' `artists` dont les ID sont différents de `artist.id`". Chaque bouton "enlever" va filtrer l'artiste courant, et provoque un re-rendu. Notez que filtrer ne modifie pas le tableau original.


### Transformer un tableau

Si vous désirez modifier certains ou tous les items d'un tableau, utilisez `map()` pour créer un nouveau tableau. La fonction passée à `map` détermine quoi faire avec chaque item, basé sur son contenu ou son index (ou les deux).

Dans cet exemple, un tableau détient les coordonnées de deux cercles et un carré. Quand on clique le bouton, on déplace les cercles de 50 pixels vers le bas. `map()` va créer ce nouveau tableau.

<Sandpack>

```js
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // Pas de changement
        return shape;
      } else {
        // Retourne un cercle 50 pixels plus bas
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // Provoque un re-rendu avec le nouveau tableau
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        Déplacez les cercles!
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}
```

```css
body { height: 300px; }
```

</Sandpack>

### Remplacer les items d'un tableau

Il est fréquent de vouloir remplacer un ou plusieurs items d'un tableau. Les asignations du genre `arr[0] = 'non'` mutent l'objet.  On préfère utiliser `map`.

Pour remplacer un item, créez un nouveau tableau avec `map`. Dans votre appel `map`, vous recevez l'index de l'item comme second argument. On peut utiliser cette position pour décider si on retourne l'item original, ou autre chose. 

<Sandpack>

```js
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Incrémentez le compteur cliqué
        return c + 1;
      } else {
        // Le reste demeure la même chose
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

### Insérer au milieu d'un tableau

Parfois, on veut insérer un item dans une position spécifique, qui n'est ni au début, ni à la fin. Pour cela, on peut utiliser la méthode `slice()` avec la syntaxe de décomposition de tableau `...`.  `slice()` permet d'obtenir une "portion" du tableau. pour insérer un item, il faut créer un tableau qui décompose la portion avant le point d'insértion, par la suite ajouter le nouvel item, et ensuite décomposer le reste du tableau. 

Dans cet exemple, le bouton "Insérer" va toujours insérer à l'index 1.  



<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // Pourrait être n'importe quel index
    const nextArtists = [
      // Items avant le point d'insertion:
      ...artists.slice(0, insertAt),
      // Nouvel item
      { id: nextId++, name: name },
      // Items après le point d'insertion:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Sculpteurs:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insérer
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

### Faire d'autres changements

On pourrait vouloir renverser un tableau, ou le trier. Mais les méthodes `reverse()` et `sort()` mutent le tableau orginal. Que faire?

**Faites une copie du tableau d'abord, et faites des changements mutatifs ensuite**

Par exemple:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        Inverser
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

On utilise la syntaxe de décomposition `[...list]` pour créer une copie du tableau original. Il est maintenant possible d'utiliser `nextList.reverse()` ou `nextList.sort()`, ou même asigner des items directement `nextList[0] = "something"`.

Par contre, même si on copie un tableau, on ne peut muter les items dans le tableau. La copie est superficielle (shallow), et la nouveau tableau contient les mêmes items que l'original. Si on modifie un objet dans le tableau copié, on mute l'état.  Le code suivant est donc problématique:

```js
const nextList = [...list];
nextList[0].seen = true; // Problème: mute list[0]
setList(nextList);
```

Même si `nextList` et `list` sont deux tableaux distincts, **`nextList[0]` et `list[0]` pointent au même objet** En modifiant `nextList[0].seen`, on modifie aussi `list[0].seen`. C'est donc une mutation d'état, qu'il est préférable d'éviter. On résout ce problème de la même façon qu'avec les objets JS imbriqués -- En copiant des items individuels qu'on désire changer plutôt que de muter. Voici comment:

## Modifier des objets dans des tableaux

Les objets ne sont pas réellement dans les tableaux. Même si on dirait qu'ils sont imbriqués, chaque objet est une valeur séparée, vers lequel le tableau pointe. On doit être prudent lorsqu'on change des champs imbriqués tel que `list[0]`, car on pourrait changer un item qui est référé par un autre tableau.

**Lorsqu'on met à jour des états imbriqués, il faut créer des copies des objets à modifier, jusqu'au top niveau.** 

Dans cet exemple, deux listes d'oeuvres d'art partagent le même état initial. Ils devraient être isolés, mais à cause d'une valeur mutée, leur état est accidentellement partagé, et cocher la boite d'une liste affecte l'autre liste.     


<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>Oeuvres d'art</h1>
      <h2>Ma liste d'art:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Ta liste d'art:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

</Sandpack>

Le problème est ici

```js
const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // Problème: on mute un item existant
setMyList(myNextList);
```

Même si le tableau `myNextList` est nouveau, les *items* sont les mêmes que dans le tableau original `myList`. Changer `artwork.seen` change donc l'item *original*. Cet item se trouve aussi dans `yourArtworks`, causant le bogue. Ces bogue sont difficiles à cerner, mais disparaissent dès qu'on arrête de muter. 

**On peut utiliser map pour substituer un vieil item avec sa nouvelle version sans mutation**

```js
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // Créer un nouvel item avec changements
    return { ...artwork, seen: nextSeen };
  } else {
    // Pas de changements
    return artwork;
  }
});
```

Ici, `...` est la syntaxe de décomposition pour créer la copie d'un objet.

Avec cette approche, aucun des items d'état n'est muté, et le bogue est réglé.

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // Créé un *nouvel* objet avec changements
        return { ...artwork, seen: nextSeen };
      } else {
        // Pas de changements. 
        return artwork;
      }
    }));
  }

  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) {
        // Créé un *nouvel* objet avec changements
        return { ...artwork, seen: nextSeen };
      } else {
        // Pas de changements. 
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Liste des oeuvres d'art</h1>
      <h2>Ma liste:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Ta liste:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

</Sandpack>

En général, **le seul objet d'état que l'on peut muter, c'est celui qui vient tout juste d'être créé.** Si vous devez insérer une nouvelle oeuvre d'art, c'est correct de la muter. Si on gère quelque chose provenant de l'état, il faut faire une copie.   

In general, **you should only mutate objects that you have just created.** If you were inserting a *new* artwork, you could mutate it, but if you're dealing with something that's already in state, you need to make a copy.

### Écrivez une logique concise avec Immer. 

Modifier des tableaux imbriqués sans mutation est répétitif et complexe. Utilisez les mêmes stratégies qu'avec les objets:

- En général, on ne devrait pas modifier les données profondément imbriquées. Si c'est le cas, tentez de réécrire la structure pour avoir une structure moins profonde ou plate

- Si on ne désire pas restructurer, on pourrait utiliser [Immer](https://github.com/immerjs/use-immer). On peut alors écrire une syntaxe de mutation, mais qui est converti en copies. 

Voici le même exemple réécrit en Immer

<Sandpack>

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourArtworks, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Liste d'oeuvres d'art</h1>
      <h2>Ma liste:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Ta liste:</h2>
      <ItemList
        artworks={yourArtworks}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

Avec Immer, **les mutations comme `artwork.seen = nextSeen` sont permises:**

```js
updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
});
```

C'est correct ici car on ne mute pas l'état original. On mute un objet spécial `draft`, fourni par Immer. On pourait aussi utiliser `push()` and `pop()` pour modifier `draft`. 

Dans les coulisses, Immer construit le prochain objet d'état à partir des mutations de `draft`. Ceci permet d'avoir des gestionnaires d'événemnts plus simples et courts. 

---

### Défi 5


Écrivez la logique de `handleIncreaseClick`. Quand on clique "+", cela incrémente le nombre

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Sandwich',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {

  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

### Défi 6

Le bouton "-" ne fait rien. Il faut ajouter un gestionnaire d'événements qui décrémente le `count`du produit. Quand on pèse "-" et que le compte est 1, il faut enlever le produit du panier d'achat. (On ne doit pas afficher 0)

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Sandwich',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

### Défi 7


Tous les gestionnaires d'événements de `App.js` utilisent la mutation. L'édition et la supression des todos ne fonctionnent pas. Il faut réécrire `handleAddTodo`, `handleChangeTodo` et `handleDeleteTodo` pour ne plus muter.

<Sandpack>

```js App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Acheter lait', done: true },
  { id: 1, title: 'Manger collation', done: false },
  { id: 2, title: 'Préparer du thé', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Ajouter Todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Ajouter</button>
    </>
  )
}
```

```js TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Confirmer
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Modifier
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Suprimer
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

### Défi 8

Même exemple que précédemment. Cette fois-ci, on répare les mutations en utilisant Immer. `useImmer` est déjà importé.

<Sandpack>

```js App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Acheter lait', done: true },
  { id: 1, title: 'Manger collation', done: false },
  { id: 2, title: 'Préparer du thé', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Ajouter Todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Ajouter</button>
    </>
  )
}
```

```js TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Confirmer
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Modifier
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Supprimer
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>