/* Application entry point */

// On importe le module express - npm i -s express
const express = require('express');

// On importe le module de route
const userRoutes = require('./routes/user.routes');

// On importe le module .env qui contient les variables d'environnement (il est repris dans .gitignore)
require('dotenv').config({path: './config/.env'}) // npm i -s dotenv

// On récupère le module db afin de lancer la connection à la db
require('./config/db')

// On instancie express
const app = express();

/* Middleware (fonctions qui peuvent accéder à l’objet Request (req), l’objet response (res)) */
//(remplace body-parser)
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//Routes
app.use('/api/user', userRoutes); 

// server
app.listen(process.env.PORT, ()=> {
    console.log(`listening on port ${process.env.PORT}`)
})