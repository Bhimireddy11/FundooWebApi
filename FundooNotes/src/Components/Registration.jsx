import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./User.css";
import UserController from "../Controller/UserController";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Register from "./Register.json";

const useStyles = makeStyles((theme) => ({
  root: {},

  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: "",
      Email: "",
      Password: "",
      Phonenumber: "",
      error: false,
      err1: false,
      err2: false,
      err3: false,
      err4: false,
      err5: false,
      err6: false,
      message: "",
    };
  }
  //var Data = require('json!../data/yourfile.json');
  loginPage = () => {
    this.props.history.push("/login");
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
    console.log("inside onsubmit");
    alert("verification link has been sent to mail");
    var registrationDetails = {
      firstName: this.state.Username,

      email: this.state.Email,
      password: this.state.Password,
      phonenumber: this.state.Phonenumber,
      lastName:"raji",

      service: "advance",
    };
    console.log(registrationDetails);
    UserController.register(registrationDetails).then((res) => {
      console.log("hiii...", res.data);
      alert();
      if (res.data.statusCode === 200) {
        this.props.history.push("/login");
        console.log(res);

        this.setState({
          error: true,
          message: "Registration success",
        });
      }
    });
  };

  render() {
    const classes = { useStyles };

    return (
      // <div className="posts">
      //   {Register.map(post =>{
      //   return(
      //     <>
      //     <h4> {post.UserName}</h4>
      //     <h4> {post.Email}</h4>
      //     <h4> {post.phoneNumber}</h4>
      //     <h4> {post.Password}</h4>

    
      //     </>
      //   )
      //   })}
      
      <div id="form-structure-reg">
        <Card style={{ width: "100%" }}>
          <div className={classes.paper}>
            <h2>
              <span style={{ color: "#1a73e8" }}>F</span>
              <span style={{ color: "#df1a1a" }}>u</span>
              <span style={{ color: "#ffc107" }}>n</span>
              <span style={{ color: "#1a73e8" }}>d</span>
              <span style={{ color: "#0fb12a" }}>o</span>
              <span style={{ color: "#0fb12a" }}>o</span>
              <span> </span>
              <span style={{ color: "#df1a1a" }}>N</span>
              <span style={{ color: "#e2b111" }}>o</span>
              <span style={{ color: "#0fb12a" }}>t</span>
              <span style={{ color: "#1a73e8" }}>e</span>
            </h2>
            <Typography component="h1" variant="h5" color="primary">
              Registration Details
            </Typography>
            <div>
              <br />
            </div>
            <form className={classes.form} noValidate>
              <TextField
                required={true}
                error={this.state.err2}
                id="Username"
                label="Name"
                variant="filled"
                value={this.state.Username}
                onChange={this.onchangeUsername}
                helperText={this.helperusernameMethod()}
              />
              <div>
                <br />
              </div>

              <TextField
                required={true}
                error={this.state.err1}
                id="Email"
                label="Email"
                variant="filled"
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
                variant="filled"
                value={this.state.Password}
                onChange={this.onchangePassword}
                className={classes.paper}
                helperText={this.helperpasswordMethod()}
              />
              <div>
                <br />
              </div>
              <TextField
                required={true}
                error={this.state.err6}
                id="PhoneNumber"
                label="Phone Number"
                variant="filled"
                value={this.state.Phonenumber}
                onChange={this.onchangePhonenumber}
                className={classes.paper}
                helperText={this.helperphonenumberMethod()}
              />
              <div className="button-style">
                <Button
                  id="button"
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.onSubmit}
                >
                  Sign In
                </Button>
              </div>
              <div>
                <br />
              </div>
            </form>
          </div>
        </Card>
      </div>
  // </div>
    );
      
  }
}

export default Registration;