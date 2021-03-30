//importing modules
const express=require('express');

//importing controllers
const assignmentControllers=require('../student_controllers/assignmentControllers');

//express router
const router=express.Router();

//routing
router.patch('/assignmentComplete', assignmentControllers.assignmentComplete);
router.get('/getassignmentList', assignmentControllers.getassignmentList);
router.get('/getAssignmentQuestions',assignmentControllers.getAssignmentQuestions);
//exporting router
module.exports=router;