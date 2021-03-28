import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import CreateStudentAccount from './components/Views/CreateStudentAccount'
import ViewLeaderboard from './components/Views/ViewLeaderboard'
import ViewAssignment from './components/Views/ViewAssignments'
import Dashboard from './components/Views/Dashboard'
import Questionbank from './components/Views/ViewQuestionbank'

import Assignmentpage  from './components/Views/Assignmentpage'

import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Views/LoginScreen';
import LoginScreen from './components/Views/LoginScreen';

const Routes = (props) => {


    return (
        <BrowserRouter>
        <div>
            <Navbar token = {props.token}/>
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
