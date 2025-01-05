// backend/models/Recipe.js
const db = require('../config/db');

class Recipe {
    static create(recipeData, callback) {
        const query = 'INSERT INTO Recipes SET ?';
        db.query(query, recipeData, callback);
    }

    static async findAll() {
        const result = await db.query('SELECT * FROM Recipes');
        return result.rows; // Return the rows from the query
    }

    // Add more methods as needed (e.g., for updating or deleting recipes)
}

module.exports = Recipe;
