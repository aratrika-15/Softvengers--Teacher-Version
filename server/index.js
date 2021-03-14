//importing the necessary packages/modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const teacherRoutes=require('./teacherRoutes');

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
app.use(bodyParser.urlencoded({ extended: false }));

//setting up the routes
//app.use('/student',studentRoutes);
//app.use('/',teacherRoutes);


//handling 404
app.use((req,res)=>{
    console.log("User requested a resource which is unavailable");
    res.status(404).send('Resource not found');
});
