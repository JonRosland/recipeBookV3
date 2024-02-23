<script context="module">
    export function addElement(element, editRecipe, newElement) {
        if (
            element === "ingredient" &&
            newElement.name &&
            newElement.quantity &&
            newElement.unit
        ) {
            editRecipe.ingredients = [...editRecipe.ingredients, newElement];
        } else if (editRecipe[element] && Array.isArray(editRecipe[element])) {
            editRecipe[element] = [...editRecipe[element], newElement];
        } else if (
            (editRecipe[element] && typeof editRecipe[element] === "string") ||
            typeof editRecipe[element] === "number"
        ) {
            editRecipe[element] = newElement;
        } else {
            console.error(
                "Category " + element + " does not exist or is not an array",
            );
        }
        return { editRecipe };
    }
</script>
