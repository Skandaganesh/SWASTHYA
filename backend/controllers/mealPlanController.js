// mealPlanController.js
const mealPlanModel = require('../models/mealPlanModel');

const suggestMealPlan = async (req, res) => {
  try {
    const { userId, dietaryPreferences, healthGoal } = req.body;

    // Step 1: Fetch the user's allergens
    const allergenIds = await mealPlanModel.getUserAllergens(userId);

    // Step 2: Fetch meal plans for the user
    const mealPlans = await mealPlanModel.getMealPlans(userId, healthGoal, allergenIds);

    // Step 3: Filter recipes by dietary preferences if specified
    let filteredMealPlans = mealPlans;
    if (dietaryPreferences) {
      filteredMealPlans = mealPlans.filter(plan => {
        return dietaryPreferences.split(',').every(pref => 
          plan.recipe_name.toLowerCase().includes(pref.trim().toLowerCase())
        );
      });
    }

    // Step 4: Respond with the filtered meal plans
    if (filteredMealPlans.length === 0) {
      return res.status(404).json({ message: 'No suitable meal plan found based on your preferences and allergens.' });
    }

    res.status(200).json({ message: 'Meal plan suggested successfully!', mealPlans: filteredMealPlans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
  }
};

module.exports = { suggestMealPlan };
