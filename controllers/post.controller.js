const PostModel = require('../models/post.models');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { uploadErrors } = require('../utils/errors.utils');// On importe la fonction du modules qui va gérer les erreurs
const fs = require('fs') // Module permettant la manip des fichiers (natif ds nodejs)
const { promisify } = require('util'); // (natif ds nodejs)
const pipeline = promisify(require('stream').pipeline);

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data ' + err)
    }).sort({ createdAt: -1 }); // permet de réorganiser du plus récent au plus ancien

}

module.exports.createPost = async(req, res) => {
    let fileName;

    // On check s'il y a un fichier joint au Post
    if( req.file !== null){
        try {
            // On check le type d'image
            if (
                req.file.detectedMimeType !== 'image/jpg' &&
                req.file.detectedMimeType !== 'image/png' &&
                req.file.detectedMimeType !== 'image/jpeg'
            )
                throw Error('invalid file');
            
            // On check le taille de l'image
            if (req.file.size > 500000) throw Error('max size');
        
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({errors});
        }
        //Si on passe le check alors on traite l'image (nom de l'image unique = user._Id+ date en milisec+jpg)
        fileName = req.body.posterId + Date.now() + '.jpg';

        // On crée le fichier dans à l'emplacement ci-dessous
        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}` // On ne le stocke pas ds la db!
            )
        )
    }

    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: []
    });

    try{
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err){
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

// comments-crud

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        res.status(400).send('ID unknown : ' + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments:{
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.status(200).send(docs);
                else res.status(400).send('error: '+ err)
            }
        );
        
    } catch (err) {
        res.status(400).send(err);
    }

}

module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        res.status(400).send('ID unknown : ' + req.params.id);

    try {
        return PostModel.findById(
            req.params.id,
            (err, docs) => {
                const theComment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId)
                )

                if (!theComment) res.status(404).send('comment not found');
                else theComment.text = req.body.text;

                return docs.save((err)=>{
                    if (!err) return res.status(200).send(docs);
                    else return res.status(500).send(err)
                })
            }
        )

    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        res.status(400).send('ID unknown : ' + req.params.id);

    try {
       return PostModel.findByIdAndUpdate(
           req.params.id,
           {
               $pull: {
                   comments: {
                       _id: req.body.commentId
                   }
               }
           },
           { new: true },
           (err, docs) => {
               if (!err) res.status(200).send(docs);
               else res.status(400).send(err)
           }
       ) 

    } catch (err) {
        res.status(400).send(err);
        
    }
}