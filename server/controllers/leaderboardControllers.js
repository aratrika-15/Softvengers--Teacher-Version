/*
* deals with controllers for leaderboard
*/

const fullLeaderboard=(req,res)=>{
    console.log(req.body);
    return res.status(200).send("Ok");
};

const tutLeaderboard=(req,res)=>{
    console.log(req)
};

module.exports={
    fullLeaderboard,
    tutLeaderboard
}