//importing modules
const express=require('express');

//importing controllers
const questionControllers=require('../student_controllers/questionController');

//express router
const router=express.Router();

//routing
router.get('/',questionControllers.getQuestions);

//exporting router
module.exports=router;