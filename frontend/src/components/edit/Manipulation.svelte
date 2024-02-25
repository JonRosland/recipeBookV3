<script>
    import { updateRecipe, getRecipe, postRecipe } from "../APIFunctions.js";
    import Button from "../Button.svelte";
    import {
        isRecipe,
        setRecipe,
        getRecipee,
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
    async function setRecipee() {
        console.log("log");
        editRecipe = await getRecipe(id);
        console.log(editRecipe);
        await setRecipe(editRecipe);
        console.log(getRecipee());
        isRecipe.set(true);
        console.log(isRecipe.get());
    }
    async function setNewRecipe() {
        await setRecipe(newRecipe);
        isRecipe.set(true);
    }

    if (id) {
        console.log("id: " + id);
        setRecipee();
    } else if (!id) {
        console.log("not id: " + id);
        setNewRecipe();
    }
    console.log("past id");

    async function saveRecipe() {
        console.log("button pressedd");
        if (id) {
            console.log("har id");
            let newRecipe = getRecipee();
            await updateRecipe(editRecipe._id, newRecipe);
            alert("Oppskrift oppdatert");
        } else if (!id) {
            console.log("not id");
            let newRecipe = getRecipee();
            console.log("not id2");
            const idRecipe = await postRecipe(newRecipe);
            console.log("not id3");
            alert("Oppskrift lagret med id: " + idRecipe.recipe_id);
            window.location.href = "/edit/" + idRecipe.recipe_id;
        }
    }
    async function backToRecipe() {
        window.location.href = "/recipe/" + editRecipe._id;
    }
    function redirectAllRecipes() {
        console.log("redirect");
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
