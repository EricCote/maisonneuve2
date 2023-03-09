---
title: 'Formation 6'
date: '2023-03-04'
slug: 'cours6'
---

## Contenu du cours

### pour React
- Afficher des détails additionnels lorsqu'on clique un élément du cours
- filtrer avec `filter()`
- trier avec `sort()`
- Il ne faut pas muter les objets ou les tableaux stockés dans l'état.
  - Mais la méthode `sort` fait une mutation, il faut donc cloner le tableau avant de faire le tri
- Faire de la gestion d'erreur avec le `fetch`


---

### Spécifique à React Router

- Faire de l'affichage des erreurs javascript avec la propriété de route `errorElement` et le composant `<ErrorBoundary>`
- Gérer le chargement via la propriété `loader`. Ceci permet à l'engin de routage de faire le chargement, sans avoir besoin de gérer de l'état (state) et des effets `useEffect`. Cela simplifie grandement la création de nos pages. 
- Gérer l'affichage partiel avec un "spinner". Nous utilisons `defer`, `<Async>` et `<Suspense>` pour permettre d'avoir un disque rotatif quand les données ne sont pas arrivées. 
- Gérer la modification de données via la propriété `action`. L'usage de cette propriété est un peu plus complexe.  
  - Nous y reviendrons au prochain cours.  


## devoir 6

- Prendre le projet courant
- Si vous n'avez plus le projet voici les étapes pour le restaurer:
  - se placer dans un dossier général de projets.
  - lancer la commande `git clone https://github.com/EricCote/React-Manual-Routing-Navigation.git`
  - faire un cd dans le dossier qu'on vient de cloner `cd React-Manual-Routing-Navigation`
  - lancer vs code dans le dossier courant (. point) `code .`
  - Dans un terminal, restaurer les dépendances:  `npm install`

- Ouvrir le projet dans vscode (C'est probablement déjà fait)
- Faite un `git pull` ou cliquer sur l'icone avec des flèches en bas pour syncroniser le projet avec github.
  - gérer les conflits pour être capable de compléter la synchronisation.
- Lancer le projet: `npm run dev`
- Nous allons continuer le devoir 5. 
  - Vous devriez avoir une page qui va chercher des données via fetch, dans une fonction qui est appelée par un `useEffect()`

---
Nous avons 3 objectifs:

1. Utiliser la propriété `loader` de la route pour simplifer le chargement.
2. Ajouter du state pour faire du filtre
3. Ajouter du state 

--- 

- Coupez la fonction de chargement, et déplacez-la dans le fichier suivant: `/src/react-router/router.jsx`;
- Dans le nouveau fichier,  modifiez le code de chargement.  
  - La dernière ligne est du genre `setState(data)`.  
  - Il faut enlever ce setState et le remplacer par un `return data`
- Dans l'objet route, ajoutez la propriété loader et référez la fonction que vous venez de créer. 
  - ex: `loader: chargerDonnées`
  - Attention, c'est une référence, pas un appel. Ne pas écrire: `loader: chargerDonnées()`    
- Dans le composant original, on modifie le code, on enlève l'état (le state), et on le remplace avec un les données du loader: 
  - on onlève par exemple: `const [data, setData] =  useState([]);``
  - on remplace par: `const data = useLoaderData()`
- Enlever tous les endroits où l'on appelle l'ancien `setState` : la fonction `loader()` et le `useEffect()`.
- Corrigez les imports.

---

Ajoutez la fonction pour filtrer. 

Inspirez-vous du code dans `src/films/indexWithRouteLoaderSort.jsx`

---

Ajoutez la fonction pour trier.

Inspirez-vous du code dans  `src/films/indexWithRouteLoaderSort.jsx`

 ---

**Défi avancé:**  utilisez du code pour filtrer et trier sur le serveur (si c'est permis)

Il faudra  probablement utiliser l'objet request pour modifier la requête vers le serveur.  Il faudra lire la documentation:
https://reactrouter.com/en/main/route/loader#request

Bonne chance!

