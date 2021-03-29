const Assignment=require('../models/assignment');
//const AssignmentScore = require('../models/assignmentScore');
const AssignmentQn = require('../models/assignmentQuestion');
const Student = require('../models/student');
const schemas = require('../models/assignmentScore');
//const StudentScore = schemas.StudentScore;
const AssignmentScore = schemas.AssignmentScore;

//function to send back a list of assignments
const getassignmentList=(req,res)=>{
    Assignment.find({ tutGrp: req.query.tutGrp } ).sort({assignmentID:1})
    .then((result)=>{
        console.log(result);
        if(result!=null)
        { 
            let assignmentsList=result.map(assignment=>{ 
            let assignmentInfo={
                assignmentID:assignment.assignmentID,
                assignmentName:assignment.assignmentName,
                timeLimit: assignment.timeLimit,
                deadline:assignment.deadline,
            }
             return assignmentInfo; });
             if("[]"=== JSON.stringify(assignmentsList))
             {
                 res.status(400).send('There are currently no assignments in the database');
             }
             else{
        res.status(200).send(assignmentsList);
             }
        }
        else
        {  
            res.status(400).send('There are currently no assignments set by this teacher');
        }
    })
    .catch((err)=>{
        console.log(err);
        console.log('Hello');
        res.status(400).json(err);
    });

}

const getAssignmentQuestions = async (req,res) =>{
    try{
    const questions = await AssignmentQn.find({
        "assignmentID":req.query.assignmentID
        
    });
    console.log(questions);
    res.status(200).send(questions);}
    catch{
        res.status(400).send(err);
    }
}


const assignmentComplete = async(req,res) =>{

    AssignmentScore.update({
        assignmentID: req.body.assignmentID,
        "studentScoreDict.matricNo": req.body.matricNo
    },
    {
        $set:{
            "studentScoreDict.$.scores": req.body.scores,
            "studentScoreDict.$.attemptStatus": true,
        }
    },
    function(
        err,result
    ) {
        if (err) {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(result);
        }
    }
    )

};

module.exports={
    assignmentComplete,
    getassignmentList,
    getAssignmentQuestions
};

// updategetAsssignmentList