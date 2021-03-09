import {useState} from 'react'
const CreateStudentAccount = ({onCreation}) => {
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
        else{
            alert('please Enter EmailId ')
        }
        

        onCreation({name,password,email})

        setName('')
        setPassword('')
        setEmail('')
    }
    return (
        <div className='container'>
        <form className = 'add-form' onSubmit ={onSubmit}>
            <div className = 'form-control'>
                <label>Student Name:</label>
                <input type='text' placeholder = 'Enter Student Name' value={name} onChange={(e)=> setName(e.target.value)} />
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
