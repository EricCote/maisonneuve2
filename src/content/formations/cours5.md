---
title: 'Formation 5'
date: '2023-03-04'
slug: 'cours5b'
---


## Matière 

- Créer un compteur
- Créer un Menu
- Créer une fonction de routage
  - Le but est de cacher ou montrer un composant d'après l'état `pageCourante` passé à la `Route`
- Créer un fichier app.jsx avec un état pour gérer la page visible
- Différentes version de app.jsx
  - Version **Naïve** qui provoque un appel réseau
    - ene profite pas du fait qu'on pourrait simplement cacher/montrer la bonne page/composant
  - Version **Hash**, qui utilise la fonction hash du navigateur
    - Version simple à programmer, mais qui affiche des liens avec le symbole '#'
  - Version **Navigate API**, qui utilise les derniers standards 
    - fonctionne seulement avec Chrome, Edge, et dérivés de Chromium. Ne fonctionne pas encore avec Firefox et Safari
  - Version **History API**, qui utilise une progrmmation plus complexe
    - Version recommandée encore pour quelques mois/années, en attendant que Navigate API soit stabilisé

- Utiliser useEffect() pour exécuter du code qui roule APRÈS le rendu. 
  - Ça permet de garder nos composantes des "fonctions pures"
  - Dans useEffect, on place le code impur, qui modifie le DOM     

- Ajouter une version de app.js qui appelle React-Router-Dom
  - C'est la librairie la plus populaire à utiliser. 

- Utiliser "Fetch API", une librairie intégrée à HTML5 pour télécharger des données de façon asynchrone. 
  - Avec l'asynchrone, on utilise soit la syntaxe "async/await", soit la syntaxe des promises 

- On utilise "Fetch API" pour télécharger des données externes, provenant d'un service REST. (Ex: une liste de films)

- Quand les données arrivent, on appelle le setState, ce qui provoque le re-rendu. 

- Avec le items.map, on affiche les données en jsx.


## Devoir 5

Utilisez le projet suivant:
```bash
git clone https://github.com/EricCote/React-Manual-Routing-Navigation.git
```

(C'est probablement déjà fait. Si c'est le cas, faites un "git pull" pour télécharger la dernière version sur github.)


```bash
# Déplacez-vous dans son dossier: 
cd React-Manual-Routing-Navigation

# Ouvrir Visual Studio Code avec le dossier courant '.'
code .

```

Avec VS Code on peut ouvrir une ligne de commande
```bash
# installe les dépendances dans dossier node_module
npm install

# démarrer un site web de dev
npm run dev

```

Déterminez quel services REST vou allez utiliser. Vous pouvez chercher des suggestion sur internet, sur google, ou sur cette page: https://github.com/public-apis/public-apis

---

AJoutez un Dossier avec votre nouvelle page. (Trouvez un nom qui a rapport à votre service. Par exemple, un service Météo pourrait être dans le dossier    `/meteo`)

Ajoutez un fichier index.jsx dans votre dossier. Dans ce fichier, créer une composante avec le bon nom. Dans le jsx, retournez un titre `<h1>`

Ajoutez une route dans le fichier `src/react-router/router.jsx`

Ajoutez un item de menu dans le fichier `src/react-router/menuRouter.jsx`

Testez pour voir si la page apparait.

---

Ajoutez une fonction asynchrone dans votre page pour charger le service REST avec l'API fetch. Ce code doit ultimement appeler `setState()` pour stocker les données JSON désérialisées.

Ajoutez un `useEffect()` pour appeler la fonction de chargement. Assurez vous que ce code n'est appelé qu'une seule fois, en utilisant le paramètre de "tableau de dépendance" vide. *(empty dependency array)*  Pour ce faire, il faut passer un second paramètre à `useEffect()` qui est un tableau vide: `[]`.

```js {3}
  useEffect(() => {
    chargerFilms();
  }, []);
```

**ATTENTION:** Si on oublie le paramètre du tableau vide, il y aura un nouveau chargement Fetch à chaque re-rendu, dans une boucle infinie. Ceci va créer des millions d'appels fetch, ce qui n'est pas très gentil. Le site du service REST pourrait considérer que c'est une attaque de "déni de service" *(denial of service)* et vous seriez mis sur la *blacklist* (liste noire). Vous ne pourriez plus utiliser ce service REST pendant des semaines, voire des mois (vous seriez donc obligés d'utiliser un autre service).   

Truc: Pour vous aider, vous pouvez utiliser `console.log` pour voir les valeurs retournées par le service REST.

Vous devez afficher le résultat dans le JSX du composant. 

Testez le résultat avec les données.

J'ai hâte de voir vos résultats.





