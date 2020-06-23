import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./User.css";
import UserController from "../Controller/UserController";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Dashboard from "./Dashboard.jsx";
const useStyles = makeStyles((theme) => ({
  root: {},

  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      Password: "",
      error: false,
      err1: false,
      err2: false,
      message: "",
    };
  }

  signupPage = () => {
    this.props.history.push("/register");
  };

  helpermailMethod = () => {
    if (this.state.err1) {
      return "Not a valid mail id";
    }
  };

  helperusernameMethod = () => {
    if (this.state.err2) {
      return "cannot be empty";
    }
  };

  helperpasswordMethod = () => {
    if (this.state.err5) {
      return "enter between 8 to 20 characters ";
    }
  };

  helperphonenumberMethod = () => {
    if (this.state.err6) {
      return "enter exact 10 digit number";
    }
  };
  onchangeUsername = async (event) => {
    await this.setState({ Username: event.target.value });
    console.log(this.state.Username, "uname");
    if (this.state.Username === "") {
      this.setState({ err2: true });
    } else {
      this.setState({ err2: false });
    }
  };
  onchangeEmail = async (event) => {
    await this.setState({ Email: event.target.value });

    if (
      /^[a-zA-z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/.test(this.state.Email)
    ) {
      this.setState({ err1: false });
    } else {
      this.setState({ err1: true });
    }
  };

  onchangePassword = async (event) => {
    await this.setState({ Password: event.target.value });
    var pass = this.state.Password;

    if (pass.length < 8 || pass.length > 20) {
      this.setState({ err5: true });
    } else {
      this.setState({ err5: false });
    }
  };

  onchangePhonenumber = async (event) => {
    await this.setState({ Phonenumber: event.target.value });
    var phonenumber = this.state.Phonenumber;

    //add integer validation
    if (phonenumber.length === 9) {
      this.setState({ err6: true });
    } else {
      this.setState({ err6: false });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    // console.log("inside onsubmit");
    // alert("verification link has been sent to mail");
    var loginDetails = {
      email: this.state.Email,
      password: this.state.Password,
      // service: "advance",

    };
    console.log(loginDetails);
    UserController.login(loginDetails).then((res) => {
      console.log("haiiiii", res.data['token']);
      var token =res.data['token'];
      localStorage.setItem("token", token);

      alert("login success  ");
      if (res.data.statusCode === 200) {
        console.log(res);
        let token = res.data.token;
        console.log(token, "logintoken");

        console.log("token", token);
       
        // localStorage.setItem( loginDetails.email);
        console.log(res.data.message);
        console.log("token is", token);
        this.props.history.push("/Dashboard" + token);
        this.setState({
          error: true,
          message: "Login Success",
        });
      }
    });
  };


  render() {
    const classes = { useStyles };

    return (
      <div id="form-structure-reg">
        <Card style={{ width: "100%" }}>
          <div className={classes.paper}>
            <h2>
              FUNDOONOTES
              
            </h2>
            <Typography component="h1" variant="h5" color="primary">
              Login Form
            </Typography>
            <div>
              <br />
            </div>
            <form className={classes.form} noValidate>
              <div>
                <br />
              </div>

              <TextField
                required={true}
                error={this.state.err1}
                id="Email"
                label="Email"
                variant="outlined"
                value={this.state.Email}
                onChange={this.onchangeEmail}
                helperText={this.helpermailMethod()}
              />
              <div>
                <br />
              </div>
              <TextField
                required={true}
                error={this.state.err5}
                id="Password"
                label="Password"
                type="password"
                variant="outlined"
                value={this.state.Password}
                onChange={this.onchangePassword}
                className={classes.paper}
                helperText={this.helperpasswordMethod()}
              />
              <div>
                <br />
              </div>

              <div className="center">
                <div style={{ paddingBlockEnd: "3%", paddingBottom: "3%" }}>
                  <a href="/ForgetPassword">ForgotPassword?</a>
                </div>
              </div>

              <div className="center">
                <div className="col s6 Reg-button">
                  <Button

                    size="medium"
                    variant="contained"
                    color="primary"

                    className={classes.paper}
                    style={{
                      color: "blue", margin: "0%",
                      marginBottom: "-11%",
                      marginLeft: "50%"
                    }}
                    onClick={this.onSubmit}
                  >
                    login
                    </Button>
                </div>
                <div className="row">
                  <div className="col s6 Reg-button">
                    <Button
                      size="medium"

                      variant="contained"
                      color="primary"

                      className={classes.paper}
                      style={{
                        color: "black",
                        margin: "0%",
                        marginBottom: "8%",
                        marginRight: "20%"
                      }}
                      onClick={this.loginPage}
                    >
                      <a href="/Register">signup</a>
                    </Button>
                  </div>


                  <br />
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    );
  }
}

export default Login;
