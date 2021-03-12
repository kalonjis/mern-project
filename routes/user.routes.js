/*
    Module de route pour le user
 */

// On charge le router d'express
const router = require('express').Router();

// On importe les contollers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
// On charge multer: module qui permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');  // (npm i -s multer)
const upload = multer();

/*On définit les routes et les fonctions liées*/

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);


// user display: 'block'
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);


// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router