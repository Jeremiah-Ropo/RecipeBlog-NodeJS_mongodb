const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const cookies = require('cookie-parser');


const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();//For secret keys not to be seen on github

//MIDDLEWARE for templates
app.use(express.urlencoded({ extended:true}));//Bodyparser

//Hold on styles or images 
app.use(express.static('public'));


//EJS layout
app.use(expressLayouts);
app.set('layout', './layouts/main' );
app.set('view engine', 'ejs')

//Using session and flash with cookies;
app.use(cookies('CookingBlogSecret'))
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized:true,
    resave:true,
}))

//Upload files setup
app.use(fileUpload());
app.use(flash());

//Routes
const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, ()=> {
    console.log(`Listening to port ${port}`)
});
