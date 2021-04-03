import React from 'react'
// import Navbar from './components/Navbar/Navbar'
import './App.css'


import Routes from './Routes'
import Particles from 'react-particles-js';
import { Component } from 'react';
import LoginScreen from './components/Views/LoginScreen';
import useToken from './variables/useToken'

const App = () => {

  const { token, setToken } = useToken();

  if (!token || token === 'undefined' ||token ===''|| token === 'Username does not exist' || token === 'Password is incorrect for the user'){
    return <LoginScreen setToken={setToken}></LoginScreen>
  }
  console.log(token);
  return(
    <div className="wrapper">
      <Routes/>
    </div>
  );


  
}



export default App;