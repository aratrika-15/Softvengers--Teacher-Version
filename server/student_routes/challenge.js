//importing modules
const express=require('express');

//importing controllers
const challengeControllers=require('../student_controllers/challengeControllers');

//express router
const router=express.Router();

//routing
router.post('/createChallenge',challengeControllers.createChallenge);
router.patch('/sendChallenge', challengeControllers.sendChallenge);
router.get('/getReceivedChallenges', challengeControllers.getReceivedChallenges);
router.get('/getSentChallenges',challengeControllers.getSentChallenges);
router.patch('/endChallenge',challengeControllers.attemptChallenge);
router.get('/getQuestions',challengeControllers.getQuestions);
router.patch('/declineChallenge',challengeControllers.declineChallenge);

//exporting router
module.exports=router;