/* Controller file  for authentification*/

// On récupère le module UserModel
const UserModel = require('../models/user.model');

// On instancie le module jsonwebtoken que l'on va utiliser pour l'authentification
const jwt = require('jsonwebtoken'); //npm i -s jsonwebtoken

/* Ensemble des fonctions qui gèrent l'authentification qu'on exporte afin de pouvoir être appelée par le routeur*/

// Fonction pour créer un nouvel utilisateur
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({user: user._id});
    }
    catch(err){
        res.status(200).send({err})
    }
}

// Fonction pour se logger
module.exports.signIn = async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id)
    }

    catch {

    }
}