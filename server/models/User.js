const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'The field is required.'
    },
    username: {
        type: String,
        required: 'The field is required.'
    },
    password: {
        type: String,
        required: 'The field is required.'
    },
})

//Exporting model. This take in the modelname and the schema
module.exports = mongoose.model('User', UserSchema);