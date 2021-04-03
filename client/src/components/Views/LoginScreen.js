import React, {Component} from 'react';
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar';
import CreateStudentAccount from './CreateStudentAccount'
import ViewLeaderboard from './ViewLeaderboard'
import ViewAssignment from './ViewAssignment'
import Dashboard from './Dashboard'
import Questionbank from './ViewQuestionbank'
import Assignmentpage  from './Assignmentpage'
import { BrowserRouter,Route, Switch} from 'react-router-dom'
import Routes from '../../Routes';
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'


// async function verify({Email, Password}){
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify({"emailID":Email,"password":Password});

//     var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow',
//     };
    
//     return fetch("http://localhost:5000/teacher/login", requestOptions)
//         .then(response => (response.text(),console.log(response.text())))
//         // .then(result => setToken(result))
//         // .then(data => data.json())
//         .catch(error => console.log('error', error));
// }
const LoginScreen = ({setToken}) => {
    const [Email, setEmail] = useState('');
    const [Password,setPassword] = useState('');
    //const [token, setToken] = useState('')

    // function settoken(userToken){
    //     sessionStorage.setItem('token', JSON.stringify(userToken));
    // }
    
    // const onSubmit = async (e)=>{
    //   e.preventDefault()
    //   if(!Email){
    //       alert('Please Enter Email')
    //       return
    //   }
    //   else if(!Password){
    //       alert('Please Enter Password')
    //       return
    //   }
    //   verify(Email,Password);  
    // }


    


//      if (token ==''|| token == 'Username does not exist' || token == 'Password is incorrect for the user')
//     return (
//       <div className='container'>
//       <form className = 'add-form' onSubmit ={onSubmit}>
//           <div className = 'form-control'>
//               <label>Email:</label>
//               <input type='text' placeholder = 'Enter Teacher Email' value={Email} onChange={(e)=> setEmail(e.target.value)}/>
//           </div>
//           <div className = 'form-control'>
//               <label>Password:</label>
//               <input type='text' placeholder = 'Enter Password' value={Password} onChange={(e)=> setPassword(e.target.value)}/>
//           </div>
//           <input type = 'submit' value = 'Login'
//           className ='btn2 btn2-block'>
              
//           </input>
//       </form>
//       </div>
//   )
//   else
//   {
//     console.log('token=',token);
//     settoken(token);
//     return(
//         <div>
//             <BrowserRouter>
//                 <Switch>
//                 <Route exact path="/home" component={Routes} />
//             <Redirect to = "/home" />
//                 </Switch>
//             </BrowserRouter>
            
//         </div>
        
//     )

// }
async function verify(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"emailID":Email,"password":Password});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    };
    
    return fetch("http://localhost:5000/teacher/login", requestOptions)
        .then(response => response.text())
        // .then(result => setToken(result))
        // .then(data => data.json())
        .catch(error => console.log('error', error));
}

const handleSubmit = async e => {
    e.preventDefault();
    const token = await verify();
    console.log(token);
    setToken(token);
    window.location.reload();
    
  }

    return(
        <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
            <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
            <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )


  }

    
  
  export default LoginScreen;

  LoginScreen.propTypes ={
      setToken: PropTypes.func.isRequired
  }