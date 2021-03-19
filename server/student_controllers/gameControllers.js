//const StudentProgress = require('../models/studentProgress');
const studentProgress = require('../models/studentProgress');

const unlockUniverse = async(req,res)=>{
        
        // student progress update
        var fullDict = {
            identifier: `(${req.body.conqueredUniverse},${req.body.conqueredSolarSystem},${req.body.conqueredPlanet})`,
            maxScore:0,
            minScore:0,
            avgScore:0
        };

        var solarSystemDict = {
            identifier: `(${req.body.conqueredUniverse},${req.body.conqueredSolarSystem})`,
            maxScore:0,
            minScore:0,
            avgScore:0
        }


        //checking universe exists

        var universeDict = {
            identifier: `${req.body.conqueredUniverse}`,
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

const endGame = async(req,res)=>{
    
}



module.exports={
    unlockUniverse,
};