import express from 'express';
import cors from 'cors';
import { connectToDB, addRecipe, getRecipe, updateRecipe, deleteRecipe, searchRecipe, getRecipes } from './server.js';
//import fs from 'fs';
//fs.readFile('/home/ubuntu/recipeBookV2/src/lib/recipeEx.json', 'utf8', async (err, data) => {
//    if (err) {
//        console.error('Error reading the file', err);
//        return;
//    }
//
//    try {
//        const json_data = JSON.parse(data);
//        const dbRecipe = await connectToDB();
//        const result = await dbRecipe.insertOne(json_data);
//    } catch (error) {
//        console.error('Error inserting data into the database', error);
//    }
//});
const app = express();
app.use(cors())
app.use(express.json());
app.listen(4000, () => {
    console.log("Server running on port 4000")
});

app.get('/api/:id', async (req, res) => {
    const recipe = await getRecipe(req.params.id);
    if (recipe) {
        res.status(200).json(recipe);
    } else {
        res.status(404).json({ "message": "Recipe not found" });
    }
});

app.put('/api/:id', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    if (!data) {
        return res.status(400).json({ "message": "No input data provided" });
    }
    const response = await updateRecipe(req.params.id, data);
    res.status(200).json(response);
});

app.get('/api/search/:search', async (req, res) => {
    const search = JSON.parse(req.params.search);
    const recipe = await searchRecipe(search);
    if (recipe) {
        res.status(200).json(recipe);
    } else {
        res.status(404).json({ "message": "Recipe not found" });
    }
});

app.delete('/api/:id', async (req, res) => {
    const response = await deleteRecipe(req.params.id);
    res.status(200).json(response);
});

app.post('/api/', async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ "message": "No input data provided" });
    }
    const recipe_id = await addRecipe(data);
    res.status(201).json({ "recipe_id": recipe_id.toString() });
});

app.get('/api/', async (req, res) => {
    const recipes = await getRecipes();
    res.status(200).json(recipes);
});

export { app };
