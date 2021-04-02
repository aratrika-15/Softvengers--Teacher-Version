//importing modules
const express=require('express');
const auth=require('../controllers/authentication');
//importing controllers
const detailsControllers=require('../student_controllers/detailsControllers');

//express router
const router=express.Router();

//routing
// route called in the beginning after login for basic student details
router.get('/getStudent',auth,detailsControllers.getStudent);
//route called for progress bar
router.get('/getProgress', detailsControllers.getProgress);
router.get('/getMaxScore', detailsControllers.getMaxScore);
router.get('/getAllStudents/:tut_grp', detailsControllers.getTutStudents);
router.get('/getAllStudents', detailsControllers.getAllStudents);
router.get('/getLeaderboard',detailsControllers.getLeaderboard);
router.patch('/updateStudent', detailsControllers.updateStudent);
router.patch('/changePassword', detailsControllers.changePassword);

//exporting router
module.exports=router;
