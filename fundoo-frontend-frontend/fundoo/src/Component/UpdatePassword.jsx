import React, { Component } from "react";
import UserController from "../Controller/UserController";
class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:this.props.match.params.token,
      newPassword: "",
      cnfPassword: "",
      error: false,
      message: null
    };
  }
  onChangePswd = event => {
    var pswd = event.target.value;
    this.setState({ newPassword: pswd });
  };
  onChangeCnfPswd = event => {
    var cpswd = event.target.value;
    this.setState({ cnfPassword: cpswd });
  };

  onSubmit = (e) => {
    if (this.state.newPassword === "") {
      this.setState({
        error: true,
        message: "Please enter the password"
      });
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        this.state.newPassword
      )
    ) {
      this.setState({
        error: true,
        message:
          "At least 1 lowercase 1 uppercase 1 number and 1 special character and length should be minimum 6"
      });
    }
    if (this.setState.cnfPassword === "") {
      this.setState({
        error: true,
        message: "Please enter the Confirm Password"
      });
    } else if (this.state.cnfPassword !== this.state.newPassword) {
      this.setState({
        error: true,
        message: "Password and Confirm Password should be same"
      });
    } else {
      var pswdInfo = {
        newPassword: this.state.newPassword,
        cnfPassword: this.state.cnfPassword
      };

      console.log("TOKEN :" + this.state.token);
      UserController.updatePassword(pswdInfo, this.state.token).then(response => {
        console.log("Data :"+response);
        this.props.router.push('/');
      })
        .catch(error => {
          console.log("ERROR :"+error);
        //  this.setState({ message: "Something went wrong" });
        });
    }
  }
  render() {
    const divStyle = {
      width: "25%",
      borderColor: "whitesmoke",
      fontSize: "16px",
      fontWeight: "bold",
      color: "black"
    };
    return (
      <div className="container">
        <div className="col-md-4 offset-md-4">
          <div className="form-group">
            <div className="form-row ">
              <h1 className="header">fundoo</h1>
            </div>
          </div>
          <hr />
          <div className="form-group">
            <div className="form-row ">
              <h3 className="">Reset your password</h3>
              <small>Please enter your password below to reset.</small>
            </div>
          </div>

          <div className="input-icons">
            <i className="fa fa-key" aria-hidden="true"></i>
            <input
              type="password"
              //pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
              name="newPassword"
              className="input-field col-md-10"
              placeholder="Password"
              required
              onChange={this.onChangePswd}
            />
          </div>
          <span className="text-danger font-weight-normal">
            {this.state.message}
          </span>
          <div className="input-icons">
            <i className="fa fa-key" aria-hidden="true"></i>
            <input
              type="password"
              name="cnfPassword"
              className="input-field col-md-11"
              placeholder="Confirm Password"
              required
              onChange={this.onChangeCnfPswd}
            />
          </div>
          <span className="text-danger font-weight-normal">
            {this.state.message}
          </span>
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
export default UpdatePassword;