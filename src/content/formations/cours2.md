---
title: 'Formation 2'
date: '2023-02-20'
---


## Créer un SPA

- Un **SPA** est une _Single Page App_
  - Par exemple: Google Maps, Netflix, Instagram, Twitter, etc.
  - Le serveur web doit être configuré pour rediriger toutes les requêtes HTTP vers la page index.
  - Les SPA modernes sont plus complexes et permettent une architecture hybride, où le _backend_ joue un rôle important.
    - On appelle cette approche le **Pespa** (Progressively Enhanced Single Page Apps)
    - https://www.epicweb.dev/the-webs-next-transition

---

## Points d'entrée

- Voici les conventions de **Vite** (Similaire à Create-React-App, CRA)
- Une page `index.html` aura un `<div id="root"> </div>`
  - le `div` est vide
- le script de démarrage se nomme `index.jsx`

- On pourrait générer des données dans la racine SANS utiliser React

```js
//On trouve le div
let rootNode = document.getElementById('root');

//Modify the content of the DOM.  No React!
rootNode.innerHTML = '<h2>Bonjour tous!</h2>';
```

---

## Point d'entrée React

- Index.jsx doit importer ReactDOM/client

- ReactDOM permet de créer une racine React pour le Web.

```js
//On importe ReactDOM
import * as ReactDOM from 'react-dom/client';

//On trouve le div
let rootNode = document.getElementById('root');

//On créé une racine React sur le div
const root = ReactDOM.createRoot(rootNode);

//On affiche du jsx sur la racine
root.render(<h2>Bonjour Tous!</h2>);
```

---

## Jsx dans variable

On peut stocker le jsx dans une variable.

```js
let jsx = <h2>Bonjour Tous!</h2>;
root.render(jsx);
```

---

## Composant

Fonction qui retourne du JSX. Cela combine balises, CSS et JS.

La première lettre doit être une majuscule.

```js
function Bonjour() {
  return <h2>Bonjour Tous!</h2>;
}

//on pourrait appeler tel qu'une fonction 🔴
root.render(Bonjour());

//Mieux vaut utiliser du JSX  ✅
root.render(<Bonjour />);
```

---

## Distinguer entre Composant et DOM

**Règle** On distingue le Composant d'une balise DOM par la première lettre:

- `div` et `h1` commencent par des minuscules. React génère des balises HTML.
- `Bonjour` commence par une majuscule. React appelle le composant.

```js
root.render(
  <div>
    <h1>Salutations</h1>
    <Bonjour />
    <Bonjour />
    <Bonjour />
  </div>
);
```

---

## Découper les composants dans fichiers différents

**Règle** Quand on isole le composant dans son fichier, il faut utiliser `export default`

**Règle** Quand on écrit le JSX sur plusieurs lignes, il faut entourer de parenthèses ()

```js
export default Bonjour() {
  return (
    <h2>
      Bonjour Tous!
    </h2>
  );
}
```

---

## Le JSX ne permet qu'une seule racine

```js
// Erreur: deux racines  🔴
<h1>Titre</h1>
<h2>Sous-titre</h2>
```

```js
// une racine qui englobe  ✅
<div>
  <h1>Titre</h1>
  <h2>Sous-titre</h2>
</div>
```

---

## Le fragment

Le fragment permet d'englober sans générer d'élément dans le DOM

```js
// Fragment avec importation
import { Fragment } from 'react';

<Fragment>
  <h1>Titre</h1>
  <h2>Sous-titre</h2>
</Fragment>;
```

```js
// Fragment implicite  ✅
<>
  <h1>Titre</h1>
  <h2>Sous-titre</h2>
</>
```

---

## Pas de composants imbriqués

Ne jamais imbriquer les composants les uns dans les autres.

```js
function Composant1() {
  //Pas imbriqué  ✅
  return <Composant2 />;
}

function Composant2() {
  //Pas imbriqué  ✅
  return <br />;
}
```

```js
function Composant1() {
  function Composant2() {
    //Composant imbriqué  🔴
    return <br />;
  }
  return <Composant2 />;
}
```

C'est correct d'imbriquer des gestionnaires d'événements et d'autres fonctions.
Le problème d'imbriquer des composants, c'est la performance. (Chaque rendu de Composant1 va générer un nouveau Composant2, avec un nouvel état... )

---

### Défi 1

Il manque quelque chose pour que le fichier soit détectable par React. (indice: exportation)

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>


---

### Défi 2

La commande `return` ne fonctionne pas. Commment réparer?

<Sandpack>

```js
export default function Profile() {
  return
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

---

### Défi 3

Pourquoi cela échoue? (Indice: qu'est-ce qui distingue les composants et les balises html.)

<Sandpack>

```js
function profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Liste de personnes</h1>
      <profile />
      <profile />
      <profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>


---

### Défi 4

        Écrire un composant `Entete` qui retourne un gros titre qui
          dit `Bravo!`.

<Sandpack>

```js
// Écrivez votre compsant ici...

```

</Sandpack>


---

## Racine App

**Convention:** avec Create-React-App et Vite, la composante racine se nomme App.jsx.

**Convention:** On peut utiliser l'extension `.jsx` ou `.js`

- Les extensions sont interchangeables

  - `Vite`, `Github` et `Remix` préfèrent `.jsx`
  - `Next` et `React` préfèrent `.js`

- Pour l'importation, l'extension `.js` ou `.jsx` est optionnelle.

---

## Séparer des composants (VS Code)

Réusiner ou remanier le code (refactoring) par outils de VSCode.

##### Séparer jsx vers un composant

1. `Ctrl-.` sur du JSX sélectionné (ou clic-droit, menu `Remanier...`(`Refactor...`))
2. Sélectionner `Extraire vers function dans la portée module` (`Extract function to module scope`)

##### Isoler composant vers un nouveau fichier

1. `Ctrl-.` sur nom de fonction (ou clic-droit, menu `Remanier...` (`Refactor...`))
2. Sélectionner `Déplacer vers un nouveau fichier` (`Move to a new file`)
3. `Ctrl-.` sur mot export (ou clic-droit, menu `Remanier...` (`Refactor...`))
4. Sélectionner `Convert named export to default export`

---

## Séparer des composants (Manuellement)

Il faut ajouter un `export` (nommé) ou un `export default` quand on déplace le code.

Ne pas oublier d'adapter l'importation avec la commande import

- avec accolades {} pour une exportation nommée
- sans accolades pour l'exportation par défaut

---

## Types d'Exportations


![Default and named exports](/images/docs/illustrations/i_import-export.svg)


| Syntaxe | Instruction Export                    | Instruction Import                      |
| ------- | ------------------------------------- | --------------------------------------- |
| Défaut  | `export default function Button() {}` | `import Button from './button.js';`     |
| Nommé   | `export function Button() {}`         | `import { Button } from './button.js';` |

Avec un import par défaut, on peut renommer l'importation comme on veut.
ex: `import Pressoir from './button.js';`

---

### Défi 5

Déplacer la composante Profile dans son fichier `Profile.js`;

<Sandpack>

```js App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}
```

```js Gallery.js active
// me déplacer vers Profile.js!
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Liste de personalités</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js Profile.js
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>


---

## Formule JSX

Grâce au JSX, on peut combiner le HTML et le JavaScript ensemble.

JSX et React sont deux technologies différentes et séparées, on peut utiliser l'un sans l'autre.

---

## Règles de JSX

1. Une seule racine

On peut combiner avec une balise qui englobe (`<div>`) ou un fragment (`<></>`)

2. Balises sont explicitement fermées

Pas de `<img>` mais plutôt `<img />`

3. Utiliser le camelCase pour les attributs

JSX est converti en JavaScript par la boîte à outils. Les attributs sont alors transformés en propriétés du DOM (qui sont en camelCase).

`stroke-width` devient `strokeWidth`, `class` devient `className` (car `class` est un mot-réservé en JS).

Consultez la liste des attributs sur la [documentation React](https://beta.reactjs.org/reference/react-dom/components/common)

**Exception:** `aria-*` et `data-*`

---

### Défi 6

Réparer les nombreuses petites erreurs du code JSX
   
<Sandpack>

```js
export default function Bio() {
  return (
    <div class="intro">
      <h1>Bienvenue à mon site Web!</h1>
    </div>
    <p class="summary">
      Vous pouvez lire mes réflexions
      <br><br>
      <b>et voir des <i>photos</b></i> de gens!
    </p>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

---

## JavaScript dans JSX

On utilise les accolades {} pour insérer des expressions Javascript dans JSX

```js
//js dans le texte jsx
<h1>Bonjour {user.name}!</h1>
```

```js
//js utilisé avec attributs 
<img className='usager' src={user.imageUrl} />
```

```js
//Deux paires d'accolades:
//la première pour utiliser du JS,
//la seconde pour définir un objet JS
<img className='usager' src='photo.jpg' style={{ width: 50, height: 50 }} />
```

---

### Défi 7

Réparer pourquoi ceci échoue avec l'erreur `Objects are not valid as a
React child`.

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Les choses à faire pour {person}</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Acheter du lait</li>
        <li>Promener le chien</li>
        <li>Faire la lessive</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>


---

### Défi 8

Enlever l'URL de l'image pour l'ajouter dans l'objet `person`

<Sandpack>
```js

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Les choses à faire pour {person.name}</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Acheter du lait</li>
        <li>Promener le chien</li>
        <li>Faire la lessive</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>
---

### Défi 9

Dans l'objet ci-bas, l'url de l'image est séparé en 4 parties: base URL, `imageId`, `imageSize`, and l'extention de fichier.

Dans l'URL de l'image, nous voulons combiner ces attributs : base URL (toujours `'https://i.imgur.com/'`), `imageId` (`'7vQD0fP'`), `imageSize` (`'s'`), et l'extention de fichier (toujours '.jpg'). Quelque chose cloche avec le `src` de la balise `<img>`

Réparez le code. (Indice: utilisez un gabarit (string template))

<Sandpack>

```js
const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>Les choses à faire pour {person.name}</h1>
      <img
        className="avatar"
        src="{baseUrl}{person.imageId}{person.imageSize}.jpg"
        alt={person.name}
      />
      <ul>
         <li>Acheter du lait</li>
        <li>Promener le chien</li>
        <li>Faire la lessive</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

---

## Passer des props dans des composants

React utilise des props pour passer de l'information entre les composants.

On peut passer des chaînes de caractères, des objets, des tableaux, des fonctions, etc.

---

## Props familiers

`className, src, alt, width, height` sont des props familiers

```js
<img
  className='avatar'
  src='https://i.imgur.com/1bX5QH6.jpg'
  alt='Lin Lanying'
  width={100}
  height={100}
/>
```

---

## Passer des props

#### Pousser des props au composant enfant

```js
<Avatar person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} size={100} />
```

#### Lire les props dans le composant enfant

```js
function Avatar({ person, size }) {
  // person et size sont accessibles
}
```

---

## La nature des props

Il n'y a qu'un seul paramètre passé aux composants.

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

Cette sytaxe est moins populaire que la décomposition avec `{}`. (destructuring)

---

## Valeur Par défaut

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

La valeur par défaut est utilisée quand `size` n'est pas présent ou quand `size={undefined}`

---

## Pousser des props avec la syntaxe de décomposition

```js
// Approche répétitive
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className='card'>
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

```js
// Approche avec syntaxe de décomposition
function Profile(props) {
  return (
    <div className='card'>
      <Avatar {...props} />
    </div>
  );
}
```

---

## Passer du JSX ou contenu en props children

```js
<Cadre>
  <Avatar />
</Cadre>;

function Cadre({ children }) {
  return <div className='cadre'>{children}</div>;
}
```

---

## Caractéristiques des props

- Les props reçus sont en lecture seulement. Il faut les considérer _immuables_.

- On ne peut changer un props. Si on a besoin d'interactivité, on utilisera l'état (state).

---

### Défi 10

Le composant `Gallery` contient des balises similaires pour afficher les profiles. Extraire un composant `Profile`pour réduire le code redondant. Choisissez les props nécessaires.
  

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Scientifiques remarquables</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Spécialité: </b> 
            Physique et Chimie
          </li>
          <li>
            <b>Prix et distinctions: 4 </b> 
            (Prix Nobel en physique, Prix Nobel en Chimie, Médaille Davy, Médaille Matteucci)
          </li>
          <li>
            <b>Découverte: </b>
            polonium (élément)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Spécialité: </b> 
            Géo-chimie
          </li>
          <li>
            <b>Prix et distinctions: 2 </b> 
            (Prix géochimie Miyake, Prix Tanaka)
          </li>
          <li>
            <b>Découverte: </b>
            méthode pour mesurer le dioxide de carbone dans l'eau de mer
          </li>
        </ul>
      </section>
    </div>
  );
}
```

```js utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>



---

### Défi 11

Dans cet exemple, `Avatar` reçoit une prop `size` numérique pour la taille du `<img>`. Dans cet exemple, la taille affiché est 40. Mais la taille de l'image téléchargée est 160px. La taille de l'image téléchargée devrait s'adapter d'après la taille affichée.

Changez le composant `Avatar` pour télécharger l'image d'après la taille d'affichage. Si la taille est moins de 90, passez le paramètre `s` (small) plutôt que `b` (big) à la fonction `getImageUrl`. Testez en affichant des Avatars de tailles différentes. (Bonus: on poourrait prendre en compte les écrans denses avec `window.devicePixelRatio`)

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

---

### Défi 12

Extraire un composant `Card` du code ci-bas. Utilisez la prop `children` pour lui passer du JSX différent:
    
<Sandpack>

```js
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>À Propos</h1>
          <p>Aklilu Lemma est un scientifique Éthiopien qui a découvert un traitement naturel au schistosomiase.</p>
        </div>
      </div>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

---

## Rendu conditionnel

Différentes approches

Méthode classique, utiliser des instructions `if`:

```js
let contenu;
if (vip) {
  contenu = <Vip />;
} else {
  contenu = <Regulier />;
}
return <div>{contenu}</div>;
```

Méthode compacte, utiliser l'opérateur conditionnel ternaire `(expression ? resultat_vrai : resultat_faux)`

```js
<div>{vip ? <Vip /> : <Régulier />}</div>
```

Méthode sans `else`, utiliser l'opérateur logique `&&`

```js
<div>{vip && <Vip />}</div>
```

---

### Défi 13

Utilisez l'opérateur ternaire conditionnel (`cond ? a : b`) pour afficher ❌ quand `estPaqueté` n'est pas vrai.
       

<Sandpack>

```js
function Item({ nom, estRangé }) {
  return (
    <li className="item">
      {nom} {estRangé && '✔'}
    </li>
  );
}

export default function ListeBaggages() {
  return (
    <section>
      <h1>Liste du contenu des baggages</h1>
      <ul>
        <Item 
          estRangé={true} 
          nom="Brosse à dents" 
        />
        <Item 
          estRangé={true} 
          nom="Maillot de bain" 
        />
        <Item 
          estRangé={false} 
          name="Guitare" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

---

### Défi 14

Dans cet exemple, chaque `Ìtem` reçoit une prop numérique nommée `importance`. Utilisez l'opérateur && pour afficher _(Importance: X)_ en italiques, mais seulement pour les items qui ont une importance autre que 0.

Votre liste d'items doit ressembler à ceci:

- Brosse à dents _(Importance: 9)_
- Maillot de bain
- Guitare _(Importance: 6)_
  
Noubliez pas l'espace entre les deux étiquettes. `{' '}`


<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

---

### Défi 15

La composante `Boisson` utilise une série de conditions ternaires ` ? :` pour afficher différentes informations dépendant si le nom de la boisson est un "thé" ou un "café". Le problèeme c'est que l'information est répartie à travers diverses conditions. Réécrivez ce code pour n'utiliser qu'un seul `if` plutôt que trois opérations ternaires.



<Sandpack>

```js
function Boisson({ nom }) {
  return (
    <section>
      <h1>{nom}</h1>
      <dl>
        <dt>Partie de la plante</dt>
        <dd>{name === 'thé' ? 'feuilles' : 'grains'}</dd>
        <dt>Taux de Caféine</dt>
        <dd>{name === 'thé' ? '15–70 mg/tasse' : '80–185 mg/tasse'}</dd>
        <dt>Age</dt>
        <dd>{name === 'thé' ? '4 000+ ans' : '1 000+ ans'}</dd>
      </dl>
    </section>
  );
}

export default function ListeBoissons() {
  return (
    <div>
      <Boisson nom="thé" />
      <Boisson nom="café" />
    </div>
  );
}
```

</Sandpack>

---

## Gérer des listes

Il est facile d'utiliser des fonctions telles que `map` et `filter` pour travailler avec des données.

```js
const personnalités = [
  'François Legault: politicien',
  'Isabelle Boulay: artiste',
  'François Bellefeuille: humoriste',
  'Pierre Lapointe: artiste',
  'Véronique Cloutier: animatrice',
];
```

```js
const listeItems = personnalités.map((personne) => <li>{personne}</li>);
```

```
return <ul>{listeItems}</ul>
```

---

## Filtrer les données

Avec une structure plus complexe:

```js
const personnalités = [
  {
    id: 0,
    nom: 'François Legault',
    profession: 'politicien',
  },

  {
    id: 1,
    nom: 'Isabelle Boulay',
    profession: 'artiste',
  },
  {
    id: 2,
    nom: 'François Bellefeuille',
    profession: 'humoriste',
  },
  {
    id: 3,
    nom: 'Pierre Lapointe',
    profession: 'artiste',
  },
  {
    id: 4,
    nom: 'Véronique Cloutier',
    profession: 'animatrice',
  },
];
```

Filtrons les artistes

```js
const artistes = personnalités.filter(
  (personne) => personne.profession === 'artiste'
);
```

Faisons un map

```js
const listeItems = artistes.map((personne) => (
  <li>
    <img src={getImageUrl(personne)} alt={personne.nom} />
    <p>
      <b>{personne.nom}:</b>
      {' ' + personne.profession}
    </p>
  </li>
));
```

Affichons les résultats

```js
return <ul>{listeItems}</ul>;
```

---

## Note sur les fonctions flèches

Si on écrit une fonction fèche avec accolades {}, il faut mettre le `return` explicitement.

```js
const listeItems = artistes.map((personne) => {
  return <li>...</li>;
});
```

Si on écrit une fonction flèche sans accolades, le `return` est implicite et il ne faut pas l'écrire.

```js
const listeItems = artistes.map(personne =>
  <li>...</li>;
);
```

## Gérer les clés

Si on oublie de spécifier une `key` unique, un message est affiché dans la console

<p style={{ color: 'red' }}>
  Warning: Each child in a list should have a unique “key” prop.
</p>

Pour éliminer le message, il faut utiliser une clé unique.
Il faut fournir cela pour n'importe quel tableau de JSX, incluant le `map`.

Ceci améliore les performances si on doit trier, ajouter ou enlever
des éléments. Ceci permet à React de mieux comprendre ce qui a été modifié.

---

## D'où proviennent les clés

1. Prendre la clé de la base de données quand les données proviennent d'une BD
2. Si les données sont locales, on génère nos propres clés avec un `counter`, `crypto.randomUUID()` ou le package `uuid`.

**Important**

- Les clés doivent être uniques
- Les clés doivent être immuables, elles ne doivent pas être changées, ni regénérées.

- `key` n'est PAS une prop, mais une caractéristique utilisée par React. Si la composante
  a besoin de cette info, il faut alors créer une prop avec un autre nom.
  ex: `<Profile key={id} userId={id} />`.

---

### Défi 16

Voici une liste de personnalités. Modifiez cette liste pour avoir 2 listes: une liste d'artistes, et une liste de tous les autres. On détermine un artiste avec `personne.profession === 'artiste'`

<Sandpack>

```js App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

```js data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js utils.js
export function getImageUrl(personne) {
  return (
    'https://upload.wikimedia.org/wikipedia/commons/thumb/' +
    personne.imageId
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

---
### Défi 17

Réalisez une liste de recettes! Pour chaque recette, affichez son nom et sa liste d'ingrédients. Affichez le nom dans un `<h2>` et les ingrédients dans un `<ul>`.

<Sandpack>

```js App.js
import { recettes } from './data.js';

export default function ListeRecettes() {
  return (
    <div>
      <h1>Recettes</h1>
    </div>
  );
}
```

```js data.js
export const recettes = [{
  id: 'greek-salad',
  name: 'Salade grecque',
  ingredients: ['tomates', 'concombres', 'oignon', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Pizza hawaïenne',
  ingredients: ['croute à pizza', 'sauce pizza', 'mozzarella', 'jambon', 'ananas']
}, {
  id: 'hummus',
  name: 'Houmous',
  ingredients: ['pois chiches', "huile d'olive", "gousses d'ail", 'citron', 'tahini']
}];
```

</Sandpack>

---

### Défi 18
Le composant `ListeRecettes` contient deux `map` imbriqués. Pour simplifier, ajoutez un composant `Recette` qui accepte les props `id`, `name` et `ingredients`. N'oubliez pas de gérer le `key`.

<Sandpack>

```js App.js
import { recettes } from './data.js';

export default function ListeRecettes() {
  return (
    <div>
      <h1>Recettes</h1>
      {recettes.map(recette =>
        <div key={recette.id}>
          <h2>{recette.name}</h2>
          <ul>
            {recette.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js data.js
export const recettes = [{
  id: 'greek-salad',
  name: 'Salade grecque',
  ingredients: ['tomates', 'concombres', 'oignon', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Pizza hawaïenne',
  ingredients: ['croute à pizza', 'sauce pizza', 'mozzarella', 'jambon', 'ananas']
}, {
  id: 'hummus',
  name: 'Houmous',
  ingredients: ['pois chiches', "huile d'olive", "gousses d'ail", 'citron', 'tahini']
}];
```

</Sandpack>

---
### Défi 19

Cet exemple affiche un haïku, chaque ligne est englobée par un `<p>`. Il faut ajouter des séparateurs `<hr />` entre chaque paragraphe. Le résultat doit être:

```js
<article>
  <p>au vent de la mer</p>
  <hr />
  <p>ondulation des épis</p>
  <hr />
  <p>en vagues vertes</p>
</article>
```

Un haïku contient trois lignes, mais votre solution doit fonctionner avec des haïku de longueur variable. Notez que `<hr />` s'affiche entre les `<p>`, pas au début ni à la fin.



<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.',
  ],
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

---

## Composant doivent être purs

En informatique, une fonction pure est une fonction sans effets de bord, sans effets secondaires.

Voici une fonction pure:

```js
function doubler(nombre) {
  return 2 * nombre;
}
```

React assume que chaque composant que vous créez est pur.
Pour la même "entrée", on obtient toujours le même résultat.

Voici un exmple qui respecte la règle:

```js
function Recipe({ drinkers }) {
  return (
    <ol>
      <li>Bouillir {drinkers} tasses d'eau</li>
      <li>Ajouter {drinkers} cuillères à soupe de thé,
      <li>Ajouter {0.5 * drinkers} cuillères à soupe d'épices</li>
      <li>Ajouter {0.5 * drinkers} tasses de lait à ébulition</li>
      <li>Sucrer au besoin</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Recette de thé Chai</h1>
      <h2>Pour deux personnes</h2>
      <Recipe drinkers={2} />
      <h2>Pour un groupe</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```

---

## Effets de bord

Faire le rendu d'un composant devrait seulement générer du JSX.
On ne devrait jamais changer les variables ou les objets qui existent AVANT
le rendu.

Voici un composant qui brise la règle:

```js
let guest = 0;

function Cup() {
  // Mauvais: on modifie une variable existante!
  guest = guest + 1;
  return <h2>Tasse pour l'invité #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
```

Pour réparer, on pourrait utiliser des props:

```js
function Cup({ guest }) {
  return <h2>Tasse pour l'invité #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

---

## Mode Strict

Il est plus simple de détecter quand le rendu provoque des effets de bord avec le `StrictMode.

Avec le `StrictMode`, quand on est en mode développement, chaque composant est rendu 2 fois. Ça rend (parfois) les effets de bord plus visible.

`StrictMode` sera ignoré en production.

---

## Mutation locale

La mutation locale est permise. C'est la mutation de variables préexistantes qui n'est pas permise.

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

Le code précédent est correct, car cups est une variable locale. On peut modifier les variables locales sans problème.

Si cups était une variable globale, ce serait mauvais.

## Où placer les effets de bords

Parfois, il est nécessaire d'utiliser des effets de bord.

On peut alors utiliser les gestionnaires d'événements (event handlers), tel que onClick ou onChange.

Aussi, il est possible de référer une fonction dans `useEffect`, qui exécute alors immédiatement après le rendu. (En dernier recours.)

---

## Exercices

---
### Défi 20

Ce composant tente de modifier la classe de `<h1>` quand il est entre minuit et 6 heures vers "night", sinon vers "day" le reste de la journée. Ça ne marche pas. Peut-on réparer?

Testez en changeant l'heure de la nuit dans code, ou en changeant temporairement votre fuseau horaire.


<Sandpack>

```js Clock.js active
export default function Clock({ time }) {
  let hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
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
    <Clock time={time} />
  );
}
```

```css
body > * {
  width: 100%;
  height: 100%;
}
.day {
  background: #fff;
  color: #222;
}
.night {
  background: #222;
  color: #fff;
}
```

</Sandpack>

---

### Défi 21

Les composants `Profile` sont rendus côte-à-côte.  Dès qu'on interagit avec le bouton du premier profil, les données sont corrompues.  

Il faut réparer ce code.  


<Sandpack>

```js Profile.js active
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

let currentPerson;

export default function Profile({ person }) {
  currentPerson = person;
  return (
    <Panel>
      <Header />
      <Avatar />
    </Panel>
  )
}

function Header() {
  return <h1>{currentPerson.name}</h1>;
}

function Avatar() {
  return (
    <img
      className="avatar"
      src={getImageUrl(currentPerson)}
      alt={currentPerson.name}
      width={50}
      height={50}
    />
  );
}
```

```js Panel.js hidden
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}
```

```js App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  )
}
```

```js utils.js hidden
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; }
.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  width: 200px;
}
h1 { margin: 5px; font-size: 18px; }
```

</Sandpack>

---

### Défi 22

Sur votre composant d'horloge, on demande d'afficher les derniers "témoignages". Vous avez un composant "RangéeTémoignages" qui prend une liste de "témoignages". Vous ajoutez un "Ajoutez témoignage" au bout de cette liste. Ouille! Ceci génère un doublon. Comment réparer? 

<Sandpack>

```js RangéeTémoignage.js active
export default function RangéeTémoignage({ témoignage }) {
  témoignage.push({
    id: 'create',
    label: 'Ajouter témoignage'
  });

  return (
    <ul>
      {témoignages.map(témoignage => (
        <li key={témoignage.id}>
          {témoignage.label}
        </li>
      ))}
    </ul>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import RangéeTémoignage from './RangéeTémoignage.js';

let témoignageInitiaux = [
  {id: 0, label: "Témoignage de Sophie" },
  {id: 1, label: "Témoignage de Luc" },
];

export default function App() {
  let [témoignages, setTémoignages] = useState([...témoignageInitiaux])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (témoignages.length > 100) {
    témoignages.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>Il est maintenant {time.toLocaleTimeString()}.</h2>
      <RangéeTémoignages témoignages={témoignages} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

</Sandpack>
