const express = require('express');
const expressLayouts = require('express-ejs-layouts')



const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

//Middleware for templates
app.use(express.urlencoded({ extended:true}));
//Hold on styles or images 
app.use(express.static('public'));
app.use(expressLayouts);


//Layouts
app.set('layout', './layouts/main' );
app.set('view engine', 'ejs')

//Routes
const routes = require('./server/routes/recipeRoutes.js');
app.set('/', routes);

app.listen(port, ()=> {
    console.log(`Listening to port ${port}`)
})
