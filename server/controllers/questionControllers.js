/*
* controllers for dealing with question bank
*/

const questionList=(req,res)=>{
    const qList=[
        {
            q_id:1,
            body:"Whats ur name",
            correct_option:"God",
            wrong_options:["a","v","s"]
        },
        {
            q_id:2,
            body:"Whats ur age",
            correct_option:"0",
            wrong_options:["1","2","3"]
        }
    ]
    res.send(qList);
};

const questionDetails=(req,res)=>{

};

const newQuestion=(req,res)=>{

};

const updateQuestion=(req,res)=>{

};

const deleteQuestion=(req,res)=>{

};

module.exports={
    questionDetails,
    questionList,
    newQuestion,
    deleteQuestion,
    updateQuestion,
};