const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining limiting constants
const MIN_SCORE=0;
const MIN_VOL=0;
const MAX_VOL=100;

//defining the scoreHistory sub-schema
const scoreHistory=new Schema({
    sysDate:{
        type:Date,
        required:true,
        default: Date.now,
    },
    dailyScore:{
        type: Number,
        required:true,
        default:0,
        min:MIN_SCORE,
    },
});

//defining the database schema for a student
const studentSchema= new Schema({
    emailID:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    matricNo:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    tutGrp:{
        type: String,
        required: true,
        
    },
    volume:{
        type: Number,
        required: true,
        default: 0,
        min:MIN_VOL,
        max:MAX_VOL,
    },
    avatar:{
        type: Number,
        required: true,
        default: 0,
    },
    totalScore:{
        type: Number,
        required: true,
        default:0,
        min: MIN_SCORE,
    },
    scoreHistory:{
        type: subSchema,
        required:true,
        default: {}
    }

});

const Student= mongoose.model('Student', studentSchema);
module.exports=Student;