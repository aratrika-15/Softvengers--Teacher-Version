const express = require('express');

const postControllers = require('../student_controllers/discussionControllers');

const router=express.Router();

router.post('/createPost', postControllers.createPost);
router.get('/getPosts', postControllers.getPosts);

module.exports = router;
