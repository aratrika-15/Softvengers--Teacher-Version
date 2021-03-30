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

const ViewAssignments = () => {
    const [assignments, setAssignments] = useState([])

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };      
    return (
        <div className='assignment-container'>
            <h1>Assignments <IColourButton><Link href="/CreateAssignment"><AddTwoToneIcon/></Link></IColourButton></h1>
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
