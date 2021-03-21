const questions = require('../models/planetQuestion');

const getQuestions = async(req,res)=>{
    // try{
        questions.find({
            universeName: req.body.universe,
            solarSystemName: req.body.solarSystem,
        }).then((result)=>{
            if(result!=null)
            {  
                let planetQuestions=result.map(planetQ=>{ 
                let question={
                    questionID:planetQ.questionID,
                    body:planetQ.body,
                    correctOption:planetQ.correctOption,
                    wrongOptions:planetQ.wrongOptions,
                    difficulty: planetQ.difficulty
                }
                 return question; });
            if("[]"=== JSON.stringify(planetQuestions))
            {
                res.status(400).send('Universe or SS does not exist');
            }
            else
            {
            res.status(200).send(JSON.parse(JSON.stringify(planetQuestions)));
            }
            }
            else
            {
                res.status(400).send('Universe or SS does not exist');
            }
        })
    // catch(err){
    //     res.status(404).send("Universe or solar system does not exist")
    // }
}

module.exports={
    getQuestions,
}