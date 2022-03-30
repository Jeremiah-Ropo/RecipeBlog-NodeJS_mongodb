require('../models/database');
const { request } = require('express');
const Category = require('../models/Category.js')
const Recipe = require('../models/Recipe.js');
//Get homepage
//Controller is more of where all router can be controlled.
exports.homepage = async(req, res) => {
    try {
        const limitView = 5
        const categories = await Category.find({}).limit(limitView)
        const latest = await Recipe.find({}).sort({_id:-1}).limit(limitView);
        const thai = await Recipe.find({ 'category' : 'thai'}).limit(limitView);
        const american = await Recipe.find({ 'category' : 'american'}).limit(limitView);
        const mexican = await Recipe.find({ 'category' : 'mexican'}).limit(limitView);

        const food = await { latest, american, mexican, thai }

        res.render('home', { title: 'Cooking Blog - Homepage' , categories, food});
    }catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
    
}

//Categories controller

exports.exploreCategories = async(req, res) => {
    try {
        const limitView = 20
        const categories = await Category.find({}).limit(limitView)
        res.render('categories', { title: 'Cooking Blog - Categories' , categories});
    }catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
}

//Categories by Id
exports.exploreCategoryById = async(req, res) => {

    try {
        let categoryById = req.params.id;
        let categoryId = categoryById.toLowerCase()
        const category = await Recipe.find({category:categoryId})
        res.render('categories', { title: 'Cooking Blog - Categories' , category}); 
    }catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
}

//Recipes controller. /recipe/:id
exports.exploreRecipes = async(req, res) => {
    try {
        const requestId = req.params.id
        const recipe = await Recipe.findById({'_id': requestId})
        res.render('recipes', { title: 'Cooking Blog - Recipes' , recipe});
    }catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
}

//Latest recipe page.
exports.exploreLatest = async(req, res) => {
    try {
        const limitView = 20
        const latestRecipe = await Recipe.find({}).sort({'_id': '-1'}).limit(limitView)
        res.render('explore-latest', { title: 'Cooking Blog - Recipes' , latestRecipe});
    }catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
}

// Search page.

exports.exploreSearch = async(req, res) => {
    try {
        const searchTerm = req.body.searchTerm;

        const limitView = 20;
        const recipes = await Recipe.find({ $text: {$search:searchTerm, $diacriticSensitive:true}}).limit(limitView)
        res.render('search', { title: 'Cooking Blog - Search' , recipes});
    }catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
}


//Random recipe controller.
exports.exploreRandom = async(req, res) => {
    try {
        const count = await Recipe.find().countDocuments();
        const random = Math.floor(Math.random() * count);
        const recipe = await Recipe.findOne().skip(random).exec();

        res.render('showRand', { title: 'Cooking Blog - Random Recipe' , recipe});
    } catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
}

//Submit page controller.

//Get from the database
exports.submitRecipe = async(req, res) => {
    try {

        const infoFailObj = req.flash('infofail');
        const infoSubmitObj = req.flash('infoSubmit');

        res.render('submit', {title: 'Cooking Blog - Submit-Recipe', infoFailObj, infoSubmitObj})
    } catch (error){
        res.status(500).send({message: error.message || 'Error Occured'})
    }
};


//Post to the database.
exports.submitRecipePost = async(req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send('No files were uploaded.')
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
    
            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
    
            imageUploadFile.mv(uploadPath, (err) => {
                if (err){
                    return res.status(500).send(err);
                }
            })            
        }
        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            category: req.body.category,
            email: req.body.email,
            image: newImageName
        })

        await newRecipe.save();

        req.flash('infosubmit', 'Recipe has been added')
        res.redirect('/submit-recipe')
    } catch (error){
        req.flash('infofail', 'Oops, something has gone wrong')
        res.redirect('/submit-recipe');
    }
};



















// async function insertDymmyRecipeData(){
//     try{
//         const limitView = 6;
//         const recipes = await Recipe.insertMany([
//             { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "american", 
//                 "image": "publish-recipe.png"
//                 },
//                 { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "american", 
//                 "image": "publish-recipe.png"
//                 },
//         ])
//     }catch(error){
//          console.log(error)
//     }

// }

// insertDymmyRecipeData()

// async function insertDymmyCategoryData(){

//     try {
//         await Category.insertMany([
//             {"name": "Amerian",
//             "image": 'amerian-food.jpg'
//         },
//         {"name": "Thai",
//             "image": 'thai-food.jpg'
//         },
//         {"name": "Indian",
//             "image": 'indian-food.jpg'
//         },
//         {"name": "Mexican",
//             "image": 'mexican-food.jpg'
//         },
//         ]);
//     } catch (error) {
//         console.log(error);
//     }
// }

// insertDymmyCategoryData();