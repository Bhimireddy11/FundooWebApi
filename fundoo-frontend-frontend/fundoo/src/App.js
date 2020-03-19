import React, { Component } from 'react';
import {BrowserRouter as Router,Switch, Route } from "react-router-dom";

//import logo from './logo.svg';
import Login from './Component/Login';
import Register from './Component/Register';
import  ForgotPassword  from './Component/ForgotPassword';
import './App.css';
import UpdatePassword from './Component/UpdatePassword';
import PrimarySearchAppBar from './Component/AppBar';
import Dashboard from './Component/Dashboard';
import SideNavBar from './Component/SideBar';


  class App extends Component {
  render() {
    return (
      <Switch>
      <Router>
      <Route path="/" exact component={Login}></Route>
      <Route path="/Register" component={Register}></Route>
       <Route path="/ForgotPassword" component={ForgotPassword}></Route>
       <Route path="/UpdatePassword" component={UpdatePassword}></Route>
     <Route path="/Dashboard" component={Dashboard}></Route>   
     {/* 
      */}
        </Router>
        </Switch>
    )
    
  }
}

export default App;
