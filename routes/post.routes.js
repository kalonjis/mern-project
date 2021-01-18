/*
    Module de route pour le user
 */

// On instancie le router d'express
const router = require('express').Router();

// On importe les contollers
const postController = require('../controllers/post.controller');


/*On définit les routes et les fonctions liées*/
router.get('/', postController.readPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// Comments
router.patch('/comment-post/:id', postController.commentPost)
router.patch('/edit-comment-post/:id', postController.editCommentPost)
router.patch('/delete-comment-post/:id', postController.deleteCommentPost)

module.exports = router;