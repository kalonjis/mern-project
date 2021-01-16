/* Application entry point */

// On importe le module express - (npm i -s express)
const express = require('express');

// On importe le module cookie-parser (npm i -s cookie-parser) => permet de manipuler les cookies
const cookieParser = require('cookie-parser')

// On importe le module de route
const userRoutes = require('./routes/user.routes');

// On importe le module .env qui contient les variables d'environnement (il est repris dans .gitignore)
require('dotenv').config({path: './config/.env'}) // npm i -s dotenv

// On récupère le module db afin de lancer la connection à la db
require('./config/db')

// On importe le module checkUser et requireAuth
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

// On instancie express
const app = express();

/* Middleware (fonctions qui peuvent accéder à l’objet Request (req), l’objet response (res)) */
app.use(express.json()) //(remplace body-parser)// for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // pour lire les cookies

// jwt
app.get('*', checkUser); // On check l'utilisateur pour n'importe quelle route
app.get('/jwtid', requireAuth, (req, res) =>{ // On check si l'utilisateur est déjà loggé pour qu'il n'ai pas à devoir le refaire (1 seul x!)
    res.status(200).send(res.locals.user._id)
});

//Routes (tjs à la fin...)
app.use('/api/user', userRoutes); 

// server (en tt dernier)
app.listen(process.env.PORT, ()=> {
    console.log(`listening on port ${process.env.PORT}`)
})