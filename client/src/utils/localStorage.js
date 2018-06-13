// Instruction on how to implement localStorage in this manner is found from egghead.io
// "Redux: Presisting the State to the Local Storage" by Dan Abramov
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// General explanation of localStorage on MDN: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

// I'll be writing comments to explain to myself how this works.

// Function to load state from localStorage
export const loadState = () => {
  /* try/catch is used to control errors, especially if an error is expected in some situations and you have code that you want to run in response to an error. JS will run anything within `try` as normal, but immediately excecute code in `catch` if it encounters an exception (synonymous with error?) at any point within try */
  try {
    // We will try to get the state saved in local storage
    const serializedState = localStorage.getItem('state');
    // If 'state' doesn't exist in local storage, we want to return undefined.
    // This undefined will ultimately get passed as the initial state in `setStore` in index.js, resulting in a blank slate. This is preferable over yelling and crashing.
    if (serializedState === null) {
      return undefined;
    }
    // If we got this far, it exists! It's saved as a JSON stsring, so let's convert it back to a JS object,then set it as our initial state for `setStore` to accept.
    return JSON.parse(serializedState);
  // If there's an exception thrown anytime in this process,we'll treat it the same as if the state doesn't exist in localStorage
  } catch(err) {
    // Once again, we'll have a clean slate instead of a crash if an exception arises.
    return undefined;
  }
  // Try/catch feels a lot like Promises. I wonder if we can use Promises to do the same thing?
  // According to this, https://stackoverflow.com/a/42650428, Promises should be used only for ascynchronous operations. Synchronous operations should use try/catch.
};

// Function to save state to localStorage
// `saveState` accepts an object which represents state or store. You can pass the whole darn thing in there, or if you don't want all parts of the store to persist, you can pass a portion of it. The actual argument passing is done in index.js.
export const saveState = (state) => {
  // The process is the reverse of the above. We will take state and stringify it into JSON.
  // That JSON will then be saved into localStorage via `setItem`
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  // If there's an exception, we're just gonna ignore it. Sucks that we couldn't save to localStorage, but that function is not critical to our ToDo app, so it's best to let it go then let it crash and burn.
  } catch(err) {
    /* Do nothing. */
    // Though it's a good idea to log the error and see what is going on.
    console.error(err);
  }
}