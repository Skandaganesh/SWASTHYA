// mealPlanModel.js
const db = require('../config/db'); // Assuming db is already set up

// Fetch allergens for a user
const getUserAllergens = async (userId) => {
  const [allergenIngredients] = await db.promise().query(`
    SELECT ingredient_id 
    FROM Allergies 
    WHERE user_id = ?`, [userId]);
  
  return allergenIngredients.map(item => item.ingredient_id);
};

// Fetch meal plans for a user
const getMealPlans = async (userId, healthGoal, allergenIds) => {
  const [mealPlans] = await db.promise().query(`
    SELECT mp.plan_id, mp.start_date, mp.end_date, mp.goal_type, mp.total_calories, r.recipe_id, r.name AS recipe_name
    FROM Meal_Plans mp
    JOIN Recipes r ON r.recipe_id IN (
      SELECT recipe_id 
      FROM Recipe_Ingredients 
      WHERE ingredient_id NOT IN (?) AND recipe_id = r.recipe_id
    )
    WHERE mp.user_id = ? AND mp.goal_type = ?`, [allergenIds, userId, healthGoal]);

  return mealPlans;
};

module.exports = { getUserAllergens, getMealPlans };
