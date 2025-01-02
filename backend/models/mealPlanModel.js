const db = require('../config/db'); // Assuming db is already set up

// Fetch allergens for a user
const getUserAllergens = async (userId) => {
  console.log(`Fetching allergens for user ID: ${userId}`);
  const [allergenIngredients] = await db.promise().query(`
    SELECT ingredient_id 
    FROM Allergies 
    WHERE user_id = ?`, [userId]);
  
  return allergenIngredients.map(item => item.ingredient_id);
};

// Fetch meal plans based on health goal, allergens, and dietary preferences
const getMealPlans = async (healthGoal, allergenIds, dietaryPreferences) => {
  console.log(`Fetching meal plans for health goal: ${healthGoal}, allergens: ${allergenIds}, dietary preferences: ${dietaryPreferences}`);
  const [mealPlans] = await db.promise().query(`
    SELECT mp.plan_id, mp.start_date, mp.end_date, mp.goal_type, mp.total_calories, r.recipe_id, r.name AS recipe_name
    FROM Meal_Plans mp
    JOIN Recipes r ON r.recipe_id IN (
      SELECT recipe_id 
      FROM Recipe_Ingredients 
      WHERE ingredient_id NOT IN (?) AND recipe_id = r.recipe_id
    )
    WHERE mp.goal_type = ? AND (
      ? IS NULL OR LOWER(r.name) LIKE LOWER(?)
    )`, [
      allergenIds.length > 0 ? allergenIds : [null], 
      healthGoal,
      dietaryPreferences ? dietaryPreferences : null,
      dietaryPreferences ? '%' + dietaryPreferences + '%' : null
    ]);
  
  return mealPlans;
};

module.exports = { getUserAllergens, getMealPlans };
