const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'The field is required.'
    },
    image: {
        type: String,
        required: 'The field is required.'
    },
})

//Exporting model. This take in the modelname and the schema
module.exports = mongoose.model('Category', categorySchema);