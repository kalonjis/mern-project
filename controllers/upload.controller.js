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
        return res.status(400).json({errors});
    }
    //Si on passe le check alors on traite l'image
    const fileName = req.body.name + ".jpg"

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    )
};