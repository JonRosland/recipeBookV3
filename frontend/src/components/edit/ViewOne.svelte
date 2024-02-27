<script>
    import {
        recipeStore,
        storeUpdateRecipe,
        storeIsRecipe,
    } from "../../stores/recipeStore.js";
    import Button from "../Button.svelte";

    export let title = "";
    export let element = "";

    let newValue = "";
    function updateElement() {
        storeUpdateRecipe(element, newValue);
        newValue = "";
    }

    let view = [];
    $: if ($storeIsRecipe) {
        view = $recipeStore[element];
    }
</script>

<section class={element}>
    <h3>{title}</h3>
    <div>
        <input bind:value={newValue} placeholder={"Legg til " + title} />
        <Button label={"Legg til " + title} onClick={updateElement} />
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
        flex: 2 1 40%;
        min-width: 300px;
    }
</style>
