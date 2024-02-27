<script>
    import {
        apiUpdateRecipe,
        apiGetRecipe,
        apiPostRecipe,
    } from "../APIFunctions.js";
    import Button from "../Button.svelte";
    import {
        storeIsRecipe,
        storeSetRecipe,
        storeGetRecipe,
    } from "../../stores/recipeStore.js";
    let newRecipe = {
        recipeName: "Oppskrift Navn",
        origin: "Feks Mor",
        category: "Feks Middag",
        portion: 0,
        region: "Feks Asiatisk",
        ingredients: [],
        steps: [],
        notes: [],
    };
    let editRecipe = {};
    export let id = "";
    async function setRecipe() {
        editRecipe = await apiGetRecipe(id);
        await storeSetRecipe(editRecipe);
        storeIsRecipe.set(true);
    }
    async function setNewRecipe() {
        await storeSetRecipe(newRecipe);
        storeIsRecipe.set(true);
    }

    if (id) {
        setRecipe();
    } else if (!id) {
        setNewRecipe();
    }

    async function saveRecipe() {
        if (id) {
            let newRecipe = storeGetRecipe();
            await apiUpdateRecipe(editRecipe._id, newRecipe);
            alert("Oppskrift oppdatert");
        } else if (!id) {
            let newRecipe = storeGetRecipe();
            const idRecipe = await apiPostRecipe(newRecipe);
            alert("Oppskrift lagret med id: " + idRecipe.recipe_id);
            window.location.href = "/edit/" + idRecipe.recipe_id;
        }
    }
    async function backToRecipe() {
        window.location.href = "/recipe/" + editRecipe._id;
    }
    function redirectAllRecipes() {
        window.location.href = "/";
    }
</script>

<div class="save">
    <Button label="Lagre endringer" onClick={saveRecipe} />
    <Button label="Tilbake til alle oppskrifer" onClick={redirectAllRecipes} />
    {#if id}
        <Button
            label="Tilbake til {editRecipe.recipeName}"
            onClick={backToRecipe}
        />{/if}
</div>
