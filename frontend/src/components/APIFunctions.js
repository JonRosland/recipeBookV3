//const IP = process.env.APP_IP || 'localhost';
//const baseUrl = 'http://' + IP + ':4000/api/';
const baseUrl = 'http://10.0.0.10:4000/api/';

export async function apiGetRecipe(id) {
    try {
        const response = await fetch(baseUrl + id);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching recipe:", error);
        throw error;
    }
}

export async function apiGetRecipes() {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching recipe:", error);
        throw error;
    }
}

export async function apiUpdateRecipe(id, recipe) {
    try {
        console.log('API update R 1');
        const response = await fetch(baseUrl + id, {
            method: 'PUT',
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

export async function apiPostRecipe(recipe) {
    try {
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
