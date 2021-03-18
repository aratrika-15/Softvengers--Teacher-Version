/*
* deals with controllers for leaderboard
*/
const Student=require('../models/student')

const fullLeaderboard=async(req,res)=>{
        const StudentArray = await Student.find()    
        .then((result)=>{
            console.log(result);
            if(result!=null)
            {let leaders=result.map((leader)=>{ 
                let lead={
                    firstName:leader.firstName,
                    lastName:leader.lastName,
                    emailID:leader.emailID,
                    totalScore:leader.totalScore,
                }
                    return lead; });
            res.status(200).send(leaders.sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore))
            );
            }
            else
            {
                res.status(400).send('There are no students in leaderboard');
            }

            return res.status(200).send(StudentArray);
        })
        .catch ((err)=>{
            res.status(400).send(err); //error checking using try catch
        });
};

const tutLeaderboard=async(req,res)=>{
    console.log(req.params.tut_gp);
    const tutGrp = req.params.tut_gp;
    const StudentArray =  await Student.find({tutGrp: tutGrp}).then((result)=>{
        console.log(result);
        if(result!=null)
        {let leaders=result.map((leader)=>{ 
            let lead={
                firstName:leader.firstName,
                lastName:leader.lastName,
                emailID:leader.emailID,
                totalScore:leader.totalScore,
            }
                return lead; });
        res.status(200).send(leaders.sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore))
        );
        }
        else
        {
            res.status(400).send('There are no students in leaderboard');
        }
        
        return res.status(200).send(StudentArray);
    })
    .catch ((err)=>{
        res.status(400).send(err); //error checking using try catch
    });
};

module.exports={
    fullLeaderboard,
    tutLeaderboard
}