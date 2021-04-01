import React, {useState} from 'react';
import { produce } from 'immer';
import {generate} from 'shortid';
import Modal from 'react-modal';
import {Button} from 'reactstrap';

interface QuestionObject {
    id:string
    wrongOptions: string,
    points: Number,
    universeID: Number,
    solarID: Number,
    planetID: Number,
    questionID: Number,
    body: string,
    correctOption: string
}

const Rough = () => {
    const [questions, setQuestions] = useState<QuestionObject []>([
        {id:"",
        wrongOptions: "",
        points: 0,
        universeID: 0,
        solarID: 0,
        planetID: 0,
        questionID: 0,
        body: "",
        correctOption: ""}
    ]);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const setModalIsOpentoTrue = () => {
    //     setIsModalOpen(true);
    // }
    // const setModalIsOpentoFalse = () => {
    //     setIsModalOpen(false);
    // }

    return(
        <>
            {/* <Button onClick = {setModalIsOpentoTrue}> Add Question </Button>
            <Modal isOpen = {isModalOpen} ariaHideApp={false}> */}
                    <div style = {{textAlign: "center"}}>
                    
                    <button onClick = {()=> {
                        setQuestions(currQuestions=> [
                            ...currQuestions,
                            {
                                id: generate(),
                                wrongOptions: "",
                            points: 0,
                            universeID: 0,
                            solarID: 0,
                            planetID: 0,
                            questionID: 0,
                            body: "",
                            correctOption: ""
                            }
                        ])
                    }}> Add New Assignment </button>
                    {questions.map((q,index) =>{
                        return(
                            <div key = {q.id}>
                                <input onChange = {(e)=>{
                                    const wrongOptions = e.target.value;
                                    setQuestions(currQues => 
                                        produce(currQues,(v)=>{
                                            v[index].wrongOptions = wrongOptions;
                                        })
                                        );
                                }}
                                placeholder = "wrong options"></input>
                                <input onChange = {(e)=>{
                                    const points = e.target.value;
                                    setQuestions(currPoint => 
                                        produce(currPoint,(v)=>{
                                            v[index].points = Number(points);
                                        })
                                        );
                                }}
                                placeholder = "points"/>
                                <input onChange = {(e)=>{
                                    const uid = e.target.value;
                                    setQuestions(currUid => 
                                        produce(currUid,(v)=>{
                                            v[index].universeID = Number(uid);
                                        })
                                        );
                                }}
                                placeholder = "universe ID"/>
                                <input onChange = {(e)=>{
                                    const sid = e.target.value;
                                    setQuestions(currSid => 
                                        produce(currSid,(v)=>{
                                            v[index].solarID = Number(sid);
                                        })
                                        );
                                }}
                                placeholder = "solarID"/>
                                <input 
                                placeholder = "planet ID"/>
                                <input placeholder = "question ID"/>
                                <input placeholder = "question body"/>
                                <input placeholder = "correct option"/>
                            </div>
                        )
                    })}
                    <div>
                    {JSON.stringify(questions)}
                    </div>
                </div>
         {/* </Modal> */}
        </>     
    );
};
export default Rough;