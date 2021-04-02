import React from 'react'
// import Navbar from './components/Navbar/Navbar'
import './App.css'
import {useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import CreateStudentAccount from './components/Views/CreateStudentAccount'
import ViewLeaderboard from './components/Views/ViewLeaderboard'
import Login from './components/Views/LoginScreen'
import ViewAssignment from './components/Views/OldViewAssignments'
import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom';
import Routes from './Routes'
import Particles from 'react-particles-js';
import { Component } from 'react';


class App extends Component{
//   const [students, setStudents] = useState([
//     {
//         id:1,
//         name: 'Saiteja',
//         password: '123456',
//         email: 'reddysaiteja5@gmail.com',
//         rank:1,
//         score:25
//     },
//     {
//         id:2,
//         name: 'Kondreddy',
//         password: '123456',
//         email: 'reddysaiteja5@gmail.com',
//         rank:3,
//         score:30
//     }

// ])
// // const id =Math.floor(Math.random()*10000)+1
//   const onCreation = (student)=>{
//     const id =Math.floor(Math.random()*10000)+1
//     const newStudent = {id,...student}
//     setStudents([...students,newStudent])
//   }
 render(){ 
  return (
    
    <div className="App">
      
      <Routes/>
    </div>
  );
}
}

export default App;