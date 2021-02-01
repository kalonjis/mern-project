/**Middleware pour vérifier l'authentification à l'aide de cookie */

// On importe le module jsonwebtoken
const jwt = require('jsonwebtoken');

// On importe le UserModel
const UserModel = require('../models/user.model');

// Fonction permettant de vérifier l'utilisitateur par comparaison au token
module.exports.checkUser = (req, res, next) => {
    //On stocke le(éventuel) cookie de l'utilisateur dans une const
    const token = req.cookies.jwt;
    //S'il y a un token
    if (token) {
        //On compare le token avec celui du site (défini dans notre fichier .env)
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            //si ça ne correspond pas:
            if (err) {
                //Plus info sur res.local : http://expressjs.com/en/api.html#res.locals 
                res.locals.user = null; 
                res.cookie('jwt','', { maxAge: 1}); // On supprime son cookie/token
                next(); // On continue le traitement de la requête
            
            // si le token match:
            } else {
                let user = await UserModel.findById(decodedToken.id); // stocke le user correspondant à l'Id du decoded token ds une variable user
                res.locals.user = user; // on passe ce user ds le res.locals.user: var qui n'est dispo que ds une vue/page en particulier
                next(); // On continue le traitement de la requête
            }
        })
    
    // si pas de token:
    } else {
        res.locals.user = null;
        next();
    }
}

// Fonction pour vérifier si déjà loggé (et ne pas devoir le refaire!) ou pas. On l'appelle qu'une seule fois en front!
module.exports.requireAuth = (req, res, next) => {
    //On stocke le(éventuel) cookie de l'utilisateur dans une const
    const token = req.cookies.jwt;
    //S'il y a un token
    if (token){
        //On compare le token avec celui du site (défini dans notre fichier .env)
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) =>{
            //si ça ne correspond pas:
            if (err){
               console.log(err);
               res.send(200).json('no token')
               //pas de next()!
            
            // si le token match:
            }else {
                console.log(decodedToken.id);
                next();
            }
        });
    
    // si pas de token:
    } else{
        console.log('No token');
    }
};

