const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

//Afficher(lire) les infos de tous les utilisateurs avec la methode "GET"
module.exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

//Afficher(lire) les infos d'un seul utilisateur avec la methode "GET"
module.exports.UserInfo = (req,res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    UserModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID unknown : ' + err)
    }).select('-password')
}