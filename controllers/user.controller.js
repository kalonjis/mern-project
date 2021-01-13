const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

//Afficher(lire) les infos de tous les utilisateurs avec la methode "GET"
module.exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

//Afficher(lire) les infos d'un seul utilisateur avec la methode "GET"
module.exports.UserInfo = (req,res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    UserModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID unknown : ' + err)
    }).select('-password')
};

// Mise à jour des infos du user avec la methode "PUT"
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
      try {
          await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
               if (!err) res.send(docs);
               if (err) res.status(500).send({message: err}); 
            }
          )
      } catch (err){
          return res.status(500).json({ message: err})
      }
};

// Delete user avec la methode "DELETE"
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        await UserModel.remove({_id: req.params.id}).exec();
        res.status(200).json({message: "Successfully deleted. "})
        
    } catch (err){
        return res.status(500).json({ message: err})
    }
};