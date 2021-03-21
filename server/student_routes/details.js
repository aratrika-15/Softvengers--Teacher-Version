//importing modules
const express=require('express');

//importing controllers
const detailsControllers=require('../student_controllers/detailsControllers');

//express router
const router=express.Router();

//routing
router.get('/getStudent',detailsControllers.getStudent);

//exporting router
module.exports=router;