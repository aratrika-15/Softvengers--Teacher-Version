import React from 'react'
import Paper from '@material-ui/core/Paper'
import {useState,useEffect} from 'react'
import {
      Chart,
      BarSeries,
      Title,
      ArgumentAxis,
      ValueAxis,
      Tooltip
    } from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'

import { withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'


import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Particles from 'react-particles-js';


const Assignmentpage = () => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor:'#6f7bd9',
     color: theme.palette.common.black,
      fontSize: 24,
      
    },
    body: {
      fontSize: 20,
      color: theme.palette.common.black,
    },
  }))(TableCell);
  const ColorTableContainer= withStyles((theme) => ({
    body:{
      backgroundColor: '#ffffff',
    }
  }))(TableContainer);  
  const [rows, setrows] = useState([])
    const [details, setdetails] = useState([])
    const columns = [
      { id: 'name', label: 'Student Name', minWidth: 170, type: 'link' },
      { id: 'scores', label: 'Total Score', minWidth: 100 },{ id: 'attemptStatus', label: 'Status', minWidth: 100 }
      ]
    
    
    const [data, setdata] = useState([
        { NumberOFStudents: '50', score: 10.5 },
        { NumberOFStudents: '30', score: 8.5  },
        { NumberOFStudents: '10', score: 20 },
        { NumberOFStudents: '40', score: 12.5 },
        { NumberOFStudents: '45', score: 15.5 },
        { NumberOFStudents: '25', score: 8 },
        { NumberOFStudents: '35', score: 9 }
      ])

      const fetchAssignmentDetails = async (id)=> {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");
        const res = await fetch(`http://localhost:5000/teacher/assignment/123`,{
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        })
        const data = await res.json()
        const temp = data.students;
        console.log(temp);
        return temp
        
      }
      useEffect(()=>{
        const getscores = async()=>{
          const scoresFromServer = await fetchAssignmentDetails()
          setrows(scoresFromServer)
          }
        getscores()
      },[setrows])
      
      
      

      
      

    return (
        <div>
        <Paper className='paper'>
            <Chart data={data} >
            <ArgumentAxis />
            <ValueAxis max={7} />
            
            <BarSeries valueField="score" argumentField="NumberOFStudents"/>
            
            <Title text= "Assignment 1" />
            <Animation />
            </Chart>
        </Paper>
        <div className="score">
        <h5>Max Score : {details.maxScore} Min Score : {details.minScore} </h5>
        <h5>Mean : {details.avgScore}</h5>
        </div>
        <TableContainer className ='table-container'> 
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
                        <TableRow>{columns.map((column)=>{
                          return(<StyledTableCell key = {column.id} align ={column.align} style={{minWidth: column.minWidth}} >{column.label}</StyledTableCell>)})}
                          </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id]; 
                    // const value = column.id === 'attemptStatus' ==  true ? `Attempted ` :row[column.id] ;
                    // const rank1 = value[5] === '1'? `Rank 1 🥇` : value;
                    // const rank2 = value[5] === '2'? `Rank 2 🥈` : rank1;
                    // const rank3 = value[5] === '3'? `Rank 3 🥉` : rank2;
                    return (
                      <StyledTableCell key={column.id} align={column.align}>{value}</StyledTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
                    </TableBody>
                    </Table>
        </TableContainer>
        </div>

            
    )
}

export default Assignmentpage
