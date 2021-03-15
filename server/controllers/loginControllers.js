/*
* This file has controllers to deal with teacher login
*/

//imports 
const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//setting constants
const accessTokenSecret=process.env.TOKEN;
const saltRounds=10;


const teacherLogin=async(req,res)=>{
    console.log('teacher login in progress');
    const {emailID,password}=req.body;
      //validating the username and password
      const emailExists = await Teacher.findOne({emailID: emailID});
      if(emailExists)
      {
          const passwordCheck = await bcrypt.compare(password, emailExists.password);
          if(passwordCheck)
          {
           //generating and returning the token
           const token = jwt.sign({ email: emailExists.emailID,  id:emailExists._id , tutGp:emailExists.tutGrp}, accessTokenSecret);   
           res.status(200).header('token', token).send(token);   
          }
          else
          {
              return res.status(404).send("Password is incorrect for the user");
          }
         
      }
      else
      {
          return res.status(404).send('Username does not exist');
      }
      
  

};

const teacherRegister=(req,res)=>{
    console.log('teacher registration in progress');
};

module.exports={
    teacherLogin,
    teacherRegister,
};