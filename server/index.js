//importing the necessary packages/modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const leaderboardRoutes=require('./routes/leaderboard');
const loginRoutes=require('./routes/login');
const studentCreationRoutes =require('./routes/studentcreation');
const statsRoutes=require('./routes/statistics');
const questionRoutes=require('./routes/question');
const assignmentRoutes=require('./routes/assignment');

// student routes
const loginStudentRoutes = require ('./student_routes/login');
const getProgressRoutes = require('./student_routes/progress');
const gameRoutes = require('./student_routes/game')


dotenv.config();

//express app
const app= express();

//connecting to mongoDB and then listening for requests on port
const dbConnection=process.env.DBURL;
const port=process.env.PORT;
mongoose.connect(dbConnection, {useNewUrlParser:true, useUnifiedTopology:true})
.then(result=>{
    console.log(result);
    app.listen(port);
    console.log('listening at port'+port);
})
.catch(err=>console.log(err));

//identifies incoming request as a json object
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//setting up the routes
app.use('/student',loginStudentRoutes);
app.use('/student/getProgress',getProgressRoutes);
app.use('/student/game',gameRoutes);
app.use('/teacher/leaderboard',leaderboardRoutes);
app.use('/teacher/statistics',statsRoutes);
app.use('/teacher/question',questionRoutes);
app.use('/teacher/assignment',assignmentRoutes);
app.use('/teacher/createstudent',studentCreationRoutes);
app.use('/teacher',loginRoutes);


//handling 404
app.use((req,res)=>{
    console.log("User requested a resource which is unavailable");
    res.status(404).send('Resource not found');
});