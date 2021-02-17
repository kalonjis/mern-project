// On importe les modules nécessaires
const UserModel = require('../models/user.model');
const fs = require('fs') // Module permettant la manip des fichiers (natif ds nodejs)
const { promisify } = require('util'); // (natif ds nodejs)
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors.utils');// On importe la fonction du modules qui va gérer les erreurs

module.exports.uploadProfil = async (req, res) => {
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
    //Si on passe le check alors on traite l'image
    const fileName = req.body.name + ".jpg"

    // On crée le fichier dans à l'emplacement ci-dessous
    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}` // On ne le stocke pas ds la db!
        )
    )

    // On met à jour la base de donnée avec le nouveau lien de la photo
    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set : { picture: "./uploads/profil/" +fileName}},
            { new: true},
            (err, docs) => {
                if (!err) res.status(200).send(docs);
                else res.status(500).send( {message: err});
            }
        )
        
    } catch (err) {
        return res.status(500).send( {message: err});
    }        
};