import React from 'react'
import Navbar from './components/Navbar/Navbar'
import CreateStudentAccount from './components/Views/CreateStudentAccount'
import ViewLeaderboard from './components/Views/ViewLeaderboard'
import ViewAssignment from './components/Views/ViewAssignments'
import Dashboard from './components/Views/Dashboard'
import Questionbank from './components/Views/ViewQuestionbank'
import Login from './components/Views/LoginScreen'

import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom'

const Routes = () => {
    return (
        <BrowserRouter>
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/Statistics" component={Dashboard} />
            </Switch>
            <Switch>
                <Route exact path="/ViewAssignments" component={ViewAssignment} />
            </Switch>
            <Switch>
                <Route exact path="/QuestionBank" component={Questionbank} />
            </Switch>
            <Switch>
                <Route exact path="/ViewLeaderboard" component={ViewLeaderboard} />
            </Switch>
            <Switch>
                <Route exact path="/CreateStudentAccount" component={CreateStudentAccount} />
            </Switch>
            {/* <Switch>
                <Route exact path="/Logout" component={Login} />
            </Switch> */}
      </div>
        </BrowserRouter>
    )
}

export default Routes
