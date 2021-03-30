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


const Assignmentpage = () => {
    const [details, setdetails] = useState([])
    
    
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
        console.log(data);
        return data
        
      }
      useEffect(()=>{
        const getscores = async()=>{
          const scoresFromServer = await fetchAssignmentDetails()
          
          setdetails(scoresFromServer)
    
        }
        getscores()
      },[setdetails])
      console.log(details.students);

      
      

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
        <h5>Max Score : 20 Min Score : 8 </h5>
        <h5>Median : 15  Mean : 10</h5>
        </div>
        
        </div>

            
    )
}

export default Assignmentpage
