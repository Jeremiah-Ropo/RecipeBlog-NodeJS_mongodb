const express = require('express');
const router = express.Router()
const recipeController = require('../controllers/recipeController.js');


//App routes
router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.get('/recipe/:id', recipeController.exploreRecipes);
router.get('/recipes/explore-latest' && '/explore-latest', recipeController.exploreLatest);
router.get('/categories/:id', recipeController.exploreCategoryById);



module.exports = router;