/* Controller file  for authentification*/

// On récupère le module UserModel
const UserModel = require('../models/user.model');

// On instancie le module jsonwebtoken que l'on va utiliser pour l'authentification
const jwt = require('jsonwebtoken'); //npm i -s jsonwebtoken


//  On définit la fonction createToken qu'on appelle dans "signIN"
//On stock la durée de validité dans une variable car on va la réutiliser 
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: maxAge})
}


/* Ensemble des fonctions qui gèrent l'authentification qu'on exporte afin de pouvoir être appelée par le routeur */

// On importe les modules qui vont gérer les erreurs
const {signUpErrors, signInErrors } = require('../utils/errors.utils');

// Fonction pour créer un nouvel utilisateur
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body // On recupère les données encodées par le user

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({user: user._id});
    }
    catch(err){
        const errors = signUpErrors(err);
        res.status(400).send( errors)
    }
}

// Fonction pour se logger
module.exports.signIn = async (req, res) => {
    const {email, password } = req.body; // On recupère les données encodées par le user

    try {
        const user = await UserModel.login(email, password); //On check dans la db si cet utilisateur existe, on le recupère et on stocke tt dans user
        const token = createToken(user._id); // On crée le token
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({user: user._id})
    }

    catch (err){
        const errors = signInErrors(err);
        res.status(200).send({errors})
    }
}

// Fonctions pour se délogger
module.exports.logout = (req,res)=> {
    res.cookie('jwt', '', { maxAge: 1}); // On fixe la durée du token à 1ms =>expiration immédiate
    res.redirect('/'); //On redirige automatiquement
}