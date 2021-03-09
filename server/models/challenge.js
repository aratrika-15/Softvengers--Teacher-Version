const mongoose=require('mongoose');

const Schema=mongoose.Schema;

//defining the constants
const MIN_QUES=5;

//creating the schema for challenges in the database
const challengeSchema=new Schema({
    challengeId:{
        unique: true,
        type: Number,
        required: true,
        min:1,
    },
    challengeName:{
        type:String,
        required:true,
    },
    questionIds:{
        type:[Number],
        required:true,
        validate: {validator: function (v) {
            return v.length>=MIN_QUES}} //validating array length
    }
    
});

//making the mongoose model and exporting it
const Challenge=mongoose.model('Challenge',challengeSchema);
module.exports=Challenge;