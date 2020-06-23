import React, { Component } from "react";

import Register from "./Components/Registration.jsx";
import ResetPassword from "./Components/Resetpassword.jsx";
import ForgetPassword from "./Components/Forgetpassword.jsx";
import VerifyEmail from "./Components/VerifyEmail.jsx";
import Header from "./Components/Header.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import TakeNote from "./Components/TakeNote.jsx";
import GetNote from "./Components/GetNotes.jsx";
//import abcd from "./Components/abcd.jsx";
//import dummy from "./Components/dummy.jsx";
// import todoo from "./Components/todoo.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route , Redirect} from "react-router-dom";
import Login from "./Components/Login.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route  exact path="/" component={Login}></Route>
          {/* {localStorage.getItem("token")? <Route path ="/login" component={Dashboard}/>: <Redirect to={"/login"}/>}
          {localStorage.getItem("token")? <Redirect to={"/login"}/>: <Redirect to={"/login"}/>} */}
          <Route path="/register" component={Register}></Route>
          <Route path="/header" component={Header}></Route>
          <Route path="/forgetpassword" component={ForgetPassword}></Route>
          <Route path="/verify/:jwt" component={VerifyEmail}></Route>
          <Route path="/Dashboard" component={Dashboard}></Route>
          <Route path="/TakeNote" component={TakeNote}></Route>
          <Route path="/GetNote" component={GetNote}></Route>
        {/* <Route path="/abcd" component={abcd}></Route> */}
          <Route path="/resetpassword/:token" component={ResetPassword}></Route>
          {/* <Route path="/dummy" component={dummy}></Route> */}
          {/* <Route path="/todoo" component={todoo}></Route> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
