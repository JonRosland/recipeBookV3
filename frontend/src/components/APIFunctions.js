//const IP = process.env.APP_IP || 'localhost';
//const baseUrl = 'http://' + IP + ':4000/api/';
const baseUrl = 'http://backend:4000/api/';

export async function getRecipe(id) {
    try {
        const response = await fetch(baseUrl + id);
        console.log('API getrecipe');
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
        const response = await fetch(baseUrl);
        console.log('API getrecipes');
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
        console.log('API update R 1');
        const response = await fetch(baseUrl + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        });
        console.log('API updater2');
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
        console.log('API post');
        const response = await fetch(baseUrl + 'newRecipe', {
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
