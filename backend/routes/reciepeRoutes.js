const express= require('express');
const recipeController= require('../controllers/recipeController');

const router= express.Router();

router.get('/', recipeController.getAllRecipes); 
router.post('/', recipeController.createRecipe); 

module.exports= router;
