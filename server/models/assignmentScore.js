const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assnmtScoreSchema=new Schema({

});

const AssignmentScore= mongoose.model('AssignmentScore', assnmtScoreSchema);
module.exports=AssignmentScore;