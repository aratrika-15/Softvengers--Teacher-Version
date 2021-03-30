//importing modules
const express=require('express');

//importing controllers
const gameControllers=require('../student_controllers/gameControllers.js');

//express router
const router=express.Router();

//routing
router.patch('/unlock',gameControllers.unlockUniverse);
router.patch('/endGame',gameControllers.endGame);
//exporting router
module.exports=router;