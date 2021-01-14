/*
    Module de route pour le user
 */

// On instancie le router d'express
const router = require('express').Router();

// On importe les contollers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');


/*On définit les route et les fonctions liées*/

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);


// user display: 'block'
router.get('/', userController.getAllUsers);
router.get('/:id', userController.UserInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);


module.exports = router