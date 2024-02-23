<script>
    import {
        recipeStore,
        updateRecipe,
        isRecipe,
    } from "../../stores/recipeStore.js";
    import Button from "../Button.svelte";

    export let title = "";
    export let element = "";

    let newValue = "";
    function updateElement() {
        updateRecipe(element, newValue);
        newValue = "";
    }

    let view = [];
    $: if ($isRecipe) {
        view = $recipeStore[element];
    }
</script>

<section class={element}>
    <h3>{title}</h3>
    <div>
        <input bind:value={newValue} placeholder={"Legg til " + title} />
        <Button label={"Add " + title} onClick={updateElement} />
    </div>
    <div class="textLeft">
        <h4>{view}</h4>
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
</style>
