const Student = require('../models/student');

const getDetails = async(req,res)=>{
    try{
        // get Student details
        const stud = await Student.findOne({emailID: req.body.emailID});
        let pseudo = JSON.parse(JSON.stringify(stud));
        delete pseudo['password'];
        delete pseudo['__v'];
        // get studentProgress

        res.setHeader('Content-Type', 'application/json');
        res.json(pseudo);

    }
    catch(err){
        res.status(404).json({message: "Student does not exist"});

    }
};

module.exports={
    getDetails,
};