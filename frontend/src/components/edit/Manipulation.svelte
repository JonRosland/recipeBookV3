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
        editRecipe = await getRecipe(id);
        await setRecipe(editRecipe);
        isRecipe.set(true);
    }
    async function setNewRecipe() {
        await setRecipe(newRecipe);
        isRecipe.set(true);
    }

    if (id) {
        setRecipee();
    } else if (!id) {
        setNewRecipe();
    }

    async function saveRecipe() {
        if (id) {
            let newRecipe = getRecipee();
            await updateRecipe(editRecipe._id, newRecipe);
            alert("Oppskrift oppdatert");
        } else if (!id) {
            let newRecipe = getRecipee();
            const idRecipe = await postRecipe(newRecipe);
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
    <Button
        label="Tilbake til {editRecipe.recipeName}"
        onClick={backToRecipe}
    />
</div>
