const express = require('express');
const router = express.Router()
const recipeController = require('../controllers/recipeController.js');


//App routes
router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.get('/recipe/:id', recipeController.exploreRecipes);
router.get('/recipes/explore-latest' && '/explore-latest', recipeController.exploreLatest);
router.get('/categories/:id', recipeController.exploreCategoryById);
router.post('/search', recipeController.exploreSearch);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipePost);

router.post('/register', recipeController.register);
router.get('/register', recipeController.submitRegister);

router.post('/login', recipeController.login);
router.get('/signin', recipeController.submitLogin);




module.exports = router;