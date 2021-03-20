// import * as React from 'react';
// import Paper from '@material-ui/core/Paper';
// import {
//   Chart,
//   BarSeries,
//   Title,
//   ArgumentAxis,
//   ValueAxis,
// } from '@devexpress/dx-react-chart-material-ui';

// import { Animation } from '@devexpress/dx-react-chart';

// const data = [
//   { NumberOFStudents: '50', score: 10.5 },
//   { NumberOFStudents: '30', score: 8.5  },
//   { NumberOFStudents: '10', score: 20 },
//   { NumberOFStudents: '40', score: 12.5 },
//   { NumberOFStudents: '45', score: 15.5 },
//   { NumberOFStudents: '25', score: 8 },
//   { NumberOFStudents: '35', score: 9 },
// ];

// export default class Demo extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data,
//     };
//   }

//   render() {
//     const { data: chartData } = this.state;

//     return (
//       <Paper>
//         <Chart
//           data={chartData}
//         >
//           <ArgumentAxis />
//           <ValueAxis max={7} />

//           <BarSeries
//             valueField="score"
//             argumentField="NumberOFStudents"
//           />
//           <Title text="Assignment 1" />
//           <Animation />
//         </Chart>
//       </Paper>
//     );
//   }
// }

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
    const [data, setdata] = useState([
        { NumberOFStudents: '50', score: 10.5 },
        { NumberOFStudents: '30', score: 8.5  },
        { NumberOFStudents: '10', score: 20 },
        { NumberOFStudents: '40', score: 12.5 },
        { NumberOFStudents: '45', score: 15.5 },
        { NumberOFStudents: '25', score: 8 },
        { NumberOFStudents: '35', score: 9 }
      ])

    
    
    //   useEffect(() => {
    //     const maxscore = [...data].sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    //     setdata(maxscore);
    //     }, [setdata]);

        // const maxScore =()=>{
        //     const m1 = [...data].sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        //     return(m1)
        // }
        // console.log(maxScore)
       
        
    return (
        <div>
        <Paper className='paper'>
            <Chart data={data} >
            <ArgumentAxis />
            <ValueAxis max={7} />
            <BarSeries valueField="score" argumentField="NumberOFStudents"/>
            <Title text="Assignment 1" />
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
