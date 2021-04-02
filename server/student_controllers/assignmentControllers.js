const Assignment=require('../models/assignment');
//const AssignmentScore = require('../models/assignmentScore');
const AssignmentQn = require('../models/assignmentQuestion');
const Student = require('../models/student');
const schemas = require('../models/assignmentScore');
//const StudentScore = schemas.StudentScore;
const AssignmentScore = schemas.AssignmentScore;

//function to send back a list of assignments
const getassignmentList=async (req,res)=>{
    const assign = await AssignmentScore.find({
        'studentScoreDict.matricNo': req.query.matricNo
    })
    let assignments = assign.map((res)=>{
        return res.assignmentID
    });
    console.log(assignments);
    const myDetails = await AssignmentScore.find({
        'studentScoreDict.matricNo': req.query.matricNo
    },
    {
        'studentScoreDict.$':1,
        _id : 0
    });
    console.log(assign);
    //console.log(myDetails[2])//.studentScoreDict.scores);

    const assigndetails = await Assignment.find({
        'assignmentID':{
            $in: assignments
        }
    });
    let finalMessage = JSON.parse(JSON.stringify(assigndetails));
    finalMessage.map((assign, row)=>{
        console.log(myDetails[row].studentScoreDict[0].scores);
        console.log(myDetails[row].studentScoreDict[0].attemptStatus);
        assign['myScore'] = myDetails[row].studentScoreDict[0].scores;
        assign['myStatus'] = myDetails[row].studentScoreDict[0].attemptStatus;
        delete assign['questionIDs'];
        delete assign['__v'];

    })
    console.log(finalMessage);
    res.status(200).send(finalMessage);
//     Assignment.find({ tutGrp: req.query.tutGrp } ).sort({assignmentID:1})
//     .then((result)=>{
//         console.log(result);
//         if(result!=null)
//         { 
//             let assignmentsList=result.map(assignment=>{ 
//             let assignmentInfo={
//                 assignmentID:assignment.assignmentID,
//                 assignmentName:assignment.assignmentName,
//                 timeLimit: assignment.timeLimit,
//                 deadline:assignment.deadline,
//             }
//              return assignmentInfo; });
//              if("[]"=== JSON.stringify(assignmentsList))
//              {
//                  res.status(400).send('There are currently no assignments in the database');
//              }
//              else{
//         res.status(200).send(assignmentsList);
//              }
//         }
//         else
//         {  
//             res.status(400).send('There are currently no assignments set by this teacher');
//         }
//     })
//     .catch((err)=>{
//         console.log(err);
//         console.log('Hello');
//         res.status(400).json(err);
//     });

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
