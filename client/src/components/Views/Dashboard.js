import {useState,useEffect} from 'react'
const Dashboard = () => {
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

  return (
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
  )
}

export default Dashboard
