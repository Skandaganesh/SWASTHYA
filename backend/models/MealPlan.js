// backend/models/MealPlan.js
const db = require('../config/db'); // Assuming db is already set up

// // Fetch allergens for a user
// const getUserAllergens = async (userId) => {
//     console.log(`Fetching allergens for user ID: ${userId}`);
//     const [allergenIngredients] = await db.promise().query(`
//         SELECT ingredient_id 
//         FROM Allergies 
//         WHERE user_id = ?`, [userId]);
    
//     return allergenIngredients.map(item => item.ingredient_id);
// };

// // Fetch meal plans based on health goal, allergens, and dietary preferences
// const getMealPlans = async (healthGoal, allergenIds, dietaryPreferences) => {
//     console.log(`Fetching meal plans for health goal: ${healthGoal}, allergens: ${allergenIds}, dietary preferences: ${dietaryPreferences}`);
    
//     const [mealPlans] = await db.promise().query(`
//         SELECT mp.plan_id, mp.start_date, mp.end_date, mp.goal_type, mp.total_calories 
//         FROM Meal_Plans mp
//         JOIN Recipes r ON r.recipe_id IN (
//             SELECT recipe_id 
//             FROM Recipe_Ingredients 
//             WHERE ingredient_id NOT IN (?) AND recipe_id = r.recipe_id
//         )
//         WHERE mp.goal_type = ? AND (
//             ? IS NULL OR LOWER(r.name) LIKE LOWER(?)
//         )`, [
//             allergenIds.length > 0 ? allergenIds : [null], 
//             healthGoal,
//             dietaryPreferences ? dietaryPreferences : null,
//             dietaryPreferences ? '%' + dietaryPreferences + '%' : null
//         ]);
    
//     return mealPlans;
// };


// Fetch allergens for a user
const getUserAllergens = async (userId) => {
    console.log(`Fetching allergens for user ID: ${userId}`);
    const query = 'SELECT ingredient_id FROM Allergies WHERE user_id = $1'; // Use parameterized query
    
    try {
        const result = await db.query(query, [userId]);
        return result.rows.map(item => item.ingredient_id);
    } catch (error) {
        console.error('Error fetching allergens:', error);
        throw error; // Re-throw error for handling in controller
    }
};

// Fetch meal plans based on health goal, allergens, and dietary preferences
const getMealPlans = async (healthGoal, allergenIds, dietaryPreferences) => {
    console.log(`Fetching meal plans for health goal: ${healthGoal}, allergens: ${allergenIds}, dietary preferences: ${dietaryPreferences}`);

    const query = `
        SELECT mp.plan_id, mp.start_date, mp.end_date, mp.goal_type, mp.total_calories, r.recipe_id, r.name AS recipe_name
        FROM Meal_Plans mp
        JOIN Recipes r ON r.recipe_id IN (
            SELECT DISTINCT ri.recipe_id 
            FROM Recipe_Ingredients ri
            WHERE NOT EXISTS (
                SELECT 1 
                FROM unnest($1::int[]) AS excluded(ingredient_id)
                WHERE excluded.ingredient_id = ri.ingredient_id
            )
        )
        WHERE mp.goal_type = $2
        AND ($3::text IS NULL OR LOWER(r.name) LIKE LOWER($4::text));
    `;

    const values = [
        allergenIds.length > 0 ? allergenIds : [null], // Parameter $1
        healthGoal,                                    // Parameter $2
        dietaryPreferences ? dietaryPreferences : null, // Parameter $3
        dietaryPreferences ? `%${dietaryPreferences}%` : null // Parameter $4
    ];

    try {
        const result = await db.query(query, values);
        return result.rows; // Return meal plans
    } catch (error) {
        console.error('Error fetching meal plans:', error);
        throw error; // Re-throw error for handling in controller
    }
};






module.exports = { getUserAllergens, getMealPlans };

