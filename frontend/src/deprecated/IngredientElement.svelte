<script>
    //import { addElement } from "../../deprecated/UpdateRecipe.svelte";
    let newElement = { name: "", quantity: null, unit: "" };
    const element = "ingredient";

    function updateRecipe() {
        const result = addElement(element, editRecipe, newElement);
        editRecipe = result.editRecipe; // Update editRecipe with the returned object
        newElement = { name: "", quantity: null, unit: "" }; // Reset newElement to clear the input field
    }
</script>

<section class="ingredients elements">
    <h3>Ingredients</h3>
    <div class="ingredientsContent">
        <input bind:value={newElement.name} placeholder="Name" />
        <input
            type="number"
            bind:value={newElement.quantity}
            placeholder="Quantity"
        />
        <input bind:value={newElement.unit} placeholder="Unit" />
        <button on:click={() => updateRecipe()}>Add Ingredient</button>
    </div>
    <div class="textLeft">
        <ul>
            {#each editRecipe.ingredients as ingredient}
                <li>
                    {ingredient.name}
                    {ingredient.quantity}{ingredient.unit}
                </li>
            {/each}
        </ul>
    </div>
</section>

<style>
    section {
        border: 1px solid black;
        margin: 0 1em 1em 0;
        padding: 1em;
        box-sizing: border-box;
        flex: 2 1 40%; /* Grow to 40% of the container's width */
        min-width: 300px; /* Minimum width before wrapping */
    }
    button {
        border-radius: 4px;
        cursor: pointer;
    }
    button:hover {
        color: var(--btn-color--hover, var(--gray12));
        border-color: var(--btn-bd--hover, transparent);
        background-color: var(--btn-bg--hover, var(--gray4));
    }
</style>
