---
title: 'JavaScript Moderne'
date: '2023-02-13'
slug: 'javascript'
---

<Boxed title="Déclarer variables: let/const (mieux que var)">

Une variable permet de stocker une valeur (nombre, string, tableau, objet, etc.)

`let`, `const` (ainsi que `var`) permettent de déclarer des variables.

`let` permet de réassigner une variable. `const` ne permet pas de réassigner de variable. **Attention:** `const` permet de modifier un objet ou un tableau.

```javascript
let age = 33;
age = age + 1; // permis

const personne = {nom: 'Bob', age: 33};
personne = {nom: 'Bob', age: 34}; //erreur, on ne peut réassigner
personne.age = personne.age + 1; //permis
```

La portée de `let` et `const` peuvent soit être au niveau d'un bloc (`if`, `while`, `for`, `switch`), d'une fonction, d'un module, ou du niveau global.

La portée de `var` ne peut pas être le bloc. Pire: si on utilse `var` au niveau global, on pollue l'objet global. (Dans un navigateur, l'objet global est `window`). De plus, `var` utilise des règles de _hoisting_ (remontée) différemment que `let` et `const`.

</Boxed>
 
<Boxed title="Évaluation booléenne">

**falsy:** `false`, `0`, `""`, `null`, `undefined`, `NaN` <br />
**truthy:** Tout le reste (incluant `[]`, `{}`, `"0"`, `"false"`)

</Boxed>

<Boxed title="Évaluation conditionnnelle">

Ces exemples court-circuitent. (i.e.: eval2 n'est pas évalué si ce n'est pas nécessaire. <br />
`eval1 || eval2`<br />
&nbsp;quand `eval1` est truthy, retourne `eval1` **sinon** `eval2`

`eval1 && eval2`<br />
&nbsp;quand `eval1` est falsy, retourne `eval1` **sinon** `eval2`

`eval1 ?? eval2`<br />
&nbsp;quand `eval1` n'est ni `null` ni `undefined`, retourne `eval1` **sinon** `eval2`

`test ? eval1 : eval2`<br />
&nbsp;quand `test` est truthy, retourne `eval1` **sinon** `eval2`

</Boxed>

<Boxed title="Fonctions fléchées">

On peut utiliser les "fonctions fléchées" plutôt que des functions.
(`this` sera determiné par le contenant de la fonction fléchée.)

```js
// les deux sont équivalents
function add(a, b) {
  return a + b;
}
const add = (a, b) => {
  return a + b;
};
```

</Boxed>

<Boxed title="Syntaxe courte des fonctions fléchées">

Si votre fonction fléchée n'a qu'une seule instruction avec un retour, on peut enlever les accolades ainsi que `return`.

```js
const add = (a, b) => { return a + b; };
const add = (a, b) => a + b;  ­   //équivalents
```

Si c'est un objet, il faut des parenthèses pour utiliser la syntaxe courte.

```js
const fn = () => {
  return {nom: 'Bob'};
};
const fn = () => ({nom: 'Bob'}); //équivalents
```

S'il n'y a qu'un seul paramètre, on peut omettre les parenthèses des paramètres.

```js
const double = (a) => a * 2;
const double = a => a * 2;  ­  //équivalents
```

</Boxed>

<Boxed title="Paramètres du reste (Rest params)">

Transforme une série d'arguments en tableau.

```js
function fn(a, b, ...leReste) {
  // leReste est un tableau contenant tous les autres arguments.
}
```

</Boxed>

<Boxed title="Syntaxe de décomposition (spread syntax)">

Permet de créer de nouveaux tableaux et objets.

```js
const nombres = [5, 6, 7];

// décompose un tableau dans un nouveau tableau
// en ajoutant un nombre à la fin ⮯⮯
const plusNombres = [...nombres, 8];

const employe1 = {nom: 'Eric', ville: 'Montréal'};
const employe2 = {...employe1}; // clone un object
const employe3 = {...employe1, ville: 'Gatineau'};
// Ajoute une propriété à l'employé ⮭⮭
```

Permet d'appeler une fonction avec un tableau.

```js
//Ceci est une fonction normale ⮯⮯
function fn(a, b, c) {
  /* code ici */
}

// On appelle la fonction en décomposant le tableau. ⮯⮯
fn(...nombres);
```

­

</Boxed>

<Boxed title="Affecter par décomposition (destructuring) (tableau et objets)">

Créé des variables en décomposant les valeurs contenues dans tableaux et objets.

```js
const liste = [1, 2, 3];
let [a, , b] = liste; // a=1, b=3
[b, a] = [a, b];   // Échange les valeurs, sans variable temp!

const emp = { prenom: 'Luc', nom: 'Dionne' };

// const prenom='Luc',  nom='Dionne' ⮯⮯
const { prenom, nom } = emp;

// décomposer avec alias famille='Dionne' ⮯⮯
const { nom: famille } = emp;

function fn({ prenom, nom: famille }) {
  // on décomposose dans les arguments de la fn ⮭⮭
  ...
}
```

</Boxed>

<Boxed title="Exporter des modules">

Modules EcmaScript permettent d'exporter et d'importer du code en javascript. Il y a deux types d'exportations:

Exporter par défault (un par fichier) <br />
Exporter par nom (plusieurs par fichier)

```js
export const x = 5, y = 6;
export function fn() {...};
export class Classe {...}

// Exporter liste ⮯⮯
export { nom1, nom2, nom3};

// Exporter en renommant ⮯⮯
export { var1 as nom1, var2 as nom2};

// Exporter en décomposant et renommant ⮯⮯
export const { nom1, nom2: bar } = obj;

// Exporter par défaut ⮯⮯
export default expression;
export default function (…) { … }     // aussi class
export default function nom1(…) { … } // aussi class
export { nom1 as default, … };
```

</Boxed>

<Boxed title ="Importer des modules">

Permet d'importer le code ayant été exporté. Le nom du fichier
peut inclure l'extension ou non. (`"react"` ou `"react.js"`)

```js
import React from 'react.js'; // importer l'export par défaut
import {useState} from 'react.js'; //importer une exportation nommé

// importer plusieurs exportations nommées ⮯⮯
import {Button, Input} from 'module-name';

//Utiliser un alias renommer une exportation nommée ⮯⮯
import {Button as Btn} from 'react-bootstrap';

// Obtenir d'un fichier spécifique
// (optimisation) ⮯⮯
import {foo, bar} from 'module-name/folder/file.js';

// Mélange de la syntaxe  ⮯⮯
import {export1, export2 as alias2} from 'module';
import defaultExport, {export1, export2} from 'module';
import defaultExport, * as name from 'module';
import 'module';

// importer tous les noms (pas la meilleure approche) ⮯⮯
import * as bootstrap from 'react-bootstrap';

// syntaxe impérative (plutôt que déclarative) ⮯⮯
const promise = import('module');
```

</Boxed>

<Boxed title="Fermeture (Closure)">

Une variable survivra au-delà de sa portée initiale tant qu'elle est référencée par une fonction interne retournée.

D'habitude, la portée d'une variable est dans la fonction. Mais dans le code suivant, la variable survit tant que la fonction interne est référencée.

```js
function outer() {
  let theVar = 42;
  return function inner() {
    return theVar;
  };
}
const fn = outer();
console.log(fn()); //affiche 42!

//theVar reste en portée tant que fn est référencé
­//(Ceci n'est possible que dans les langages de programmation
//qui supportent les closure, tel que JS)
```

</Boxed>

<Boxed title="Académie React">

Pour obtenir la dernière version de ce document, visitez la section **Aide-Mémoire** de <a href="https://www.reactacademy.live/">ReactAcademy.live</a>.

</Boxed>
