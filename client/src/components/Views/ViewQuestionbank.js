
import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider  } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import { dictOfUniverse, dictOfSolar, dictOfPlanet } from './../../variables/general';
import Link from '@material-ui/core/Link'

// const ViewQuestionbank = (props) => {
//     return(
// <div>
//         <NewQuestion/>
//     </div>
//     )
    
// }
function createData(universe,solar, planet, questionID, question) {
    return { Universe: dictOfUniverse[universe-1], Solar: dictOfSolar[solar-1], Planet: dictOfPlanet[planet-1], QuestionID: questionID, question};
  }

    const ViewQuestionbank = (props) => {
        const [inputState, setInput] = React.useState({});
        const [questions, setQuestions] = useState([]);
        const [loading, setLoading] = useState(true);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [optionA,setA] = useState('');
        const [optionB,setB] = useState('');
        const [optionC,setC] = useState('');
        const [optionD,setD] = useState('');
        const config = {
            headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc"}
        };
        const fetchQuestions = async () => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");
                fetch('http://localhost:5000/teacher/question',{headers: myHeaders})
                .then(response => response.json())
                .then(data => setQuestions(data))
                .then(setLoading(false));
                 
        }
        

        const handleChange = (event) => {
          console.log('target val',event.target.value);
            switch(event.target.name){
              case "OptionA":
                setA(event.target.value);
                break;
              case "OptionB":
                setB(event.target.value);
                break;
              case "OptionC":
                setC(event.target.value);
                break;
              case "OptionD":
                setD(event.target.value);
                break;
              default:
                if (event.target.name == "body" || event.target.name == "correctOption" )
                  {inputState[event.target.name] = event.target.value;}
                else
                  {inputState[event.target.name] = Number(event.target.value);}
                break;
            }
            
            setInput(inputState);
          };
          // Add dialog
        const [AddOpen, setAddOpen] = React.useState(false);
        function editDelDialog(){
            
                
                    // <IconButton onClick={() => toggleEditModal(index)}>
                    //     <EditIcon />
                    //   </IconButton> 
                    <div>
                      <Dialog open={EditOpen} onClose={handleEditCancel} aria-labelledby="form-dialog-title" maxWidth='xl'>
                          <DialogTitle id="form-dialog-title" color='primary'>Edit Question</DialogTitle>
                          <DialogContent>
                          <form  noValidate autoComplete="off">
                            <TextField name = "universeID" id="standard-basic" label="Universe" required="true" style = {{width: '45%'}} defaultValue={dictOfUniverse[inputState.universeID-1]} onChange={handleChange}/>
                            <TextField name = "solarID" id="standard-basic" label="Solar" required="true" style = {{width: '45%'}}  defaultValue={dictOfSolar[inputState.solarID-1]} onChange={handleChange}/>
                            <TextField name = "planetID" id="standard-basic" label="Planet" required="true" style = {{width: '45%'}} defaultValue={dictOfPlanet[inputState.planetID-1]} onChange={handleChange}/>
                            <TextField name = "questionID" id="standard-basic" label="Quiz Question" fullWidth="true" required="true" style = {{width: '91%'}} defaultValue={inputState.body} onChange={handleChange}/>
                          
                            <Typography variant="h7" >
                            <br></br> {"     "}Select the Checkbox with the correct option:
                            </Typography>
                            <div >
  
                            <Checkbox
                              defaultChecked = {inputState.correctOption === "A"}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="A"
                              onChange={checkAns}
                            />
                            <TextField name = "OptionA" id="standard-basic" label="Option 1" required="true" style = {{width: '90%'}} defaultValue={inputState.Options && inputState.Options.A} onChange={handleChange}/>
                            </div>
                            <div >
                            <Checkbox
                              defaultChecked = {inputState.correctOption === "B"}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="B"
                              onChange={checkAns}
                            />
                            <TextField name = "OptionB" id="standard-basic" label="Option 2" required="true" style = {{width: '90%'}} defaultValue={inputState.Options && inputState.Options.B} onChange={handleChange}/>
                            </div>
                            <div>
                            <Checkbox
                              defaultChecked = {inputState.correctOption === "C"}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="C"
                              onChange={checkAns}
                            />
                            <TextField name = "OptionC" id="standard-basic" label="Option 3" required="true" style = {{width: '90%'}} defaultValue={inputState.Options && inputState.Options.C} onChange={handleChange}/>
                            </div>
                            <div>
                            <Checkbox
                              defaultChecked = {inputState.correctOption === "D"}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="D"
                              onChange={checkAns}
                            />
                            <TextField name = "OptionD" id="standard-basic" label="Option 4" required="true" style = {{width: '90%'}} defaultValue={inputState.Options && inputState.Options.D} onChange={handleChange}/>
                            </div>
                          </form>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleEditCancel} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={handleEditOk} color="primary">
                              Update Quiz
                            </Button>
                          </DialogActions>
                        </Dialog>
                     {/* <IconButton onClick={() => toggleDeleteModal(realIndex)}>
                       <DeleteIcon/>
                       </IconButton>  */}
                      <Dialog open={DeleteOpen} onClose={handleDeleteCancel} aria-labelledby="form-dialog-title" maxWidth='xl'>
                        <DialogTitle id="form-dialog-title" color='primary'>Delete Question</DialogTitle>
                        <DialogContent>Are you sure you want to delete this question?</DialogContent>
                        <DialogActions>
                          <Button onClick={handleDeleteCancel} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={handleDeleteOk} color="primary">
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                      </div>
                   
                    }
     
        const toggleAddModal = () => {
            const newObj = {
              universeID: 1,
              solarID: 1,
              planetID: 1,
              questionID: 1,
              body: "",
              correctOption: "A",
              wrongOptions:[],
            }
            setAddOpen(true);
            setInput(newObj);
            
          };
        useEffect(()=>{
            fetchQuestions()
        })
        const [updated, setUpdate] = useState(true);
        const handleAddOk = () => {
            console.log('Input',inputState);
            if (inputState.correctOption == "A")
              {
                inputState.correctOption = optionA;
                inputState.wrongOptions.push(optionB);
                inputState.wrongOptions.push(optionC);
                inputState.wrongOptions.push(optionD);
              }
            else if (inputState.correctOption == "B")
            {
              inputState.correctOption = optionB;
              inputState.wrongOptions.push(optionB);
              inputState.wrongOptions.push(optionD);
              inputState.wrongOptions.push(optionA);
            }
            else if (inputState.correctOption == "C")
            {
              inputState.correctOption = optionC;
              inputState.wrongOptions.push(optionA);
              inputState.wrongOptions.push(optionB);
              inputState.wrongOptions.push(optionD);
            }
            else if (inputState.correctOption == "D")
            {
              inputState.correctOption = optionD;
              inputState.wrongOptions.push(optionA);
              inputState.wrongOptions.push(optionB);
              inputState.wrongOptions.push(optionC);
            }
            setInput(inputState);
            //TODO: Update DB question 
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify(inputState);
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch("http://localhost:5000/teacher/question/"+String(inputState.questionID), requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));

            setUpdate(true);
            setAddOpen(false);
          };
        
          const handleAddCancel = () => {
              setAddOpen(false);
          };
            // Edit dialog
        const [EditOpen, setEditOpen] = React.useState(false);
    
        const toggleEditModal = (index) => {
        const allQuestions = questions;
        setInput(questions[index]);
    
        setEditOpen(true);
        };

        const [DeleteOpen, setDeleteOpen] = React.useState(false);
  
    const toggleDeleteModal = (index) => {
      const allQuestions = questions;
      setInput(allQuestions[index]);
  
      setDeleteOpen(true);
    }
  
    const handleDeleteCancel = () => {
      setDeleteOpen(false);
    }
  
    const handleDeleteOk = (index) => {
      axios.delete(`/question/${inputState.QuestionID}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      setDeleteOpen(false);
      setUpdate(true);
    }
    const handleEditOk = () => {
        axios.patch(`/question/${inputState.QuestionID}`, inputState)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        setEditOpen(false);
        setUpdate(true);
      };
    
      const handleEditCancel = () => {
          setEditOpen(false);
      };

      const checkAns = (event) => {
        const isChecked = event.target.checked;
        if(isChecked){
          inputState.correctOption = event.target.name;
        }
      }
    
  
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(5);
    
      const handleChangePage = (e, newPage) => {
        setPage(newPage);
      };
    
    
      const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
      };
      

    const ColorButton = withStyles((theme) => ({
        root: {
            body :{
                color: 'white'
              },
            backgroundColor: '#6f7bd9',
            margin:'auto',
            marginLeft:'60rem'
        }
      }))(Button); 
    const IColourButton = withStyles((theme) => ({
        root: {
            body :{
                color: 'white'
              },
            backgroundColor: '#6f7bd9',
            
          marginLeft:'49rem'
        }
        }))(IconButton);  
    function toggleModal(){
        setIsModalOpen(true);
    }
    function addQuestion(){
        
    }
    console.log("render state:",questions);
    return(
            <div className='questionBank-container'>
            <h1>Question Bank </h1>
            <ColorButton color="primary"  onClick={toggleAddModal}>Add new question</ColorButton>
            {questions.map((ques)=>(
              
            <Card>
                <CardActionArea>
                    <CardMedia title="Question Bank"/>
                    
                    <CardContent><Typography gutterBottom variant="h5" component="h2">{ques.body}</Typography>
                    {/* <Typography>{assignment.date} Due : {assignment.deadline}</Typography> */}
                        <Typography>
                            A: {ques.correctOption}   <br/>
                            B: {ques.wrongOptions[0]} <br/>
                            C: {ques.wrongOptions[1]} <br/>
                            D: {ques.wrongOptions[2]} <br/> 
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <ColorButton size="large" variant="outlined" >
                        <Link href="/QuestionBank" >
                            Edit
                        </Link>
                    </ColorButton>
                    <ColorButton size="large" variant="outlined" >
                        <Link href="/QuestionBank" >
                            Delete
                        </Link>
                    </ColorButton>
                </CardActions>
            </Card>
            ))}
            
            <Dialog open={AddOpen} onClose={handleAddCancel} aria-labelledby="form-dialog-title" maxWidth='xl'>
                          <DialogTitle id="form-dialog-title" color='primary'>Add Question</DialogTitle>
                          <DialogContent>
                          <form  noValidate autoComplete="off">
                            <TextField name = "universeID" type="number" id="standard-basic" label="Universe" required="true" style = {{width: '45%'}} onChange={handleChange}/>
                            <TextField name = "solarID" type="number" id="standard-basic" label="Solar" required="true" style = {{width: '45%'}} onChange={handleChange}/>
                            <TextField name = "planetID" type="number" id="standard-basic" label="Planet" required="true" style = {{width: '45%'}} onChange={handleChange}/>
                            <TextField name = "questionID" type="number" id="standard-basic" label="QuestionID" required="true" style = {{width: '45%'}} onChange={handleChange}/>
                            <TextField name = "body" id="standard-basic" label="Quiz Question" fullWidth="true" required="true" style = {{width: '91%'}} onChange={handleChange}/>
                            <Typography variant="h7" >
                            <br></br> {"     "}Select the Checkbox with the correct option:
                            </Typography>
                            <div  >
                            <Checkbox
                              defaultChecked
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="A"
                              onChange={checkAns}
                            />
                            <TextField id="standard-basic" label="Option 1" required="true" style = {{width: '90%'}} name = "OptionA" onChange={handleChange}/>
                            </div>
                            <div  >
                            <Checkbox
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="B"
                              onChange={checkAns}
                            />
                            <TextField id="standard-basic" label="Option 2" required="true" style = {{width: '90%'}} name = "OptionB" onChange={handleChange}/>
                            </div>
                            <div >
                            <Checkbox
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="C"
                              onChange={checkAns}
                            />
                            <TextField id="standard-basic" label="Option 3" required="true" style = {{width: '90%'}} name = "OptionC" onChange={handleChange}/>
                            </div>
                            <div  >
                            <Checkbox
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="D"
                              onChange={checkAns}
                            />
                            <TextField id="standard-basic" label="Option 4" required="true" style = {{width: '90%'}} name = "OptionD" onChange={handleChange}/>
                            </div>
  
                          </form>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleAddCancel} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={handleAddOk} color="primary">
                              Update Quiz
                            </Button>
                          </DialogActions>
                        </Dialog>
                        
                
            <TablePagination
            rowsPerPageOptions={[3,5,10,25,100]}
            component="div"
            count={questions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}/>
        
</div>
)
            }

export default ViewQuestionbank