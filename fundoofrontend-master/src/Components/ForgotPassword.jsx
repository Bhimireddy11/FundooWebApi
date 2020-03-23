import React, { Component } from "react";
import UserController from "../Controller/UserController";
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: false,
      message: null
    };
  }

  onChangeEmail = (event) => {
    var mail = event.target.value
    this.setState({email: mail})
  }
  onSubmit = () =>{
    if (this.state.email === "") {
      this.setState({
          error: true,
          message: "Email cannot be empty"
      });
    }
    else{
      var userEmail = {
        email: this.state.email
      };

      UserController.forgotPassword(userEmail).then(response => {
        this.setState({message: "Please check your mail"})
        //this.props.history.push('/updatePassword');
      })
      .catch(error => {
        console.log("error", error.response.data);
        this.setState({message: "Email doesn't exist"})
      })
    }
  }
  render() {
    const divStyle = {
      width: "50%",
      borderColor: "whitesmoke",
      fontSize: "18px",
      fontWeight: "bold",
      color: "black"
    };
    return (
      <div className="container">
        <div className="col-md-4 offset-md-4">
          <div className="form-group">
            <div className="form-row ">
              <span>
                <img src="../keep.png" alt="logo" className="logo"></img>
              </span>
              <h1 className="header">fundoo</h1>
            </div>
          </div>
          <hr />
          <div className="form-group">
            <div className="form-row ">
              <h3 className="">Forgot Password ?</h3>
              <small>Enter your email to reset your password.</small>
            </div>
          </div>

          <div className="input-icons">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <input
              type="email"
              name="email"
              className="input-field col-md-10"
              placeholder="E-mail"
              required
              onChange={this.onChangeEmail}
            />
          </div>
          <span className="text-danger font-weight-normal">{this.state.message}</span>
          <footer>
            <button
              type="button"
              className="btn btn-outline-primary"
              style={divStyle}
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </footer>
        </div>
      </div>
    );
  }
}
