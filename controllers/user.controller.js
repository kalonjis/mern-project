/* User controller - CRUD */

// On importe le UserModel
const UserModel = require('../models/user.model');

// On instancie ObjectId.  
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

// Follow a user avec la methode "PATCH"
module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        // add to the follower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow}},
            { new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err);
            }
        );
        // add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id}},
            { new: true, upsert: true},
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) res.status(400).json(err);
            }
        );

    } catch (err){
        return res.status(500).json({ message: err})
    }
};

// Unfollow a user avec la methode "PATCH"
module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    try {
        // remove from follower list
        await UserModel.findOneAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow}},
            { new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err);
            }
        );
        // remove from following list
        await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id}},
            { new: true, upsert: true},
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) res.status(400).json(err);
            }
        );

    } catch (err){
        return res.status(500).json({ message: err})
    }
};