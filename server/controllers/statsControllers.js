/*
* this file has controllers to deal with routes related to statistics
*/

const StudentProgress=require('../models/studentProgress');
const Student=require('../models/student');
const Teacher=require('../models/teacher')
const moment = require('moment');

const groupStats=async(req,res)=>{
    console.log(req.params);
    const tutID = req.params.tut_id;
    console.log(tutID);
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
            //console.log(b);
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

    const today = moment().add(1,'days');
    const twoWeeksAgo = moment().add(-13, 'days')

    dates = []

    for (var m = moment(twoWeeksAgo); m.isBefore(today); m.add(1, 'days')) {
        // console.log(m.format('MMM Do YY'), m.format('YYYY-MM-DD'));
        dates.push(m.format('YYYY-MM-DD'))
      }
    
    let scores = []
    const students=await Student.find({tutGrp:tutID});
    for (i=0; i < students.length; i++) {
        scores = scores.concat(students[i].scoreHistory);
    }
    const scoresSorted = []
    // console.log(scores);
    for (i=0; i < dates.length; i++) {
        
        let scoresOfDate = []
        for (j=0; j < scores.length; j++) {
            const tempScoreDate = moment(scores[j].sysDate).format('YYYY-MM-DD')
            // console.log(tempScoreDate, dates[i], tempScoreDate == dates[i])
            if (tempScoreDate == dates[i]) scoresOfDate.push(scores[j].dailyScore);
        }
        console.log(dates[i], scoresOfDate)
        const temp={
            date:dates[i],
            averageScores:scoresOfDate.reduce(function(sum, a) { return sum + a },0)/(scoresOfDate.length||1)
        }
        scoresSorted.push(temp);
    }
    return scoresSorted;
};

//individual stats function that deals with dailyScore vs Date, for a given student
const scoreHistories=async(emailID)=>{
    const student=await Student.findOne({emailID:emailID});
    //console.log(student.scoreHistory);
    return student.scoreHistory;
    
};

//group stats function that shows how many universes/solar systems and planets the person has conquered
const groupPercentageCompletion=async(tutID)=>{
    const students=await Student.find({tutGrp:tutID});
    let len=students.length;
    let arr=[];
    for(let i=0;i<len;i++)
    {
        const percentageCompleted=await percentageCompletion(students[i].emailID);
        console.log(percentageCompleted.conqueredUniverse);
        arr.push(percentageCompleted.conqueredUniverse);
    }
    var counts = {};

    for (var i = 0; i < arr.length; i++) {
        var num = parseInt(arr[i]);
        counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
    return counts;
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
    const students=await Student.find({tutGrp:tutID});
    let len=students.length;
    console.log(len);
    let easy=[];
    let medium=[];
    let hard=[];
    let maxEasyCorrect=0;
    let maxMediumCorrect=0;
    let maxHardCorrect=0;
    for(let i=0;i<len;i++)
    {
        const attemptedDifficulty=await attemptedDifficulties(students[i].emailID);
        console.log(attemptedDifficulty);
        easy.push(attemptedDifficulty.easyCorrect);
        medium.push(attemptedDifficulty.mediumCorrect);
        hard.push(attemptedDifficulty.hardCorrect);
        if(attemptedDifficulty.easyCorrect>maxEasyCorrect)
        {
            maxEasyCorrect=attemptedDifficulty.easyCorrect;
        }
        if(attemptedDifficulty.mediumCorrect>maxMediumCorrect)
        {
            maxMediumCorrect=attemptedDifficulty.mediumCorrect;
        }
        if(attemptedDifficulty.hardCorrect>maxHardCorrect)
        {
            maxHardCorrect=attemptedDifficulty.hardCorrect;
        }
    }
    console.log(easy);
    console.log(medium);
    console.log(hard);
    const Avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    const easyAvg=Avg(easy);
    const mediumAvg=Avg(medium);
    const hardAvg=Avg(hard);
    const averageAttemptedDifficulties={
        "avgEasyCorrect":easyAvg,
        "avgMediumCorrect":mediumAvg,
        "avgHardCorrect":hardAvg,
        "maxEasyCorrect":maxEasyCorrect,
        "maxMediumCorrect":maxMediumCorrect,
        "maxHardCorrect":maxHardCorrect,
    }
    console.log(averageAttemptedDifficulties);
    //returning the average number of easy/medium/hard questions answered by students of this tut group
    //also returning the maximum number of easy/medium/hard questions answered by students of this tut group
    return averageAttemptedDifficulties;
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