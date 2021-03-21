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
        const resultobj = await StudentProgress.find(
            {emailID: req.body.emailID,
            "fullDict.identifier":`(${req.body.universe},${req.body.SolarSystem},${req.body.planet})` }).populate({
                path: 'fullDict',
                match: {identifier: `(${req.body.universe},${req.body.SolarSystem},${req.body.planet})`},
                select: 'maxCorrect'
            }).exec();
        console.log(resultobj);
        res.status(200).send(resultobj);
    }
    catch(err){
        res.status(400).send(err);
    }
};

const getLeaderboard = async(req,res)=>{
    //try{
    const topp = Student.find({}).sort({totalScore: -1}).limit(10);
    console.log(topp);
    res.status(200).send(topp);
//}
//catch(err){
   // res.status(400).send(err);
//}  
};

module.exports={
    getStudent,
    getProgress,
    getLeaderboard
};