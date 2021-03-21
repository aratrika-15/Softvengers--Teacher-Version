const schemas = require('../models/challenge');

const challengeSchema = schemas.Challenge;

const studentTaker = schemas.student;


const createChallenge = async (req,res) =>{
    const student = new studentTaker({
        emailID: req.body.senderEmailID,
        attempted: false,
        score: 0,
        timeTaken: 0
    });
    // populate questionIDs
    


    const challenge = new challengeSchema({
        challengeName: req.body.challengeName,
        sender: student,
        questionIds: [],
        receivers: [],
        questionTopics: req.body.topics,

    });

    try{
        const savedChallenge = await challenge.save();
        res.send({challengeID: savedChallenge.id});
    }
    catch(err){
        res.status(400).send(err);
    }


}

module.exports={
    createChallenge,

};