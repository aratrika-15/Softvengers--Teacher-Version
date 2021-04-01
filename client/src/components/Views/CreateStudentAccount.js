import {useState} from 'react'


const CreateStudentAccount = ({rows}) => {
    const [students, setStudents] = useState([
        {
            id:1,
            firstName: 'Saiteja',
            lastName:'reddy',
            password: '123456',
            email: 'reddysaiteja5@gmail.com',
            rank:1,
            score:25
        },
        {
            id:2,
            firstName: 'Kondreddy',
            lastName:'reddy',
            password: '123456',
            email: 'reddysaiteja5@gmail.com',
            rank:3,
            score:30
        }
    
    ])

      
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [matricNo, setmatricnum] = useState('')
    const [password, setPassword] = useState('')
    const [emailID, setEmail] = useState('')
    const [tutGrp, setTutGrp] = useState('')


      
    // validationSchema={Yup.object().shape({
    //     username: Yup.string().required('Username is required'),
    //     password: Yup.string().required('Password is required')
    // })}
    const onCreation = async (student)=>{
        var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNVMDAxQGUubnR1LmVkdS5zZyIsImlkIjoiNjA1MzE2Njk5ZDRhNjI0MmYwZDk5M2RmIiwidHV0R3AiOiJTQ0U0IiwiaWF0IjoxNjE2MDU4MTg2fQ.7LFzy-ecqB89ZNydkPR0LhuM33SV3ciaPJmO_g9oQnc");
  myHeaders.append('Content-Type', 'application/json');
  const res = await fetch('http://localhost:5000/teacher/createstudent'
            ,{
              method:'POST',
              headers: myHeaders,
              body:JSON.stringify(student)
            }
            )
            const data = await res.json()
            console.log(data);
            //setTasks([...tasks,data])
        //const id =Math.floor(Math.random()*10000)+1
        //const newStudent = {id,...student}
        //setStudents([...rows,data])
      }
    const onSubmit = (e)=>{
        e.preventDefault()
        


        if(!firstName){
            alert('please Enter Firstname')
            return
        }
        else if(!lastName){
            alert('please Enter Lastname')
            return
        }
        else if(!password){
            alert('please Enter Password')
            return
        }
        else if(!emailID){
            alert('please Enter Email Id ')
            return
        }
        else if(!tutGrp){
            alert('please Enter Tutorial Group')
            return
        }
        
        else{
            alert('Student Successfully Added')
            
        }
        
        
        onCreation({firstName,lastName,matricNo,password,emailID,tutGrp})

        setFirstName('')
        setLastName('')
        setmatricnum('')
        setPassword('')
        setEmail('')
        setTutGrp('')
    }
    console.log(students.firstName);
    
    return (
        <div className='container'>
        <form className = 'add-form' onSubmit ={onSubmit} >
            <div className = 'form-control'>
                <label>First Name:</label>
                <input type='text' placeholder = 'Enter First Name' value={firstName} required onChange={(e)=> setFirstName(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Last Name:</label>
                <input type='text' placeholder = 'Enter Last Name' value={lastName} required onChange={(e)=> setLastName(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Matric Number:</label>
                <input type='text' placeholder = 'Enter Matric Number' value={matricNo} required onChange={(e)=> setmatricnum(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Password:</label>
                <input type='text' placeholder = 'Enter Matric Number' value={password} required onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <div className = 'form-control'>
                <label>Email Address:</label>
                <input type='text' placeholder = 'Enter Ntu Email address' value={emailID}required onChange={(e)=> setEmail(e.target.value)}/> 
            </div>
            <div className = 'form-control'>
                <label>Tutorial Group :</label>
                <input type='text' placeholder = 'Enter Tutorial Group' value={tutGrp} onChange={(e)=> setTutGrp(e.target.value)}/> 
            </div>
            <input type = 'submit' value = 'Add Student'
            className ='btn2 btn2-block'/>
        </form>
        </div>
    )
}

export default CreateStudentAccount
