import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import CreateStudentAccount from './components/Views/CreateStudentAccount'
import ViewLeaderboard from './components/Views/ViewLeaderboard'
import ViewAssignment from './components/Views/ViewAssignments'
import Dashboard from './components/Views/Dashboard'
import Questionbank from './components/Views/ViewQuestionbank'
import CreateAssignment  from './components/Views/CreateAssignment'
import Assignmentpage  from './components/Views/Assignmentpage'

import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Views/LoginScreen';

const Routes = ({token ,setToken}) => {
    
    // if(!token) {   
    //     return <Login setToken={setToken} />
    //   }
    return (
        <BrowserRouter>
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/Statistics" component={Dashboard} />
                <Route exact path="/Assignments" component={ViewAssignment} />
                <Route path="/Assignmentpage" component={Assignmentpage} />
                <Route path="/CreateAssignment" component={CreateAssignment} />
                <Route exact path="/QuestionBank" component={Questionbank} />
                <Route exact path="/Leaderboard" component={ViewLeaderboard} />
                <Route exact path="/CreateStudentAccount" component={CreateStudentAccount} />
            </Switch>
            <Route exact path="/Logout" component={Login} />
      </div>
        </BrowserRouter>
    )
}

export default Routes
