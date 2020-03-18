import React, { Component } from 'react';
import {BrowserRouter as Router,Switch, Route } from "react-router-dom";

//import logo from './logo.svg';
import Login from './Component/Login';
import Register from './Component/Register';
import  ForgotPassword  from './Component/ForgotPassword';
import './App.css';
import UpdatePassword from './Component/UpdatePassword';
import SideNav from './Component/SideNav';
//import Dashboard from './Component/dashboard';
//import Header from './Component/Header';
//import Appbar from './Component/Appbar';

  class App extends Component {
  render() {
    return (
      <Switch>
      <Router>
      <Route path="/" exact component={Login}></Route>
      <Route path="/Register" component={Register}></Route>
       <Route path="/ForgotPassword" component={ForgotPassword}></Route>
       <Route path="/UpdatePassword" component={UpdatePassword}></Route>
       <Route path="/SideNav" component={SideNav}></Route>
       {/* <Route path="/dashboard" component={Dashboard}></Route> */}
       {/* <Route path="/Appbar" component={Appbar}></Route> */}
       {/* <Route path="/Header" component={Header}></Route> */}
        </Router>
        </Switch>
    )
    
  }
}

export default App;
