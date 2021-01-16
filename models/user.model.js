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
           minlength: 3,
           maxlength: 55,
           unique: true,
           trim: true 
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
            trim: true
        },
        password: {
          type: String,
          required: true,
          max: 1024,
          minlength: 6  
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

);


/* Fonction appelées par le controller*/
// Fonction pour crypter le password AVANT l'enregistrement dans la db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// fonction pour contrôler la correspondance du password crypté lors du signIN (UserModel.login)
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

// On instancie le userSchema et on définit la db dans laquelle on va l'utiliser ('user')
const UserModel = mongoose.model('user', userSchema);

// On exporte le UserModel qui sera recup par les controllers  
module.exports = UserModel;