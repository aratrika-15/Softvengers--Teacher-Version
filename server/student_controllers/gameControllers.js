//const StudentProgress = require('../models/studentProgress');
const studentProgress = require('../models/studentProgress');
const student = require('../models/student');

const unlockUniverse = async(req,res)=>{  
        
        studentProgress.updateOne({ emailID: req.body.emailID }, {
            conqueredUniverse: req.body.conqueredUniverse,
            conqueredSolarSystem: req.body.conqueredSolarSystem,
            conqueredPlanet: req.body.conqueredPlanet,
        }, function(
            err,
            result
        ) {
            if (err) {
            res.status(500).send(err);
            }
            else{
                res.status(200).send("Successful update");
            }
        });


        
        
};

const endGame = async(req,res)=>{

    var finalMessage;
    //updating studentProgress 
        studentProgress.update(
            {
                emailID: req.body.emailID,
                "fullDict.identifier": `(${req.body.universe},${req.body.SolarSystem},${req.body.planet})`,
                "solarSystemDict.identifier": `(${req.body.universe},${req.body.SolarSystem})`,
                "universeDict.identifier": `(${req.body.universe})`
                
            },
            {$max:{
                "fullDict.$.maxScore": req.body.score,
                "fullDict.$.maxCorrect": req.body.correctAnswers,
                "solarSystemDict.$.maxScore": req.body.score,
                "universeDict.$.maxScore": req.body.score,
            },
            $min:   {
                "fullDict.$.minScore": req.body.score,
                "solarSystemDict.$.minScore": req.body.score,
                "universeDict.$.minScore": req.body.score
            },
            $inc:{
                "fullDict.$.attempts": 1,
                "fullDict.$.totalScore": req.body.score,
                "solarSystemDict.$.attempts": 1,
                "solarSystemDict.$.totalScore": req.body.score,
                "universeDict.$.attempts": 1,
                "universeDict.$.totalScore": req.body.score
            },

        },
        function(
            err,
            result
        ) {
            if (err) {
                finalMessage = false
                res.status(500).send("Update error in studentProgress")
            }
            else{
                
                finalMessage = true
            }
        }

        );
        var date = new Date();
       const dateExist = await student.exists({
           emailID: req.body.emailID,
           "scoreHistory.sysDate": date.toISOString().slice(0,10)
       });
       console.log(dateExist);
       console.log(date.toISOString().slice(0,10));
       if (dateExist){
           student.update(
               {
                   emailID: req.body.emailID,
                   "scoreHistory.sysDate": date.toISOString().slice(0,10)
               },
               {
                   $set:{
                       totalScore: req.body.totalScore,
                   },
                   $max:{
                    "scoreHistory.$.dailyScore": req.body.score
                   }
               },
               function(
                err,
                result
            ) {
                if (err) {
                    if (finalMessage)
                        res.status(500).send("Update error in student")
                    else
                        finalMessage = false
                }
                else{
                    finalMessage = true
                    res.status(200).send('Success');
                }
            }
           );
       }
       else{
        student.update(
            {
                emailID: req.body.emailID,
            },
            {
                $set:{
                    totalScore: req.body.totalScore,
                },
                $push:{
                 scoreHistory:{
                     dailyScore: 0,
                     "sysDate": date.toISOString().slice(0,10)
                 }
                }
            },
            function(
             err,
             result
         ) {
             if (err) {
                 if (finalMessage)
                     res.status(500).send("Update error in student")
                 else
                     finalMessage = false
             }
             else{
                 finalMessage = true
                 res.status(200).send('Success');
             }
         }
        );
       }
}



module.exports={
    unlockUniverse,
    endGame
};