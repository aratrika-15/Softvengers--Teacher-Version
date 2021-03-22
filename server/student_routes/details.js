//importing modules
const express=require('express');

//importing controllers
const detailsControllers=require('../student_controllers/detailsControllers');

//express router
const router=express.Router();

//routing
// route called in the beginning after login for basic student details
router.get('/getStudent',detailsControllers.getStudent);
//route called for progress bar
router.get('/getProgress', detailsControllers.getProgress);
router.get('/getMaxScore', detailsControllers.getMaxScore);
//
router.get('/getLeaderboard',detailsControllers.getLeaderboard);

//exporting router
module.exports=router;