//importing the necessary packages/modules
const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');

//express app
const app= express();

//connecting to mongoDB and then listening for requests on port
const dbConnection='';
const PORT=process.env.PORT || 5000;
mongoose.connect(dbConnection, {useNewUrlParser:true, useUnifiedTopology:true})
.then(result=>{
    console.log(result);
    app.listen(PORT);
})
.catch(err=>console.log(err));

