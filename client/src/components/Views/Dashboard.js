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
const [bar1, setbar1] = useState([])
const [bar2, setbar2] = useState([])
    const Form2 = async (e)=>{
      e.preventDefault()
      const getgrpstats = async()=>{
    const studentsFromServer = await fetchAssignmentDetails(`http://localhost:5000/teacher/statistics/group/SCE5`)
    setgrps(studentsFromServer)
    setdetails(studentsFromServer.attemptedDifficulties)
    setbar1(studentsFromServer.scoresAchieved.universeTotal)
    setbar2(studentsFromServer.percentageCompletion)
    setline(studentsFromServer.scoreHistory)
  }
  getgrpstats()
      
      setemail('')
  }
  
  const onSubmit =  (e)=>{
      e.preventDefault()
      const getindstats = async()=>{
    const studentsFromServer = await fetchAssignmentDetails(`http://localhost:5000/teacher/statistics/${email}`)
    setinv(studentsFromServer)
    setdetails(studentsFromServer.attemptedDifficulties)
    setbar1(studentsFromServer.scoresAchieved.universeTotal)
    setbar2(studentsFromServer.percentageCompletion.barGraph)
    setline(studentsFromServer.scoreHistory)
  }
  getindstats()
      
      setemail('')
  }
  console.log(indv)
  console.log(grps)
 
  const Form = () => {
    setShowForm(!showForm)
  }
  const [details, setdetails] = useState([
    { id: 'avgEasyCorrect', title: 'Easy',value: 1,color: '#ff9800'},
    { id: 'avgHardCorrect', title: 'Hard', value: 55,color: '#4caf50'},
    { id: 'avgMediumCorrect', title: 'Medium',value: 40,color: '#00acc1' }
    ])
    const [line, setline] = useState([
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
    ])
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title:{
      text: "Scores earned in last 14 days"
    },
    axisY: {
      title: "Score",
    },
    axisX: {
      title: "Day",
      prefix: "D",
      interval: 1
    },
    data: [{
      type: "line",
      toolTipContent: "Week {x}: {y}",
      dataPoints: line
    }]
  }
console.log(bar2);
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
     <div className="bar1">
        <Chart
          data={bar1}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="totalScore"
            argumentField="identifier"
          />
          <Title text="Scores Achieved in each Universe" />
          <Animation />
        </Chart>
        </div>
        <div className='bar2'>
        <Chart
          data={bar2}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="percentage"
            argumentField="universe"
          />
          <Title text="Percentage Completed in each Universe" />
          <Animation />
        </Chart>
      </div>
      <div className='pie'>
        <PieChart 
            radius={PieChart.defaultProps.radius-10}
              viewBoxSize={[100,100]}
              data={details}
              segmentsShift={(index) => (index === 0 ? 1 : 0.5)}
              label={({ dataEntry }) => "Avg "+dataEntry.title +":  "+dataEntry.value}
              labelStyle={{
                fontSize: '3px',
                labelPosition: 30
              }}
            />
          
          </div>
            <div className='line'>
              <CanvasJSChart options = {options}/>
              </div>
    </div>
  )
}

export default Dashboard
