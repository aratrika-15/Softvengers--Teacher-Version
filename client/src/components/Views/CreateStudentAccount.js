import {useState} from 'react'

const CreateStudentAccount = () => {
    const [students, setStudents] = useState([
        {
            id:1,
            name: 'Saiteja',
            password: '123456',
            email: 'reddysaiteja5@gmail.com',
            rank:1,
            score:25
        },
        {
            id:2,
            name: 'Kondreddy',
            password: '123456',
            email: 'reddysaiteja5@gmail.com',
            rank:3,
            score:30
        }
    
    ])

    // const id =Math.floor(Math.random()*10000)+1
      
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


      
      
    const onSubmit = (e)=>{
        e.preventDefault()


        if(!name){
            alert('please Enter Student Name')
            return
        }
        else if(!password){
            alert('please Enter Password')
            return
        }
        else if(!email){
            alert('please Enter Email Id ')
            return
        }
        
        else{
            alert('Student Successfully Added')
            
        }
        const onCreation = (student)=>{
            const id =Math.floor(Math.random()*10000)+1
            const newStudent = {id,...student}
            setStudents([...students,newStudent])
          }
        onCreation({name,password,email})

        setName('')
        setPassword('')
        setEmail('')
    }
    return (
        <div className='container'>
            <>{students.map((student)=> (<h3 key={student.id}>{student.name}</h3>))}</>
        <form className = 'add-form' onSubmit ={onSubmit} >
            <div className = 'form-control'>
                <label>Student Name:</label>
                <input type='text' placeholder = 'Enter Student Name' value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Password:</label>
                <input type='text' placeholder = 'Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Email Address:</label>
                <input type='text' placeholder = 'Enter Ntu Email adress' value={email} onChange={(e)=> setEmail(e.target.value)}/> 
            </div>
            <input type = 'submit' value = 'Add Student'
            className ='btn2 btn2-block'/>
        </form>
        </div>
    )
}

export default CreateStudentAccount
