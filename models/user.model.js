/* Model de notre USER dans la DB  */

//On instancie le module 'mongoose' (si pas installé => npm i -s mongoose )
const mongoose = require('mongoose');

// On instancie {isEmail} du module validator pour valider l'email (npm i -s validator)
const { isEmail } = require('validator');

// On instancie bcrypt du module bcrypt pour crypter les passwords (npm i -s bcrypt)
const bcrypt = require('bcrypt');

// création Schema du user dans mongodb
const userSchema = new mongoose.Schema(
    {
        pseudo: {
           type: String,
           required: true,
           minLength: 3,
           maxLength: 55,
           unique: true,
           trim: true 
        },
        email:{
            type: String,
            required: true,
            validate: [isEmail],
            trim: true
        },
        password: {
          type: String,
          required: true,
          max: 1024,
          minLength: 6  
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png"

        },
        bio : {
            type: String,
            max: 1024,
        },
        followers:{
            type: [String]
        },
        following: {
            type: [String]
        },
        likes: {
            type: [String]
        }
    },
    {
        timestamps: true
    }

)

// Function pour crypter le password avant l'enregistrement dans la db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
} )

// On instancie le userSchema et on définit la db dans laquelle on va l'utiliser ('user')
const UserModel = mongoose.model('user', userSchema);

// On exporte le UserModel qui sera recup par les controllers  
module.exports = UserModel;