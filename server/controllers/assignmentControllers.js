/*
* controllers for assignment
*/
const Assignment=require('../models/assignment');
const AssignmentScore = require('../models/assignmentScore');
const AssignmenttScore=require('../models/assignmentScore');

//function to send back a list of assignments
const assignmentList=(req,res)=>{
    console.log(req.params);
    const tutGrp=req.params.tut_grp;
    Assignment.find({ tutGrp: { $eq: tutGrp } } ).sort({assignmentID:1})
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


};

const assignmentDetails=(req,res)=>{
    const assignmentID=req.params.a_id;
    //using this assignment id return the assignment details and the assignment score details
    //need to return assignment id, assignment name, time limit, deadline, [{matric No, firstName, lastName, attempt_status, score}]
    Assignment.findOne({assignmentID:assignmentID})
    .then(result=>{
        console.log(result);
        if(result!=null)
        {
            AssignmentScore.find({ assignmentID: { $eq: assignmentID } } ).sort({firstName:1})
            .then((scoresResult)=>{
                //scoreResult has the assignmentID, matricNo, firstName, lastName, attemptStatus and score of each student
                let assDetails={
                    assnt:result,
                    scoresResults:scoresResult,
                }
                
                res.status(200).send(assDetails);//sending back Assignment Scores
            })
            .catch(err =>{

                console.log(err);
                res.status(400).send(err);
            });        
        }
        else
        res.status(404).send("Assignment with such an ID does not exist");
    })
    .catch(err =>{

        console.log(err);
        res.status(400).send(err);
    });


};

const newAssignment=(req,res)=>{

};

//exporting the functions
module.exports={
    assignmentDetails,
    assignmentList,
    newAssignment,
};