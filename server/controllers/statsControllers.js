/*
* this file has controllers to deal with routes related to statistics
*/

const StudentProgress=require('../models/studentProgress');
const Student=require('../models/student');
const Teacher=require('../models/teacher')

const groupStats=(req,res)=>{
    console.log(req.params);
    const tutID = req.params.tut_gp;
    console.log(tutID);
    tutID=tutID.toString();
    try{
        const tutExists = await Teacher.findOne({ tutGrp: tutID});
        if(!tutExists) 
        {
            return res.status(404).send('This tutorial group does not exist');
        }
        else{
            let a=await groupScoreHistories(tutID);
           // console.log(a);
            let b=await groupPercentageCompletion(tutID);
            let c=await groupScoresAchieved(tutID);
            let d=await groupAttemptedDifficulties(tutID);
           let responseObj={
                scoreHistory:a,
                percentageCompletion:b,
                scoresAchieved:c,
                attemptedDifficulties:d,
            }
            res.status(200).send(responseObj);
            }
        }
    
    catch(err){
        res.status(400).send(err);
        console.log(err);
    }

};

const indivStats=async(req,res)=>{

    console.log(req.params);
    let emailID=req.params.student_id;
    console.log(emailID);
    emailID=emailID.toString();
    try{
        const studentExists = await Student.findOne({ emailID: emailID});
        if(!studentExists) 
        {
            return res.status(404).send('This student does not exist');
        }
        else{
            let a=await scoreHistories(emailID);
           // console.log(a);
            let b=await percentageCompletion(emailID);
            let c=await scoresAchieved(emailID);
            let d=await attemptedDifficulties(emailID);
           let responseObj={
                scoreHistory:a,
                percentageCompletion:b,
                scoresAchieved:c,
                attemptedDifficulties:d,
            }
            res.status(200).send(responseObj);
            }
        }
    
    catch(err){
        res.status(400).send(err);
        console.log(err);
    }
};

//group stats function that deals with dailyScore vs Date, for a given student
const groupScoreHistories=async(tutID)=>{
    const student=await Student.findOne({emailID:emailID});
    //console.log(student.scoreHistory);
    return student.scoreHistory;
};

//individual stats function that deals with dailyScore vs Date, for a given student
const scoreHistories=async(emailID)=>{
    const student=await Student.findOne({emailID:emailID});
    //console.log(student.scoreHistory);
    return student.scoreHistory;
    
};

//group stats function that shows how many universes/solar systems and planets the person has conquered
const groupPercentageCompletion=async(tutID)=>{
    return 2;
};

//individual stats function that shows how many universes/solar systems and planets the person has conquered
const percentageCompletion=async(emailID)=>{
    const studentProgress=await StudentProgress.findOne({emailID:emailID});
    percentageCompleted={
        conqueredUniverse:studentProgress.conqueredUniverse,
        conqueredSolar:studentProgress.conqueredSolarSystem,
        conqueredPlanet:studentProgress.conqueredPlanet
    }
    console.log(percentageCompleted);
    return percentageCompleted;

};

//group stats function to show scores achieved in each universe, planet, solar system
const groupScoresAchieved=async(tutID)=>{
    return 2;
};

//individual stats function to show scores achieved in each universe, planet, solar system
const scoresAchieved=async(emailID)=>{
    const studentProgress=await StudentProgress.findOne({emailID:emailID});
    universeList = [];
    solarSystemList = [];

    for (i=0; i < studentProgress.solarSystemDict.length; i++) {
        temp = studentProgress.solarSystemDict[i];
        entry={
            identifier:temp.identifier,
            totalScore:temp.totalScore
        }
        solarSystemList.push(entry)
    }

    for (i=0; i < studentProgress.universeDict.length; i++) {
        temp = studentProgress.universeDict[i];
        entry={
            identifier:temp.identifier,
            totalScore:temp.totalScore
        }
        universeList.push(entry)
    }

    console.log(universeList);
    console.log(solarSystemList);

    totalScoreCompleted={
        universeTotal:universeList,
        solarSystemTotal:solarSystemList
    }

    return totalScoreCompleted
};

//group stats func to show no. of easy/medium/hard questions attempted
const groupAttemptedDifficulties=async(tutID)=>{
    return 2;
};

//individual stats func to show no. of easy/medium/hard questions attempted
const attemptedDifficulties=async(emailID)=>{
    const studentProgress=await StudentProgress.findOne({emailID:emailID});
    let fullDict=studentProgress.fullDict;
    let easy=0;
    let medium=0;
    let hard=0;
    for (var key in fullDict) {
        if (fullDict.hasOwnProperty(key)) {
            planetStats=fullDict[key];
            let level=planetStats.identifier.substring(5,6);
            level=parseInt(level);
            if(level===0)
            {
                easy=easy+planetStats.maxCorrect;
            }
            else if(level===1)
            {
                medium=medium+planetStats.maxCorrect;
            }
            else
            {
                hard=hard+planetStats.maxCorrect;
            }
        }
    }
    let questionsCorrect={
        easyCorrect:easy,
        mediumCorrect:medium,
        hardCorrect:hard
    }
    return questionsCorrect;
};



//exporting the functions
module.exports={
    groupStats,
    indivStats,
}