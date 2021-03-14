import React from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import {useState} from 'react'
import CreateStudentAccount from './components/Views/CreateStudentAccount'
import ViewLeaderboard from './components/Views/ViewLeaderboard'
import ViewAssignments from './components/Views/ViewAssignments'
import Students from './components/Views/Students'


function App() {
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
  const onCreation = (student)=>{
    const id =Math.floor(Math.random()*10000)+1
    const newStudent = {id,...student}
    setStudents([...students,newStudent])
  }
  
  return (
    <div className="App">
      <Navbar />
      <CreateStudentAccount onCreation = {onCreation}/>
      <ViewLeaderboard/>
      <ViewAssignments/>
    </div>
  );
}

export default App;