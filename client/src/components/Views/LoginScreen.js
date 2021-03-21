// import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';

// import Login from '../Login';


// const style = {
//   margin: 15,
// };

// class Loginscreen extends Component {
//   constructor(props){
//     super(props);
//     var loginButtons=[];
//     loginButtons.push(
//       <div key={"Login-Div"}>
    
       
//       </div>
//     )
//     this.state={
//       username:'',
//       password:'',
//       loginscreen:[],
//       loginmessage:'',
//       loginButtons:loginButtons,

//       isLogin:true
//     }
//   }
//   componentWillMount(){
//     var loginscreen=[];
//     loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} key={"LoginScreen"}/>);

//     this.setState({
//                   loginscreen:loginscreen,
           
//                     })
//   }
//   handleClick(event,userRole){
//     console.log("event",userRole);
//     var loginmessage;
//     if(this.state.isLogin){
//       let loginscreen=[];
//       let loginButtons=[];
//       loginButtons.push(
//         <div key="login-button">
//         <MuiThemeProvider>
//           <div>
//              <RaisedButton label={"Login"} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
//          </div>
//          </MuiThemeProvider>
//         </div>
//       )
//       this.setState({
//                      loginscreen:loginscreen,
//                      loginmessage:loginmessage,
//                      loginButtons:loginButtons,
//                      isLogin:false
//                    })
//     }
//     else{
//       let loginscreen=[],loginButtons=[];
    
//       loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} />);

//       this.setState({
//                      loginscreen:loginscreen,
//                      loginmessage:loginmessage,
//                      loginButtons:loginButtons,
//                      isLogin:true
//                    })
//     }
//   }
//   render() {
//     return (
//       <div className="loginscreen " key="loginscreen" style={{alignItems:"center"}}>
//         {this.state.loginscreen}
//         <div>
//           {this.state.loginmessage}
//           {this.state.loginButtons}
//         </div>
//       </div>
//     );
//   }
// }


// export default Loginscreen;

import React, {Component} from 'react';
import {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar';

const LoginScreen = () => {
    const [Email, setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const [token, setToken] = useState('');

    const onSubmit = (e)=>{
      e.preventDefault()
      if(!Email){
          alert('Please Enter Email')
          return
      }
      else if(!Password){
          alert('Please Enter Password')
          return
      }
        setEmail('')
        setPassword('')
    }


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({"emailID":Email,"password":Password});
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        };
        
        fetch("http://localhost:5000/teacher/login", requestOptions)
            .then(response => response.text())
            .then(result => setToken(result))
            .then(data => console.log(data))
            .catch(error => console.log('error', error));
    })
    if (token ==''|| token == 'Username does not exist' || token == 'Password is incorrect for the user')
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
  else
  {
    console.log('token=',token);
    return(
        <div> 
            <Navbar/>
        </div>
    )

  }

  }
  export default LoginScreen;