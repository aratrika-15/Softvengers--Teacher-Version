//importing modules
const express=require('express');

//importing controllers
const loginControllers=require('../controllers/loginControllers');

//express router
const router=express.Router();

//routing
router.post('/login',loginControllers.teacherLogin);
router.post('/register',loginControllers.teacherRegister);

//exporting router
module.exports=router;