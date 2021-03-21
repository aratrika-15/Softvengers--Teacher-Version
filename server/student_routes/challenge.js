//importing modules
const express=require('express');

//importing controllers
const challengeControllers=require('../student_controllers/challengeControllers');

//express router
const router=express.Router();

//routing
router.post('/createChallenge',challengeControllers.createChallenge);

//exporting router
module.exports=router;