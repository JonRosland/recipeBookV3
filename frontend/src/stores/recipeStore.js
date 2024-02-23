import { atom, map } from 'nanostores';

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

export const isRecipe = atom(false);

export function updateRecipe(element, newValue) {
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


export async function setRecipe(editRecipe) {
    recipeStore.set(editRecipe);
    {/*return true;*/ }
}

export function getRecipee() {
    return recipeStore.get();
}


export function swapElements(element, index1, index2) {
    const currentState = recipeStore.get();
    if (Array.isArray(currentState[element])) {
        const newArray = [...currentState[element]];
        // Perform the swap
        [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
        const updatedState = { ...currentState, [element]: newArray };
        recipeStore.set(updatedState);
    }
}