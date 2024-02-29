<script>
    import Improvement from "../Improvement.svelte";
    import {
        updateRecipeApi,
        getRecipeApi,
        postRecipeApi,
    } from "../APIFunctions.js";
    import Button from "../Button.svelte";
    import {
        isRecipeStore,
        setRecipeStore,
        getRecipeStore,
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
        console.log("1");
        editRecipe = await getRecipeApi(id);
        await setRecipeStore(editRecipe);
        isRecipeStore.set(true);
    }
    async function setNewRecipe() {
        console.log("2");
        await setRecipeStore(newRecipe);
        isRecipeStore.set(true);
    }

    if (id) {
        console.log("3");
        setRecipe();
    } else if (!id) {
        console.log("4");
        setNewRecipe();
    }

    async function saveRecipe() {
        console.log("5");
        let newRecipe = getRecipeStore();
        if (id) {
            console.log("6");
            await updateRecipeApi(editRecipe._id, newRecipe);
            alert("Oppskrift oppdatert");
        } else if (!id) {
            console.log("7");
            const idRecipe = await postRecipeApi(newRecipe);
            alert("Oppskrift lagret med id: " + idRecipe.recipe_id);
            window.location.href = "/edit/" + idRecipe.recipe_id;
        }
    }
    async function backToRecipe() {
        console.log("8");
        window.location.href = "/recipe/" + editRecipe._id;
    }
    function redirectAllRecipes() {
        console.log("9");
        window.location.href = "/";
    }
    console.log("10");
</script>

<div class="save">
    <Button label="Lagre endringer" onClick={saveRecipe} />
    <Button label="Tilbake til alle oppskrifer" onClick={redirectAllRecipes} />
    {#if id}
        <Button
            label="Tilbake til {editRecipe.recipeName}"
            onClick={backToRecipe}
        />{/if}
    <Improvement client:load />
</div>
