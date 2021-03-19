/*
* controllers for assignment
*/
const Assignment = require('../models/assignment');
const AssignmentQn = require('../models/assignmentQuestion');

const assignmentList=(req,res)=>{
};

const assignmentDetails=(req,res)=>{

};

const newAssignment=(req,res)=>{
    const assignmentID = req.params.a_id;
    const { assignmentName, timeLimit, questionIDs, deadline, studentIDs } = req.body[0];
    console.log(req.body[0]);

    // const assignment = new Assignment({
    //     assignmentID:assignmentID,
    //     timeLimit:timeLimit,
    //     questionIDs: questionIDs,
    //     deadline:deadline,
    //     studentIDs:studentIDs
    // });
    // assignment.save().then((result)=>{
    //     console.log(result);})
    //      .catch((err)=>{
    //          console.log(err);
    //      res.status(400).send(err);});

    console.log("questionLength", questionIDs.length);
    for (i = 0; i < questionIDs.length; i++) {
        console.log(req.body[i+1]);
        console.log(req.body[i+1].questionID);
        
        // if (questionIDs[i] == req.body[i+1].questionID) {
            // const { questionID, body, wrongOptions, correctOption, points } = req.body[i+1];
        //     const assignmentQ = new AssignmentQn({
        //         assignmentID:assignmentID,
        //         questionID:questionID,
        //         body: body,
        //         wrongOptions:wrongOptions,
        //         correctOption:correctOption,
        //         points:points,
        //     });
        //     assignmentQ.save().then((result)=>{
        //         console.log(result);})
        //          .catch((err)=>{
        //              console.log(err);
        //          res.status(400).send(err);});
        // }
    }
};

//exporting the functions
module.exports={
    assignmentDetails,
    assignmentList,
    newAssignment,
};