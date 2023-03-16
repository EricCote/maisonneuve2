
Trois techniques pour les les valeurs d'un fomulaire:

1. Utiliser le state (génère des rerendus pour chaque lettre tapée)
2. Utiliser les refs (on utilise autant de ref que d'éléments dans le formulaire)
3. Utiliser le submit d'un formulaire, et lire les infos via le FormData du formulaire (le choix le plus sensé pour des formulaires complexes)
 
On peut convertir le FormData en objet javascript via l'instruction Object.fromEntries(formData);
```js
const formData = new FormData(form); //on obtient le formData du formulaire "form"
const data = Object.fromEntries(formData);  //On converti le formData en objet js
```   
