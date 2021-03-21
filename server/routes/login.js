//importing modules
const express=require('express');

//importing controllers
const loginControllers=require('../controllers/loginControllers');
const StudentProgress = require('../models/studentProgress');

//express router
const router=express.Router();

//routing
router.post('/',loginControllers.teacherLogin);
router.post('/login',loginControllers.teacherLogin);
router.post('/register',loginControllers.teacherRegister);
<<<<<<< HEAD

// router.post('/progress',async(req,res)=>{
//     try{
//         const sp = new StudentProgress({
//             emailID: req.body.emailID,
//             conqueredUniverse: req.body.conqueredUniverse,
//             conqueredSolarSystem: req.body.conqueredSolarSystem,
//             conqueredPlanet: req.body.conqueredPlanet,
//             fullDict: [{
//                 identifier:"(0,0,0)",
//                 maxScore:0,
//                 minScore:0,
//                 totalScore: 0,
//                 attempts: 0,
//                 maxCorrect: 0
//             }],
//             solarSystemDict:[{
//                 identifier:"(0,0)",
//                 maxScore:0,
//                 minScore:0,
//                 totalScore: 0,
//                 attempts: 0,
//             }],
//             universeDict:[{
//                 identifier:"0",
//                 maxScore:0,
//                 minScore:0,
//                 totalScore: 0,
//                 attempts: 0,
//             }]
//         })
//         const savedsp = await sp.save();
//         res.status(201).send({sp: savedsp.id});
//     }
//     catch (err){
//         res.status(400).send(err);
//     }
// 
// });
=======
router.post('/initialize',loginControllers.initialisation);
router.post('/progress',async(req,res)=>{
    try{
        const sp = new StudentProgress({
            emailID: req.body.emailID,
            conqueredUniverse: req.body.conqueredUniverse,
            conqueredSolarSystem: req.body.conqueredSolarSystem,
            conqueredPlanet: req.body.conqueredPlanet,
            fullDict: [{
                identifier:"(0,0,0)",
                maxScore:0,
                minScore:0,
                avgScore:0
            }],
            solarSystemDict:[{
                identifier:"(0,0)",
                maxScore:0,
                minScore:0,
                avgScore:0
            }],
            universeDict:[{
                identifier:"0",
                maxScore:0,
                minScore:0,
                avgScore:0
            }]
        })
        const savedsp = await sp.save();
        res.status(201).send({sp: savedsp.id});
    }
    catch (err){
        res.status(400).send(err);
    }

});
>>>>>>> e1719555e1cfbef4246153d540ed6320f88880e5

//exporting router
module.exports=router;