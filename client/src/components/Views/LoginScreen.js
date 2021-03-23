import React, {Component} from 'react';
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar';

const LoginScreen = () => {
    const [Email, setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const [token, setToken] = useState('');

    const onSubmit = (e)=>{
      e.preventDefault()
      if(!Email){
          alert('Please Enter Email')
          return
      }
      else if(!Password){
          alert('Please Enter Password')
          return
      }
        setEmail('')
        setPassword('')
    }


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({"emailID":Email,"password":Password});
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        };
        
        fetch("http://localhost:5000/teacher/login", requestOptions)
            .then(response => response.text())
            .then(result => setToken(result))
            .then(data => console.log(data))
            .catch(error => console.log('error', error));
    })
    if (token ==''|| token == 'Username does not exist' || token == 'Password is incorrect for the user')
    return (
      <div className='container'>
      <form className = 'add-form' onSubmit ={onSubmit}>
          <div className = 'form-control'>
              <label>Email:</label>
              <input type='text' placeholder = 'Enter Teacher Email' value={Email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className = 'form-control'>
              <label>Password:</label>
              <input type='text' placeholder = 'Enter Password' value={Password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <input type = 'submit' value = 'Login'
          className ='btn2 btn2-block'/>
      </form>
      </div>
  )
  else
  {
    console.log('token=',token);
    return(
        <div> 
            <Navbar/>
        </div>
    )

  }

  }
  export default LoginScreen;