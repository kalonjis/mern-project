const PostModel = require('../models/post.models');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data ' + err)
    })

}

module.exports.createPost = async(req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: []
    });

    try{
        const post = await newPost.save();
        return res.status(201).json(post);
    }

    catch (err){
        return res.status(400).send(err);
    }
};

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
      res.status(400).send('ID unknown : ' + req.params.id);
    
    const updatedRecord = {
        message: req.body.message
    };

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log('Update error: '+ err);
        }
    ) 
};

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        res.status(400).send('ID unknown : ' + req.params.id);

    PostModel.findByIdAndRemove(
      req.params.id,
      (err, docs) => {
          if(!err) res.status(200).json({message: "Post successfully deleted. "});
          else console.log('Delete error: '+ err);
      }
  ) 
}

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        res.status(400).send('ID unknown : ' + req.params.id);
    
    try{
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true},
            (err, docs)=>{
                if (err) res.status(400).send(err);
            }
        );
   
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet : { likes: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(400).send(err);
                else res.status(201).json({message: "you like it! "});
            }
        );

    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        res.status(400).send('ID unknown : ' + req.params.id);
    
    try{
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true, upsert: true},
            (err, docs)=>{
                if (err) res.status(400).send(err);
            }
        );
    
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull : { likes: req.params.id }
            },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) res.status(400).send(err);
                else res.status(201).json({message: "you don't like it anymore! "});
            }
        );

    } catch (err) {
        return res.status(400).send(err);
    }
}