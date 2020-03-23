import React, { Component } from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UpdatePassword from './Components/UpdatePassword';
import Dashboard from './Components/Dashboard';
import SideDrawer from './Components/SideDrawer';
import Header from './Components/Header';
import CreateNote from './Components/CreateNote';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/forgotPassword" component={ForgotPassword}></Route>
        <Route path="/updatePassword/:token" component={UpdatePassword}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/sidenav" component={SideDrawer}></Route>
         <Route path="/headers" component={Header}></Route> 
        <Route path="/createnote" exact component={CreateNote}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
