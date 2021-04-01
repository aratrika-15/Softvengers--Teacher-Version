import React from 'react'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider  } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {useState,useEffect} from 'react'
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone'
import IconButton from '@material-ui/core/IconButton'
import TablePagination from '@material-ui/core/TablePagination'
import Assignmentpage from '../Views/Assignmentpage'
import Link from '@material-ui/core/Link'
import Rough from './Rough'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';

const ViewAssignments = () => {
    const [assignments, setAssignments] = useState([])
    const [AddOpen, setAddOpen] = React.useState(false);
    const [fullDataQuestions, setFullData] = React.useState({});
    const [inputState, setInput] = React.useState({});
    const [optionA,setA] = useState('');
    const [optionB,setB] = useState('');
    const [optionC,setC] = useState('');
    const [optionD,setD] = useState('');
    const [updated, setUpdate] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [oading, setLoading] = useState(false);
    const [question,setQuestion] = useState({});
    // const [correct,setCorrect] = useState('');
    const [currentQID, setCurrentQID]=useState(-1);
    const getOptionFromIndex = (val) => {
      switch (val) {
        case "0": return optionA;
        case "1": return optionB;
        case "2": return optionC;
        case "3": return optionD;
      }
      return "";
    }
    const handleChangeQuestion = (event) => {
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
              {question[event.target.name] = event.target.value;}
            else
              {question[event.target.name] = Number(event.target.value);}
            break;
        }
        
        setQuestion(question);
        inputState.push(question);

      };
  
    function addQuestion(){
      return(
        <form  noValidate autoComplete="off">
        
        <TextField name = "questionID" type="number" id="standard-basic" label="QuestionID" required="true" style = {{width: '45%'}} onChange={handleChange}/>
        <TextField name = "body" id="standard-basic" label="Assignment Question" fullWidth="true" required="true" style = {{width: '91%'}} onChange={handleChange}/>
        <Typography variant="h7" >
        <br></br> {"     "}Select the Checkbox with the correct option:
        </Typography>
        <div  >
        <Checkbox
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          name="0"
          onChange={checkAns}
        />
        <TextField id="standard-basic" label="Option 1" required="true" style = {{width: '90%'}} name = "OptionA" onChange={handleChange}/>
        </div>
        <div  >
        <Checkbox
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          name="1"
          onChange={checkAns}
        />
        <TextField id="standard-basic" label="Option 2" required="true" style = {{width: '90%'}} name = "OptionB" onChange={handleChange}/>
        </div>
        <div >
        <Checkbox
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          name="2"
          onChange={checkAns}
        />
        <TextField id="standard-basic" label="Option 3" required="true" style = {{width: '90%'}} name = "OptionC" onChange={handleChange}/>
        </div>
        <div  >
        <Checkbox
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          name="3"
          onChange={checkAns}
        />
        <TextField id="standard-basic" label="Option 4" required="true" style = {{width: '90%'}} name = "OptionD" onChange={handleChange}/>
        </div>

      </form>
      )
    }

    const fetchAssignments = async ()=> {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");
      const res = await fetch('http://localhost:5000/teacher/assignment/list/SCE5',{
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      })
      const data = await res.json()
      console.log(data);
      return data
    }
    useEffect(()=>{
      const getAssignments = async()=>{
        const assignementsFromServer = await fetchAssignments()
        
        setAssignments(assignementsFromServer)
  
      }
      getAssignments()
    },[setAssignments])
    const ColorButton = withStyles((theme) => ({
        root: {
            body :{
                color: 'white'
              },
            backgroundColor: '#6f7bd9',
            margin:'auto',
          marginRight:'2rem'
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


  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  }; 

  const toggleAddModal = () => {
    const newObj = [
      {
        assignmentName:"",
        timeLimit:1,
        questionIDs:[],
        deadline:"",
        tutGrp:""
      }
    ]
    const newQues = {
      questionID: 1,
      body:"",
      correctOption: "0",
      wrongOptions:["1", "2", "3"],
      points:1
    }
      
    setAddOpen(true);
    setInput(newObj);
    setQuestion(newQues);
    
  };

  const checkAns = (event) => {
    const isChecked = event.target.checked;
    console.log(isChecked)
    if(isChecked){
      setQuestion({...question, 
        correctOption: getOptionFromIndex(event.target.name), 
        wrongOptions: ["0", "1", "2", "3"].filter(val => {
          return val !== event.target.name;
        }).map(getOptionFromIndex)
      });
      // setCorrect(event.target.name);
    }
    else {
      setQuestion({...question, 
        correctOption: "", 
        wrongOptions: ["0", "1", "2", "3"].map(getOptionFromIndex)
      });
    }
    
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

  const handleAddOk = () => {
    console.log('Input',inputState);
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
    
    fetch("http://localhost:5000/teacher/assignment/"+String(inputState.assignmentID), requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setUpdate(true);
    setAddOpen(false);
  };

  const handleAddCancel = () => {
      setAddOpen(false);
  };
    return (
        <div className='assignment-container'>
            <h1>Assignments <IColourButton><AddTwoToneIcon onClick={toggleAddModal}/> </IColourButton></h1>
            {assignments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((assignment)=>(
            <Card>
                <CardActionArea>
                    <CardMedia title="Assignment"/>
                    <CardContent><Typography gutterBottom variant="h5" component="h2">Assignment {assignment.assignmentID}</Typography>
                    <Typography>{assignment.assignmentName}</Typography>
                    <Typography>Due : {assignment.deadline}</Typography>
                    <Typography>Timelimit: {assignment.timeLimit}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                  <ColorButton size="large" variant="outlined" ><Link href="/Assignmentpage" >
                  Statistics
  </Link></ColorButton></CardActions>
            </Card>))}
            {/* <Button color="primary" round >Add new assignment</Button> */}
            <Dialog open={AddOpen} onClose={handleAddCancel} aria-labelledby="form-dialog-title" maxWidth='xl'>
                <DialogTitle id="form-dialog-title" color='primary'>Add Question</DialogTitle>
                    <DialogContent>
                    <form  noValidate autoComplete="off">
                          
                            <TextField name = "assignmentID" type="number" id="standard-basic" label="Assignment ID" required="true" style = {{width: '45%'}} onChange={handleChange}/>
                            <TextField name = "assignmentName" id="standard-basic" label="Assignment Name" required="true" style = {{width: '45%'}} onChange={handleChange}/>
                            <TextField name = "timeLimit" type="number" id="standard-basic" label="Time limit" required="true" style = {{width: '45%'}} onChange={handleChange}/>
                            <TextField name = "deadline" type="date" id="standard-basic" label="Deadline" fullWidth="true" required="true" style = {{width: '91%'}} onChange={handleChange}/>
                            <TextField name = "tutGrp"  id="standard-basic" label="Tutorial Group" fullWidth="true" required="true" style = {{width: '91%'}} onChange={handleChange}/>
                            <TextField name = "questionIDs"  id="standard-basic" label="Question Ids" fullWidth="true" required="true" style = {{width: '91%'}} onChange={handleChange}/>
                            <Typography variant="h7" >
                            <br></br> {"     "}Select the Checkbox with the correct option:
                            </Typography>
                            <div  >
                            <Checkbox
                              defaultChecked
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="0"
                              onChange={checkAns}
                            />
                            <TextField id="standard-basic" label="Option 1" required="true" style = {{width: '90%'}} name = "OptionA" onChange={handleChange}/>
                            </div>
                            <div  >
                            <Checkbox
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="1"
                              onChange={checkAns}
                            />
                            <TextField id="standard-basic" label="Option 2" required="true" style = {{width: '90%'}} name = "OptionB" onChange={handleChange}/>
                            </div>
                            <div >
                            <Checkbox
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="2"
                              onChange={checkAns}
                            />
                            <TextField id="standard-basic" label="Option 3" required="true" style = {{width: '90%'}} name = "OptionC" onChange={handleChange}/>
                            </div>
                            <div  >
                            <Checkbox
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              name="3"
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
                              Add Assignment
                            </Button>
                        </DialogActions>
            </Dialog>

            <TablePagination
        rowsPerPageOptions={[3,5,10,25,100]}
        component="div"
        count={assignments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </div>
    )
}

export default ViewAssignments
