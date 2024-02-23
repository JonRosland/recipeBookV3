export async function getRecipe(id) {
    try {
        const response = await fetch('http://localhost:4000/api/' + id);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching recipe:", error);
        throw error;
    }
}

export async function getRecipes() {
    try {
        const response = await fetch('http://localhost:4000/api/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching recipe:", error);
        throw error;
    }
}

export async function updateRecipe(id, recipe) {
    try {
        const response = await fetch('http://localhost:4000/api/' + id, {
            method: 'PUT', // or 'PATCH' depending on your API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating recipe:", error);
        throw error;
    }
}

export async function postRecipe(recipe) {
    try {
        const response = await fetch('http://localhost:4000/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating new recipe:", error);
        throw error;
    }
}
