/*
* this file has controllers to deal with routes related to statistics
*/

const StudentProgress=require('../models/studentProgress');
const Student=require('../models/student');

const groupStats=(req,res)=>{

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
    }
};

//individual stats function that deals with dailyScore vs Date, for a given student
const scoreHistories=async(emailID)=>{
    const student=await Student.findOne({emailID:emailID});
    //console.log(student.scoreHistory);
    return student.scoreHistory;
    
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

//individual stats function to show scores achieved in each universe, planet, solar system
const scoresAchieved=(emailID)=>{
    return 2;
};

//individual stats func to show no. of easy/medium/hard questions attempted
const attemptedDifficulties=(emailID)=>{
    return 3;
};



//exporting the functions
module.exports={
    groupStats,
    indivStats,
}