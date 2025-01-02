const mealPlanModel = require('../models/mealPlanModel');

const suggestMealPlan = async (req, res) => {
  try {
    const { userId, dietaryPreferences, healthGoal } = req.body;

    // Validate input
    if (!userId || !healthGoal) {
      console.log('Validation failed: User ID and health goal are required.');
      return res.status(400).json({ message: 'User ID and health goal are required.' });
    }

    console.log(`Received request to suggest meal plans for User ID: ${userId}, Health Goal: ${healthGoal}, Dietary Preferences: ${dietaryPreferences}`);

    // Step 1: Fetch the user's allergens
    const allergenIds = await mealPlanModel.getUserAllergens(userId);

    // Step 2: Fetch meal plans based on health goal and allergens
    const mealPlans = await mealPlanModel.getMealPlans(healthGoal, allergenIds, dietaryPreferences);

   
    // Step 3: Filter recipes by dietary preferences if specified
let filteredMealPlans = mealPlans;

// If dietary preferences are provided and filtering is needed
if (dietaryPreferences) {
    const preferencesArray = dietaryPreferences.split(',').map(pref => pref.trim().toLowerCase());
    filteredMealPlans = mealPlans.filter(plan => {
        return preferencesArray.every(pref => 
            plan.recipe_name.toLowerCase().includes(pref)
        );
    });
}

// Remove duplicates from filteredMealPlans based on recipe_id
const uniqueRecipeIds = new Set();
filteredMealPlans = filteredMealPlans.filter(plan => {
    if (!uniqueRecipeIds.has(plan.recipe_id)) {
        uniqueRecipeIds.add(plan.recipe_id);
        return true; // Keep this recipe
    }
    return false; // Skip duplicate recipe
});


    // Step 4: Respond with the filtered meal plans or a not found message
    if (filteredMealPlans.length === 0) {
      console.log('No suitable meal plans found based on user preferences and allergens.');
      return res.status(404).json({ message: 'No suitable meal plans found based on your preferences and allergens.' });
    }

    console.log('Meal plans suggested successfully:', filteredMealPlans);
    res.status(200).json({ message: 'Meal plans suggested successfully!', mealPlans: filteredMealPlans });
  } catch (error) {
    console.error('Error in suggestMealPlan:', error);
    res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
  }
};

module.exports = { suggestMealPlan };