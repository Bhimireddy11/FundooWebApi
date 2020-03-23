import React, { Component } from "react";
import "../Login.css";
import { Link } from "react-router-dom";
import UserController from "../Controller/UserController";

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      message:null,
      error: false
    };
  }

  onChangeEmail = (event) => {
    var mail = event.target.value;
    this.setState({
        email: mail
    })
}

onChangePassword = (event) => {
    var pswd = event.target.value;
    this.setState({
        password: pswd
    })
}

onSubmit = () => {
    if (this.state.email === "") {
        this.setState({
            Error: true,
            message: "Email cannot be empty"
        })
    }
    else {
        var loginDetails = {
            email: this.state.email,
            password: this.state.password
        };
       // console.log(loginDetails);
        UserController.authentication(loginDetails).then(response => {
          
            console.log('response---', response);
            if (response.data.statuscode === 200) {

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('emailId', this.state.email);
                this.props.history.push("/dashboard")
            }
        }).catch((err) => {
            console.log("error", err.response.data);
            this.setState({ message: 'Invalid credentials' })

        })
        //console.log('-----', this.state.message);
    }
  }
  render() {
  
    return (
      <div className="login-div">
        <div className="col-md-4">
          <div className="form-group">
            <div className="login-header">
              <span>
                <img src="../keep.png" alt="logo" className="logo"></img>
              </span>
              <h1 className="header">fundoo</h1>
            </div>
          </div>
          <hr />

          <div className="login-content">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <input
              type="email"
              name="email"
              className="login-field"
              placeholder="E-mail"
              required
              onChange={this.onChangeEmail}
            />
          </div>
          <div style={{height:'1px',backgroundColor:'whitesmoke'}}></div>
          <div className="" style={{display:'flex',marginTop:'10%'}}>
            <i className="fa fa-key" aria-hidden="true"></i>
            <input
              type="password"
              name="password"
              className="login-field"
              placeholder="Password"
              required
              onChange={this.onChangePassword}
            />
          </div>
          <div style={{height:'1px',backgroundColor:'whitesmoke'}}></div>
          <span className="text-danger font-weight-normal">
                {this.state.message}
          </span>
          <div className="button-content">
            <button
              type="button"
              value="submit"
              className="btn btn-outline-light text-center"
              id="submit"
              onClick={this.onSubmit}
              style={{color:'black'}}
            >
              Login
            </button>
            <button
              type="reset"
              value="reset"
              className="btn btn-outline-light text-center"
              id="reset"
              style={{color:'black'}}
            >
              Reset
            </button>
          </div>

          <footer>
            <h5>
              New User?
              <Link to="/Register" className="footer-content">
                SignUp
              </Link>
            </h5>
            <Link to="/forgotPassword" className="footer-content">
                Forgot Password ?
            </Link>
          </footer>
        </div>
      </div>
    );
  }
}
