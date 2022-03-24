const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    name:{
        type: String,
        required: 'The field is required'
    },
    image:{
        type: String,
        required: 'The field is required'
    },
    category:{
        type: String,
        enum: ['chinese','american', 'mexican', 'indian', 'thai', 'spanish', 'nigerian'],
        required: 'The field is required'
    },
    email:{
        type: String,
        required: 'The field is required'
    },
    description:{
        type: String,
        required: 'The field is required'
    },
    ingredients:{
        type: Array,
        required: 'The field is required'
    },
})

recipeSchema.index({ name: 'text', description: 'text', category: 'text'});
// Wildcart indexing
// recipeSchema.index({'$**': 'text'});

module.exports = mongoose.model('Recipe', recipeSchema);