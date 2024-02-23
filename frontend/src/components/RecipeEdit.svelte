<script>
    export let editRecipe = {
        recipeName: "recipeName",
        origin: "Origin",
        category: "Category",
        portion: 0,
        region: "region",
        ingredients: [],
        steps: [],
        notes: [],
    };

    function addElement(element) {
        if (
            element === "ingredient" &&
            newIngredient.name &&
            newIngredient.quantity &&
            newIngredient.unit
        ) {
            editRecipe.ingredients = [...editRecipe.ingredients, newIngredient];
            newIngredient = { name: "", quantity: null, unit: "" };
        } else if (editRecipe[element] && Array.isArray(editRecipe[element])) {
            editRecipe[element] = [...editRecipe[element], newElement];
            newElement = "";
        } else if (
            editRecipe[element] &&
            (typeof editRecipe[element] === "string" ||
                typeof editRecipe[element] === "number")
        ) {
            editRecipe[element] = newElement;
            newElement = "";
        } else {
            console.error(
                `Category ${element} does not exist or is not an array`,
            );
        }
    }
    let newElement = "";
    let newIngredient = { name: "", quantity: null, unit: "" };
    function discardChanges() {
        editRecipe = { ...recipe };
    }

    function redirectAllRecipes() {
        window.location.href = "/";
    }

    async function saveRecipe() {
        try {
            console.log(JSON.stringify(editRecipe));
            const response = await fetch(
                `http://localhost:4000/api/` + editRecipe._id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editRecipe),
                },
            );

            if (!response.ok) {
                console.log(response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Success:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<main>
    <div class="content">
        <section class="ingredients elements">
            <h3>Ingredients</h3>
            <div class="ingredientsContent">
                <input bind:value={newIngredient.name} placeholder="Name" />
                <input
                    type="number"
                    bind:value={newIngredient.quantity}
                    placeholder="Quantity"
                />
                <input bind:value={newIngredient.unit} placeholder="Unit" />
                <button
                    on:click={() => addElement("ingredient")}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Add Ingredient</button
                >
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

        <section class="method elements">
            <h3>Fremgangsmåte</h3>
            <div>
                <input bind:value={newElement} placeholder="Fremgangsmåte" />
                <button
                    on:click={() => addElement("steps")}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Add Step</button
                >
            </div>
            <div class="textLeft">
                <ul>
                    {#each editRecipe.steps as step}
                        <li>
                            {step}
                        </li>
                    {/each}
                </ul>
            </div>
        </section>

        <section class="notes elements">
            <h3>Notater</h3>
            <div>
                <input bind:value={newElement} placeholder="Notat" />
                <button
                    on:click={() => addElement("notes")}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Add Note</button
                >
            </div>
            <div class="textLeft">
                <ul>
                    {#each editRecipe.notes as note}
                        <li>
                            {note}
                        </li>
                    {/each}
                </ul>
            </div>
        </section>
        <section class="origin elements">
            <h3>Opphav</h3>
            <div>
                <input bind:value={newElement} placeholder="Opphav" />
                <button
                    on:click={() => addElement("origin")}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Add Ophav</button
                >
            </div>
            <div class="textLeft">
                <h4>{editRecipe.origin}</h4>
            </div>
        </section>
        <section class="recipeName elemets">
            <h3>Oppskrift Navn</h3>
            <div>
                <input bind:value={newElement} placeholder="Oppskrift Navn" />
                <button
                    on:click={() => addElement("recipeName")}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Add Name</button
                >
            </div>
            <div class="textLeft">
                <h4>{editRecipe.recipeName}</h4>
            </div>
        </section>
        <section class="portion elements">
            <h3>Porsjoner</h3>
            <div>
                <input
                    type="number"
                    bind:value={newElement}
                    placeholder="Antall porsjoner"
                />
                <button
                    on:click={() => addElement("portion")}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Add Porsjoner</button
                >
            </div>
            <div class="textLeft">
                <h4>{editRecipe.portion}</h4>
            </div>
        </section>
        <section class="category elements">
            <h3>category</h3>
            <div>
                <input bind:value={newElement} placeholder="Kategori" />
                <button
                    on:click={() => addElement("category")}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Add Kategori</button
                >
            </div>
            <div class="textLeft">
                <h4>{editRecipe.category}</h4>
            </div>
        </section>
        <section class="region elements">
            <h3>Region</h3>
            <div>
                <input bind:value={newElement} placeholder="Region" />
                <button
                    on:click={() => addElement("region")}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Add Region</button
                >
            </div>
            <div class="textLeft">
                <h4>{editRecipe.region}</h4>
            </div>
        </section>
        <section class="save elements">
            <h3>Save</h3>
            <div>
                <button
                    on:click={() => saveRecipe()}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Lagre Oppskrift</button
                >
                <button
                    on:click={() => discardChanges()}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Slett Endringer</button
                >
                <button
                    on:click={() => redirectAllRecipes()}
                    style="border: 2px solid black; padding: 5px 10px;"
                    >Tilbake til alle oppskrifter</button
                >
            </div>
        </section>
    </div>
</main>

<style>
    .content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: minmax(100px, auto);
        grid-template-areas:
            "ingredient method notes"
            "origin recipeName portion"
            "category regionn save";
    }

    .ingredients {
        grid-area: ingredient;
    }

    .method {
        grid-area: method;
    }

    .notes {
        grid-area: notes;
    }

    .origin {
        grid-area: origin;
    }

    .recipeName {
        grid-area: recipeName;
    }

    .portion {
        grid-area: portion;
    }

    .category {
        grid-area: category;
    }

    .region {
        grid-area: regionn;
    }

    .save {
        grid-area: save;
    }

    section {
        border: 1px solid black;
        margin: 0 1em 1em 0;
        padding: 1em;
        box-sizing: border-box;
        flex: 2 1 40%; /* Grow to 40% of the container's width */
        min-width: 300px; /* Minimum width before wrapping */
    }
    .textLeft {
        text-align: left;
    }

    ul {
        list-style: none;
        padding: 0;
    }
</style>
