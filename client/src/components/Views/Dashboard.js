import {useState,useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
//import CustomPieChart from "../CustomPieChart";
import { PieChart } from 'react-minimal-pie-chart';
import {CanvasJSChart} from 'canvasjs-react-charts'

import { Animation } from '@devexpress/dx-react-chart';
const Dashboard = () => {
  const data = [
    { year: '1950', population: 2.525 },
    { year: '1960', population: 3.018 },
    { year: '1970', population: 3.682 },
    { year: '1980', population: 4.440 },
    { year: '1990', population: 5.310 },
    { year: '2000', population: 6.127 },
    { year: '2010', population: 6.930 },
  ];
  const [showForm, setShowForm] = useState(false);
  const [indv, setinv] = useState([])
  const [grps, setgrps] = useState([])
  const [email, setemail] = useState('')
  const fetchAssignmentDetails = async (url)=> {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");
      const res = await fetch(url,{
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      })
      const data = await res.json()
      return data
    }

    const Form2 = async (e)=>{
      e.preventDefault()
      const getgrpstats = async()=>{
    const studentsFromServer = await fetchAssignmentDetails(`http://localhost:5000/teacher/statistics/group/SCE5`)
    setgrps(studentsFromServer)
  }
  getgrpstats()
      
      setemail('')
  }
  
  const onSubmit =  (e)=>{
      e.preventDefault()
      const getindstats = async()=>{
    const studentsFromServer = await fetchAssignmentDetails(`http://localhost:5000/teacher/statistics/${email}`)
    setinv(studentsFromServer)
  }
  getindstats()
      
      setemail('')
  }
  console.log(indv)
  console.log(grps)
  
 
  const Form = () => {
    setShowForm(!showForm)
  }
  const propsData = [
    //TODO: Hardcoded values for now, extract from DB
    { title: 'Planning and Defining', value: 80, color: '#ff9800'},
    { title: 'Design', value: 25, color: '#f44336'},
    { title: 'Implementation', value: 40, color: '#4caf50'},
    { title: 'Testing and Maintainance', value: 60, color: '#00acc1'},
  ]
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title:{
      text: "Bounce Rate by Week of Year"
    },
    axisY: {
      title: "Bounce Rate",
      suffix: "%"
    },
    axisX: {
      title: "Week of Year",
      prefix: "W",
      interval: 2
    },
    data: [{
      type: "line",
      toolTipContent: "Week {x}: {y}%",
      dataPoints: [
        { x: 1, y: 64 },
        { x: 2, y: 61 },
        { x: 3, y: 64 },
        { x: 4, y: 62 },
        { x: 5, y: 64 },
        { x: 6, y: 60 },
        { x: 7, y: 58 },
        { x: 8, y: 59 },
        { x: 9, y: 53 },
        { x: 10, y: 54 },
        { x: 11, y: 61 },
        { x: 12, y: 60 },
        { x: 13, y: 55 },
        { x: 14, y: 60 },
        { x: 15, y: 56 },
        { x: 16, y: 60 },
        { x: 17, y: 59.5 },
        { x: 18, y: 63 },
        { x: 19, y: 58 },
        { x: 20, y: 54 },
        { x: 21, y: 59 },
        { x: 22, y: 64 },
        { x: 23, y: 59 }
      ]
    }]
  }

  return (
    <div>
    <div className = 'button' >
      <input  type = 'submit' value = 'Group'className ='btn2 btn2-block' onClick={Form2}/>
      <input type = 'submit' value = 'Individual' className ='btn2 btn2-block' onClick={Form}/>
      
      {showForm && (
        
        <form className = 'form' onSubmit={onSubmit}>
          <label>Email Address:</label>
                <input type='text' placeholder = 'Enter Ntu Email address' value={email}required onChange={(e)=> setemail(e.target.value)}/>         
                <input type = 'submit' value = 'enter' className ='btn2 btn2-block' />
                
        </form>
        
          
      )}
     </div>
     <div >
     <div>
     <Paper className = 'paper'>
        <Chart
          data={data}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Title text="World population" />
          <Animation />
        </Chart>
      </Paper>
      </div>
      <div>
      <Paper className = 'paper'>
        <Chart
          data={data}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Title text="World population" />
          <Animation />
        </Chart>
      </Paper>
      </div>
      <div>
      <Paper className = 'paper'>
        <PieChart 
            radius={PieChart.defaultProps.radius-10}
              viewBoxSize={[100,100]}
              data={propsData}
              segmentsShift={(index) => (index === 0 ? 1 : 0.5)}
              label={({ dataEntry }) => dataEntry.title }
              labelStyle={{
                fontSize: '3px',
                labelPosition: 30
              }}
            />
      </Paper>
      <Paper className = 'paper'>
      <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
      </Paper>
      </div>
            </div>
    </div>
  )
}

export default Dashboard
