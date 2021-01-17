/** Model des posts / messages  */

// On importe le module mongoose (npm i -s mongoose)
const mongoose = require('mongoose');

// création d'un schema des posts dans mongodb
const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        message: {
            type:String,
            trim: true,
            maxlength: 500
        },
        picture: {
            type: String
        },
        video: {
            type: String,
        },
        likers: {
            type: [String],
            required: true
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number
                }
            ],
            require: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('post',PostSchema)