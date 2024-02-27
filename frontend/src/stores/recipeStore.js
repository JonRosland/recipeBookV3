import { atom } from 'nanostores';

/**
 * @typedef {Object} Ingredient
 * @property {string} name
 * @property {number} quantity
 * @property {string} unit
 */

/**
 * @typedef {Object} RecipeItem
 * @property {string} recipeName
 * @property {string} origin
 * @property {string} category
 * @property {number} portion
 * @property {string} region
 * @property {Ingredient[]} ingredients
 * @property {string[]} steps
 * @property {string[]} notes
 */


export const recipeStore = atom(() => (
    {
        recipeName: "",
        origin: "",
        category: "",
        portion: 0,
        region: "",
        ingredients: [],
        steps: [],
        notes: [],
    }
));

export const storeIsRecipe = atom(false);

export function storeUpdateRecipe(element, newValue) {
    const currentState = recipeStore.get();
    if (Array.isArray(currentState[element])) {
        const updatedArray = [...currentState[element], newValue];
        const updatedState = { ...currentState, [element]: updatedArray };
        recipeStore.set(updatedState);
    } else {
        const updatedState = { ...currentState, [element]: newValue };
        recipeStore.set(updatedState);
    }
}


export async function storeSetRecipe(editRecipe) {
    recipeStore.set(editRecipe);
    {/*return true;*/ }
}

export function storeGetRecipe() {
    return recipeStore.get();
}

export function storeSwapElements(element, index1, index2) {
    const currentState = recipeStore.get();
    if (Array.isArray(currentState[element])) {
        const newArray = [...currentState[element]];
        // Perform the swap
        [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
        const updatedState = { ...currentState, [element]: newArray };
        recipeStore.set(updatedState);
    }
}

export function storeDeleteElement(element, indexToDelete) {
    const currentState = recipeStore.get(); // Get the current state of the recipe

    // Check if the specified list is an array, exists in the current state, and the index is valid
    if (Array.isArray(currentState[element]) && indexToDelete >= 0 && indexToDelete < currentState[element].length) {
        // Create a new list without the element at the specified index
        const updatedList = [
            ...currentState[element].slice(0, indexToDelete),
            ...currentState[element].slice(indexToDelete + 1)
        ];

        // Update the store with the new list
        const updatedState = { ...currentState, [element]: updatedList };
        recipeStore.set(updatedState);
    }
}
