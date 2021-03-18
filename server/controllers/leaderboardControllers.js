/*
* deals with controllers for leaderboard
*/
const Student=require('../models/student')

const fullLeaderboard=async(req,res)=>{
    try{
        const StudentArray = await Student.find();
        StudentArray.sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore))
    }
    catch(error){
        res.status(400).send(error); //error checking using try catch
    }
};

const tutLeaderboard=async(req,res)=>{
    try{
        console.log(req.params.tut_gp);
        const tutGrp = req.params.tut_gp;
        const StudentArray =  await Student.find({tutGrp: tutGrp});
        StudentArray.sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore));
        return res.status(200).send(StudentArray);
    }
    catch(error){
        res.status(400).send(error); //error checking using try catch
    }
};

module.exports={
    fullLeaderboard,
    tutLeaderboard
}