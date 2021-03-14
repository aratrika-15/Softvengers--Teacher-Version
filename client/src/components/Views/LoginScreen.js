import React, {Component} from 'react';
import {useState} from 'react'

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const onSubmit = (e)=>{
      e.preventDefault()
      if(!Email){
          alert('please Enter Student Name')
          return
      }
      else if(!Password){
          alert('please Enter Password')
          return
      }
        setEmail('')
        setPassword('')
    }
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
  }
  export default Login;