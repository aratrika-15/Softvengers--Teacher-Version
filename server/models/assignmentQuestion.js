const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining the limiting constants
const MAX_SCORE=30;
const MIN_SCORE=1;
const WRONG_OPTIONS=3;


  //defining the schema of assignment questions
const assignmentQnSchema = new Schema({
    assignmentID:{
        unique: true,
        type: Number,
        required: true,
        min:1,
    },
    questionID:{
        unique: true,
        type: Number,
        required: true,
        min:1,
    },
    body:{
        type: String,
        required:true,
    },
    wrongOptions:{
        type: [String],
        required: true,
        validate: {validator: function (v) {
            return v.length===WRONG_OPTIONS}} //validating array length
    },
    correctOption:{
        type: String,
        required: true,
    },
    points:{
        type: Number,
        required: true,
        default: 1,
        min: MIN_SCORE,
        max: MAX_SCORE,

    },
});

const AssignmentQn= mongoose.model('AssignmentQuestion', assignmentQnSchema);
module.exports=AssignmentQn;