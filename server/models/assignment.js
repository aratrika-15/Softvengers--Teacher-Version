const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  //defining the schema of assignments
const assignmentSchema = new Schema({
    assignmentID:{
        unique: true,
        type: Number,
        required: true,
        min:1
    },
    assignmentName:{
        unique: true,
        type: String,
        required: true
    },
    timeLimit:{
        type: Number,
        required:true,
        min:1
    },
    questionIDs:{
        type: [String],
        required: true,
        min:1
    },
    deadline:{
        type: Date,
        required: true
    },
    //did not keep required: True for studentIDs because initially no one has completed it
    studentIDs:{
        type: [String]
    },
});

//making the mongoose model and exporting it
const Assignment= mongoose.model('Assignment', assignmentSchema);
module.exports=Assignment;