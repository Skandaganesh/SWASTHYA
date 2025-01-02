// const express = require('express');
// const router = express.Router();
// const mealPlanController = require('../controllers/mealPlanController');

// router.post('/', mealPlanController.generateMealPlan);

// module.exports = router;
// mealPlanRoutes.js
const express = require('express');
const mealPlanController = require('../controllers/mealPlanController');

const router = express.Router();

// Route to suggest meal plan
router.post('/suggest', mealPlanController.suggestMealPlan);

module.exports = router;
