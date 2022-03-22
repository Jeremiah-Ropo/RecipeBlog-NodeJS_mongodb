require('../models/database');
const Category = require('../models/Category.js')
const Recipe = require('../models/Recipe.js');
//Get homepage
//Controller is more of where all router can be controlled.
exports.homepage = async(req, res) => {
    try {
        const limitView = 5
        const categories = await Category.find({}).limit(limitView)
        const recipes = await Recipe.find({}).sort({_id:-1}).limit(limitView);
        res.render('home', { title: 'Cooking Blog - Homepage' , categories, recipes});
    }catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
    
}
exports.exploreCategories = async(req, res) => {
    try {
        const categories = await Category.find({})
        res.render('categories', { title: 'Cooking Blog - Categories' , categories});
    }catch (error) {
        res.status(500).send({message: error.message || 'Error Occured'})
    }
}






























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