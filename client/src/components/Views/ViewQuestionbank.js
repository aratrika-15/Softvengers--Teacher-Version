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
import Link from '@material-ui/core/Link'

import Rough from './Rough'
import NewQuestion from './NewQuestion'

const ViewQuestionbank = (props) => {
    return(
<div>
        <NewQuestion/>
    </div>
    )
    
}


//     const ViewQuestionbank = (props) => {
//         const [questions, setQuestions] = useState([]);
//         const [loading, setLoading] = useState(true);
//         const [isModalOpen, setIsModalOpen] = useState(false);
//         const fetchQuestions = async () => {
//                 var myHeaders = new Headers();
//                 myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");
//                 fetch('http://localhost:5000/teacher/question',{headers: myHeaders})
//                 .then(response => response.json())
//                 .then(data => setQuestions(data))
//                 .then(setLoading(false));
                
//         }
//         useEffect(()=>{
//             fetchQuestions()
//         })

//         const [page, setPage] = useState(0);
//         const [rowsPerPage, setRowsPerPage] = useState(5);
    
//       const handleChangePage = (e, newPage) => {
//         setPage(newPage);
//       };
    
//       const handleChangeRowsPerPage = (e) => {
//         setRowsPerPage(+e.target.value);
//         setPage(0);
//       };
      

//     const ColorButton = withStyles((theme) => ({
//         root: {
//             body :{
//                 color: 'white'
//               },
//             backgroundColor: '#6f7bd9',
//             margin:'auto',
//             marginRight:'2rem'
//         }
//       }))(Button); 
//     const IColourButton = withStyles((theme) => ({
//         root: {
//             body :{
//                 color: 'white'
//               },
//             backgroundColor: '#6f7bd9',
            
//           marginLeft:'49rem'
//         }
//         }))(IconButton);  
//     function toggleModal(){
//         setIsModalOpen(true);
//     }
//     function addQuestion(){
        
//     }
//     console.log("render state:",questions);
//     return(
//             <div className='questionBank-container'>
//             <h1>Question Bank 
//                 <IColourButton >
//                     <AddTwoToneIcon/>

//                 </IColourButton>
//             </h1>
//             {questions.map((ques)=>(
//             <Card>
//                 <CardActionArea>
//                     <CardMedia title="Question Bank"/>
//                     <CardContent><Typography gutterBottom variant="h5" component="h2">{ques.body}</Typography>
//                     {/* <Typography>{assignment.date} Due : {assignment.deadline}</Typography> */}
//                         <Typography>
//                             A: {ques.correctOption}   <br/>
//                             B: {ques.wrongOptions[0]} <br/>
//                             C: {ques.wrongOptions[1]} <br/>
//                             D: {ques.wrongOptions[2]} <br/> 
//                         </Typography>
//                     </CardContent>
//                 </CardActionArea>
//                 <CardActions>
//                     <ColorButton size="large" variant="outlined" >
//                         <Link href="/QuestionBank" >
//                             Edit
//                         </Link>
//                     </ColorButton>
//                     <ColorButton size="large" variant="outlined" >
//                         <Link href="/QuestionBank" >
//                             Delete
//                         </Link>
//                     </ColorButton>
//                 </CardActions>
//             </Card>
//             ))}
//             <TablePagination
//             rowsPerPageOptions={[3,5,10,25,100]}
//             component="div"
//             count={questions.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onChangePage={handleChangePage}
//             onChangeRowsPerPage={handleChangeRowsPerPage}
// />
        
// </div>
// )    

  

export default ViewQuestionbank