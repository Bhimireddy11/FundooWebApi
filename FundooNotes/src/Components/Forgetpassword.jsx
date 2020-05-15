import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./User.css";
import UserController from "../Controller/UserController";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {},

  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
class Forgetpassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",

      error: false,
      err1: false,
      err2: false,
      err3: false,
      err4: false,
      err5: false,
      err6: false,
      message: ""
    };
  }

  loginPage = () => {
    this.props.history.push("/login");
  };

  helpermailMethod = () => {
    if (this.state.err1) {
      return "Not a valid mail id";
    }
  };

  onchangeEmail = async event => {
    await this.setState({ Email: event.target.value });

    if (
      /^[a-zA-z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/.test(this.state.Email)
    ) {
      this.setState({ err1: false });
    } else {
      this.setState({ err1: true });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("inside onsubmit");

    var forgotpasswordDetails = {
      email: this.state.Email
    };
    console.log(forgotpasswordDetails);
    UserController.forgotpassword(forgotpasswordDetails).then(res => {
      console.log("hiii...", res.data);

      if (res.data.statusCode === 200) {
        alert("check mail for the details");
        console.log(res);

        this.setState({
          error: true,
          message: "Registration success"
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
              Forget Password
            </Typography>
            <div>
              <br />
            </div>
            <form className={classes.form} noValidate>
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
    );
  }
}

export default Forgetpassword;
