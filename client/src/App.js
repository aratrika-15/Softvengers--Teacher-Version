import React from 'react'
// import Navbar from './components/Navbar/Navbar'
import './App.css'
import Routes from './Routes'
import Particles from 'react-particles-js';
import { Component } from 'react';
import LoginScreen from './components/Views/LoginScreen';
import useToken from './variables/useToken'
import Background from './components/assets/imgs/3.jpg'



const App = () => {
  
  const { token, setToken } = useToken();

  if (!token || token === 'undefined' ||token ===''|| token === 'Username does not exist' || token === 'Password is incorrect for the user'){
    return <LoginScreen setToken={setToken} />
  }
  console.log(token)
  return(
    <div style={{ backgroundImage: `url(${Background})` }}>
      <Routes/>
    </div>
  );


  
}



export default App;