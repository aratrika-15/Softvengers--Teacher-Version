//const StudentProgress = require('../models/studentProgress');
const studentProgress = require('../models/studentProgress');

const unlockUniverse = async(req,res)=>{
        
        // student progress update
        
        var fullDict = {
            identifier: "(0,0,1)",
            maxScore:0,
            minScore:0,
            avgScore:0
        };

        var solarSystemDict = {
            identifier: "(0,0)",
            maxScore:0,
            minScore:0,
            avgScore:0
        }

        var universeDict = {
            identifier: "0",
            maxScore:0,
            minScore:0,
            avgScore:0
        }

        
            studentProgress.updateOne({ emailID: req.body.emailID }, {
                conqueredUniverse: req.body.conqueredUniverse,
                conqueredSolarSystem: req.body.conqueredSolarSystem,
                conqueredPlanet: req.body.conqueredPlanet,
                $push:{
                    fullDict: fullDict,
                    solarSystemDict: solarSystemDict,
                    universeDict: universeDict
                }
            }, function(
                err,
                result
            ) {
                if (err) {
                res.status(500).send(err);
                }
                else{
                    res.status(200).send(result)
                }
            });
        
        
};

module.exports={
    unlockUniverse,
};