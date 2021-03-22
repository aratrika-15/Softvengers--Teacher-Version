const Student = require('../models/student');
const StudentProgress = require('../models/studentProgress');

const getStudent = async(req,res)=>{
    try{
        //get Student details
        const stud = await Student.findOne({emailID: req.body.emailID});
        const sp = await StudentProgress.findOne({emailID: req.body.emailID});
        let sp_pseudo = JSON.parse(JSON.stringify(sp));
        let pseudo = JSON.parse(JSON.stringify(stud));


        // delete items not required
        delete pseudo['password'];
        delete pseudo['__v'];
        delete pseudo['scoreHistory'];

        // add items required
        pseudo['conqueredUniverse'] = sp_pseudo['conqueredUniverse'];
        pseudo['conqueredSolarSystem'] = sp_pseudo['conqueredSolarSystem'];
        pseudo['conqueredPlanet'] = sp_pseudo['conqueredPlanet'];

        // send details

        res.setHeader('Content-Type', 'application/json');
        res.json(pseudo);

    }
    catch(err){
        res.status(404).json({message:"Student does not exist in DB"});

    }
};

const getProgress = async(req,res)=>{
    try{
        //get student details and full dict identifier
        const resultobj = await StudentProgress.findOne(
            {emailID: req.body.emailID,
            "fullDict.identifier":`(${req.body.universe},${req.body.SolarSystem},${req.body.planet})` },
            {
                "fullDict.$":1,
                _id: 0
            });
        console.log(resultobj['fullDict'][0]['maxCorrect']);
        res.status(200).json({
            "maxCorrect": resultobj['fullDict'][0]['maxCorrect']
        });
    }
    catch(err){
        res.status(404).send("Invalid tuple");
    }
};

const getMaxScore = async(req,res)=>{
    try{
        //get student details and full dict identifier
        const resultobj = await StudentProgress.findOne(
            {emailID: req.body.emailID,
            "fullDict.identifier":`(${req.body.universe},${req.body.SolarSystem},${req.body.planet})` },
            {
                "fullDict.$":1,
                _id: 0
            });
        console.log(resultobj['fullDict'][0]['maxScore']);
        res.status(200).json({
            "maxScore": resultobj['fullDict'][0]['maxScore']
        });
    }
    catch(err){
        res.status(400).send("Invalid tuple");
    }
};

const getLeaderboard = async(req,res)=>{
    //try{
    const studentSorted = await Student.find().sort({'totalScore': -1});
    let rank = 0;
    let finalRank = 0;
    studentSorted.map((student)=>{
        if (student.emailID == req.body.emailID){
            finalRank = rank;
        }
        else{
            rank++;
        }
    });
    console.log(finalRank);
    res.status(200).json({student: studentSorted.slice(0,9), myRank: finalRank+1});
//}
//catch(err){
   // res.status(400).send(err);
//}  
};

module.exports={
    getStudent,
    getProgress,
    getLeaderboard,
    getMaxScore
};