import React from 'react';
import $ from 'jquery';
import { Card, CardBody, CardText, CardImg, CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalBody, ModalHeader, Label, Row , Col } from 'reactstrap';


export default class ViewQuestionbank extends React.Component{
    state = {
        questions:" ",
        loading:true
    };
    
    async componentDidMount(){

        fetch('http://localhost:5000/teacher/question')
        .then(response => response.json())
        .then(data => this.setState({questions: data, loading:false}));
        
    }

    render()
    {
        console.log("render state:",this.state.questions);
        return(

            <div>
                {this.state.loading|| !this.state.questions? <div> Loading... </div>: 
                <div>
                    {
                        this.state.questions.map((data)=>{
                                return(
                                    <div className = "col-12 col-md m-1" key={data.q_id }>
                                        <Card>
                                            <CardBody>
                                            {/* <CardTitle>{dish.name}</CardTitle> */}
                                            <CardText>{data.body}</CardText>
                                            <CardText>{data.correct_option}</CardText>
                                            </CardBody>
                                        </Card>
                                    </div>

                            )
                        }

                        )
                    }
                </div>
                
                }
            </div>
         )
    }
}

