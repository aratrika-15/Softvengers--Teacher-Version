import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import CreateStudentAccount from './components/Views/CreateStudentAccount'
import ViewLeaderboard from './components/Views/ViewLeaderboard'
import ViewAssignment from './components/Views/OldViewAssignments'
import Dashboard from './components/Views/Dashboard'
import Questionbank from './components/Views/ViewQuestionbank'
import CreateAssignment  from './components/Views/CreateAssignment'
import Assignmentpage  from './components/Views/Assignmentpage'

import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Views/LoginScreen';
import LoginScreen from './components/Views/LoginScreen';
import Particles from 'react-particles-js';
import ViewAssignment from './components/Views/ViewAssignment';

const Routes = (props) => {
    


    return (
        
        <BrowserRouter>
        <div>
            
            <Navbar token = {props.token}/>
            
            {/* <Particles className="particles" 
    params={{
	    "particles": {
	        "number": {
	            "value": 50
	        },
	        "size": {
	            "value": 3
	        },"color": {
                "value": "#0000ff"
              }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
	    }
	}} /> */}
            
            
            <Switch>
                <Route exact path="/Statistics" component={Dashboard} token = {props.token}/>
                <Route exact path="/Assignments" component={ViewAssignment} token = {props.token}/>
                <Route path="/Assignmentpage" component={Assignmentpage} token = {props.token}/>
                <Route exact path="/QuestionBank" component={Questionbank} token = {props.token} />
                <Route exact path="/Leaderboard" component={ViewLeaderboard} token = {props.token}/>
                <Route exact path="/CreateStudentAccount" component={CreateStudentAccount} token = {props.token}/>
            </Switch>
            <Route exact path="/Logout" component={LoginScreen} />
            
            
            
      </div>
        </BrowserRouter>
    )
    }


export default Routes
