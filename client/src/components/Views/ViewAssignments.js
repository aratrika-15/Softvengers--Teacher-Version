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

const ViewAssignments = (props) => {
    const [assignments, setAssignments] = useState([
        {
            id:1,
            name: 'Assignment 1',
            date: 'Date Added : 25 Feb 2021',
            deadline : '28 Feb 2021'
        },
        {
            id:2,
            name: 'Assignment 2',
            date: 'Date Added : 20 Feb 2021',deadline : '25 Feb 2021'
        },
        {
            id:3,
            name: 'Assignment 3',
            date: 'Date Added : 18 Feb 2021',deadline : '23 Feb 2021'
        },
        {
            id:4,
            name: 'Assignment 4',
            date: 'Date Added : 12 Feb 2021',deadline : '17 Feb 2021'
        },
        {
            id:5,
            name: 'Assignment 5',
            date: 'Date Added : 2 Feb 2021'
        },
        {
            id: 6,
            name: 'Assignment 6',
            date: 'Date Added : 25 Jan 2021'
        }

    
    ])
    
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
            <h1>Assignments <IColourButton><AddTwoToneIcon/></IColourButton></h1>
            {assignments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((assignment)=>(
            <Card>
                <CardActionArea>
                    <CardMedia title="Assignment"/>
                    <CardContent><Typography gutterBottom variant="h5" component="h2">Assignment {assignment.id}</Typography>
                    <Typography>{assignment.date} Due : {assignment.deadline}</Typography>
                    <Typography>Timelimit: {assignment.deadline}</Typography>
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
