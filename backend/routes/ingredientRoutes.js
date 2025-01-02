const express= require('express');
const ingredientController= require('../controllers/ingredientController');

const router= express.Router();

router.get('/', ingredientController.getAllIngredients); 
router.post('/', ingredientController.createIngredient); 

module.exports= router;
