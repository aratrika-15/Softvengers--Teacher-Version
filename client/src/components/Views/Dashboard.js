// import React from "react";
// import { __DATA__ } from "../barchart/data";
// import {
//   MainContainer,
//   Container,
//   BarChartContainer,
//   Number,
//   BlackLine,
//   MakeBar
// } from "../barchart/styles";

// export default function Dashboard(props) {
//   return (
//     <Container>
//       <MainContainer>
//         {__DATA__.map(({ NumOfStd, colors }, i) => {
//           return (
//             <BarChartContainer key={i}>
//               <Number color={colors[1]}>{NumOfStd} students</Number>
//               <MakeBar height={NumOfStd * 2} colors={colors} />
//             </BarChartContainer>
//           );
//         })}
//       </MainContainer>
//       <BlackLine />
//     </Container>
//   );
// }

import React from 'react'
import {useState,useEffect} from 'react'


const Dashboard = () => {
  const [details, setdetails] = useState([])
const fetchAssignmentDetails = async (id)=> {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");
  const res = await fetch(`http://localhost:5000/teacher/statistics/group/SCE5`,{
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  })
  const data = await res.text()
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
console.log(details);
  return (
    <div>
      
    </div>
  )
}

export default Dashboard
