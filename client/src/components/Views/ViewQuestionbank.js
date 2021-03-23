import React from 'react';
import $ from 'jquery';
import { Card, CardBody, CardText, CardImg, CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalBody, ModalHeader, Label, Row , Col } from 'reactstrap';


export default class ViewQuestionbank extends React.Component{
    state = {
        questions:" ",
        loading:true
    };
    
    async componentDidMount(){var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");


        fetch('http://localhost:5000/teacher/question',{headers: myHeaders})
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

