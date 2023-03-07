---
title: 'Formation 5 b'
date: '2023-03-04'
slug: 'cours5b'
---


## Réagir aux saisies avec l'état

React utilise une approche déclarative pour manipuler l'interface. Plutôt que de manipuler des pièces individuelles de l'interface, on décrit les états du composants, et on bascule d'après les interaction de l'usager. 

## Comparer l'approche déclarative et impérative

Quand on conçoit des interactions, on pense à comment l'interface *change* en réaction aux actions d'un usager. Considérez un fomulaire avec lequel l'usager envoie une réponse.

* Quand on tape dans le formulaire, le bouton "Envoyer" **devient actif.**
* Quand on presse "Envoyer", le bouton et le formulaire **sont désactivés** et un disque rotatif **apparait.**
* Si la requête réseau complète avec succès, le formulaire **est chaché** et le message "Merci" **apparait**. 
* Si la requète réseau échoue, un message d'erreur **apparait** et le formulaire est **réactivé**.

En **programmation impérative**, ces verbes correspondent à comment implanter l'interaction. Il faut traduire ces verbes en instructions et séquences dans un langage de programmation. 

Cela ressembe à ceci quand on donne des instructions impératives pour trouver notre destination:

<Illustration src="/images/docs/illustrations/i_imperative-ui-programming.png"  alt="In a car driven by an anxious-looking person representing JavaScript, a passenger orders the driver to execute a sequence of complicated turn by turn navigations." />

Ça se nomme programmation *impérative* car il faut donner une "commande" pour chaque bout de résultat. Du plateau rotatif au bouton, il faut expliquer *comment* modifier l'interface.

Voici un exemple de formulaire impératif **sans** React. Cela utilise le [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model):


<Sandpack>

```js index.js active
async function handleFormSubmit(e) {
  e.preventDefault();
  disable(textarea);
  disable(button);
  show(loadingMessage);
  hide(errorMessage);
  try {
    await submitForm(textarea.value);
    show(successMessage);
    hide(form);
  } catch (err) {
    show(errorMessage);
    errorMessage.textContent = err.message;
  } finally {
    hide(loadingMessage);
    enable(textarea);
    enable(button);
  }
}

function handleTextareaChange() {
  if (textarea.value.length === 0) {
    disable(button);
  } else {
    enable(button);
  }
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

function enable(el) {
  el.disabled = false;
}

function disable(el) {
  el.disabled = true;
}

function submitForm(answer) {
  // Faire semblant de communiquer avec le réseau
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() == 'ottawa') {
        resolve();
      } else {
        reject(new Error("Bien essayé mais c'est la mauvaise réponse. Tentez à nouveau!"));
      }
    }, 1500);
  });
}

let form = document.getElementById('form');
let textarea = document.getElementById('textarea');
let button = document.getElementById('button');
let loadingMessage = document.getElementById('loading');
let errorMessage = document.getElementById('error');
let successMessage = document.getElementById('success');
form.onsubmit = handleFormSubmit;
textarea.oninput = handleTextareaChange;
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

```html public/index.html
<form id="form">
  <h2>Quiz</h2>
  <p>
    Quelle est la capitale du Canada?
  </p>
  <textarea id="textarea"></textarea>
  <br />
  <button id="button" disabled>Envoyer</button>
  <p id="loading" style="display: none">Chargement...</p>
  <p id="error" style="display: none; color: red;"></p>
</form>
<h1 id="success" style="display: none">C'est exact!</h1>

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
</style>
```

</Sandpack>

Manipuler l'interface de façon impérative fonctionne pour de petits exemples isolés. Mais cela devient compliqué pour des exemples plus complexes. 

React a été conçu pour résouddre ce genre de problème.

En React, on ne manipule pas l'interface. On ne désactive pas, on ne cache pas, on n'affiche pas.  Ce qu'on fait, on **déclare ce que l'on veut montrer** et React détermine comment mettre à jour l'interface. C'est comme entrer dans un taxi, donner la destination, et laisser le chauffeur (React) déterminer le meilleur chemin. Il est fort possible que le conducteur connaisse des raccourcis.

<Illustration src="/images/docs/illustrations/i_declarative-ui-programming.png" alt="In a car driven by React, a passenger asks to be taken to a specific place on the map. React figures out how to do that." />

## Penser déclarativment

Nous avons prendre l'exemple impératif et le convertir en React. Voici les étapes:

1. **Identifiez** les différents états visuels du composant
2. **Déterminez** ce qui provoque ces changements
3. **Modélisez** l'état en mémoire avec `useState`
4. **Enlevez** toute variable d'état non-nécessaire
5. **Connectez** les gestionnaires d'événements à l'état

### Step 1: Identify your component's different visual states {/*step-1-identify-your-components-different-visual-states*/}

In computer science, you may hear about a ["state machine"](https://en.wikipedia.org/wiki/Finite-state_machine) being in one of several “states”. If you work with a designer, you may have seen mockups for different "visual states". React stands at the intersection of design and computer science, so both of these ideas are sources of inspiration.

First, you need to visualize all the different "states" of the UI the user might see:

* **Empty**: Form has a disabled "Submit" button.
* **Typing**: Form has an enabled "Submit" button.
* **Submitting**: Form is completely disabled. Spinner is shown.
* **Success**: "Thank you" message is shown instead of a form.
* **Error**: Same as Typing state, but with an extra error message.

Just like a designer, you'll want to "mock up" or create "mocks" for the different states before you add logic. For example, here is a mock for just the visual part of the form. This mock is controlled by a prop called `status` with a default value of `'empty'`:

<Sandpack>

```js
export default function Form({
  status = 'vide'
}) {
  if (status === 'succès') {
    return <h1>C'est exact!</h1>
  }
  return (
    <>
      <h2>Quiz</h2>
      <p>
        Quelle est la capitale du Canada?
      </p>
      <form>
        <textarea />
        <br />
        <button>
          Envoyer
        </button>
      </form>
    </>
  )
}
```

</Sandpack>

You could call that prop anything you like, the naming is not important. Try editing `status = 'empty'` to `status = 'success'` to see the success message appear. Mocking lets you quickly iterate on the UI before you wire up any logic. Here is a more fleshed out prototype of the same component, still "controlled" by the `status` prop:

<Sandpack>

```js
export default function Form({
  // Essayez 'envoi', 'erreur', 'succès':
  status = 'vide'
}) {
  if (status === 'succès') {
    return <h1>C'est exact!</h1>
  }
  return (
    <>
      <h2>Quiz</h2>
      <p>
        Quelle est la capitale du Canada?
      </p>
      <form>
        <textarea disabled={
          status === 'envoi'
        } />
        <br />
        <button disabled={
          status === 'vide' ||
          status === 'envoi'
        }>
          Envoyer
        </button>
        {status === 'erreur' &&
          <p className="Error">
            Bien essayé mais c'est la mauvaise réponse. Tentez à nouveau!
          </p>
        }
      </form>
      </>
  );
}
```

```css
.Error { color: red; }
```

</Sandpack>

<DeepDive>

#### Displaying many visual states at once {/*displaying-many-visual-states-at-once*/}

If a component has a lot of visual states, it can be convenient to show them all on one page:

<Sandpack>

```js App.js active
import Form from './Form.js';

let statuses = [
  'vide',
  'taper',
  'envoi',
  'succès',
  'erreur',
];

export default function App() {
  return (
    <>
      {statuses.map(status => (
        <section key={status}>
          <h4>Formulaire ({status}):</h4>
          <Form status={status} />
        </section>
      ))}
    </>
  );
}
```

```js Form.js
export default function Form({ status }) {
  if (status === 'succès') {
    return <h1>C'est exact!</h1>
  }
  return (
    <form>
      <textarea disabled={
        status === 'envoi'
      } />
      <br />
      <button disabled={
        status === 'vide' ||
        status === 'envoi'
      }>
        Submit
      </button>
      {status === 'erreur' &&
        <p className="Error">
          Bien essayé mais c'est la mauvaise réponse. Tentez à nouveau!
        </p>
      }
    </form>
  );
}
```

```css
section { border-bottom: 1px solid #aaa; padding: 20px; }
h4 { color: #222; }
body { margin: 0; }
.Error { color: red; }
```

</Sandpack>

Pages like this are often called "living styleguides" or "storybooks".

</DeepDive>

### Step 2: Determine what triggers those state changes {/*step-2-determine-what-triggers-those-state-changes*/}

You can trigger state updates in response to two kinds of inputs:

* **Human inputs,** like clicking a button, typing in a field, navigating a link.
* **Computer inputs,** like a network response arriving, a timeout completing, an image loading.

<IllustrationBlock>
  <Illustration caption="Human inputs" alt="A finger." src="/images/docs/illustrations/i_inputs1.png" />
  <Illustration caption="Computer inputs" alt="Ones and zeroes." src="/images/docs/illustrations/i_inputs2.png" />
</IllustrationBlock>

In both cases, **you must set [state variables](/learn/state-a-components-memory#anatomy-of-usestate) to update the UI.** For the form you're developing, you will need to change state in response to a few different inputs:

* **Changing the text input** (human) should switch it from the *Empty* state to the *Typing* state or back, depending on whether the text box is empty or not.
* **Clicking the Submit button** (human) should switch it to the *Submitting* state.
* **Successful network response** (computer) should switch it to the *Success* state.
* **Failed network response** (computer) should switch it to the *Error* state with the matching error message.

> Notice that human inputs often require [event handlers](/learn/responding-to-events)!

To help visualize this flow, try drawing each state on paper as a labeled circle, and each change between two states as an arrow. You can sketch out many flows this way and sort out bugs long before implementation.

<DiagramGroup>

<Diagram name="responding_to_input_flow" height={350} width={688} alt="Flow chart moving left to right with 5 nodes. The first node labeled 'empty' has one edge labeled 'start typing' connected to a node labeled 'typing'. That node has one edge labeled 'press submit' connected to a node labeled 'submitting', which has two edges. The left edge is labeled 'network error' connecting to a node labeled 'error'. The right edge is labeled 'network success' connecting to a node labeled 'success'.">

Form states

</Diagram>

</DiagramGroup>

### Step 3: Represent the state in memory with `useState` {/*step-3-represent-the-state-in-memory-with-usestate*/}

Next you'll need to represent the visual states of your component in memory with [`useState`.](/reference/react/useState) Simplicity is key: each piece of state is a "moving piece", and **you want as few "moving pieces" as possible.** More complexity leads to more bugs!

Start with the state that *absolutely must* be there. For example, you'll need to store the `answer` for the input, and the `error` (if it exists) to store the last error:

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
```

Then, you'll need a state variable representing which one of the visual states described earlier you want to display. There's usually more than a single way to represent that in memory, so you'll need to experiment with it.

If you struggle to think of the best way immediately, start by adding enough state that you're *definitely* sure that all the possible visual states are covered:

```js
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

Your first idea likely won't be the best, but that's ok--refactoring state is a part of the process!

### Step 4: Remove any non-essential state variables {/*step-4-remove-any-non-essential-state-variables*/}

You want to avoid duplication in the state content so you're only tracking what is essential. Spending a little time on refactoring your state structure will make your components easier to understand, reduce duplication, and avoid unintended meanings. Your goal is to **prevent the cases where the state in memory doesn't represent any valid UI that you'd want a user to see.** (For example, you never want to show an error message and disable the input at the same time, or the user won't be able to correct the error!)

Here are some questions you can ask about your state variables:

* **Does this state cause a paradox?** For example, `isTyping` and `isSubmitting` can't both be `true`. A paradox usually means that the state is not constrained enough. There are four possible combinations of two booleans, but only three correspond to valid states. To remove the "impossible" state, you can combine these into a `status` that must be one of three values: `'typing'`, `'submitting'`, or `'success'`.
* **Is the same information available in another state variable already?** Another paradox: `isEmpty` and `isTyping` can't be `true` at the same time. By making them separate state variables, you risk them going out of sync and causing bugs. Fortunately, you can remove `isEmpty` and instead check `answer.length === 0`.
* **Can you get the same information from the inverse of another state variable?** `isError` is not needed because you can check `error !== null` instead.

After this clean-up, you're left with 3 (down from 7!) *essential* state variables:

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('taper'); // 'taper', 'envoi', ou 'succès'
```

You know they are essential, because you can't remove any of them without breaking the functionality.

<DeepDive>

#### Eliminating “impossible” states with a reducer {/*eliminating-impossible-states-with-a-reducer*/}

These three variables are a good enough representation of this form's state. However, there are still some intermediate states that don't fully make sense. For example, a non-null `error` doesn't make sense when `status` is `'success'`. To model the state more precisely, you can [extract it into a reducer.](/learn/extracting-state-logic-into-a-reducer) Reducers let you unify multiple state variables into a single object and consolidate all the related logic!

</DeepDive>

### Step 5: Connect the event handlers to set state {/*step-5-connect-the-event-handlers-to-set-state*/}

Lastly, create event handlers to set the state variables. Below is the final form, with all event handlers wired up:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('taper');

  if (status === 'succès') {
    return <h1>C'est exact!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('envoi');
    try {
      await submitForm(answer);
      setStatus('succès');
    } catch (err) {
      setStatus('taper');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>Quiz</h2>
      <p>
        Quelle est la capitale du Canada?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'envoi'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'envoi'
        }>
          Envoyer
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Prétendre qu'il y a un accès réseau.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'ottawa'
      if (shouldError) {
        reject(new Error("Bien essayé mais c'est la mauvaise réponse. Tentez à nouveau!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

```css
.Error { color: red; }
```

</Sandpack>

Although this code is longer than the original imperative example, it is much less fragile. Expressing all interactions as state changes lets you later introduce new visual states without breaking existing ones. It also lets you change what should be displayed in each state without changing the logic of the interaction itself.

<Recap>

* Declarative programming means describing the UI for each visual state rather than micromanaging the UI (imperative).
* When developing a component:
  1. Identify all its visual states.
  2. Determine the human and computer triggers for state changes.
  3. Model the state with `useState`.
  4. Remove non-essential state to avoid bugs and paradoxes.
  5. Connect the event handlers to set state.

</Recap>



