//importing the necessary packages/modules
const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
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


