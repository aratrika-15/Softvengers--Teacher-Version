//importing modules
const express=require('express');

//importing controllers
const detailsControllers=require('../student_controllers/detailsControllers');

//express router
const router=express.Router();

//routing
router.get('/',detailsControllers.getDetails);

//exporting router
module.exports=router;