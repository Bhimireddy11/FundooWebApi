import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./User.css";
//import UserController from "../Controller/UserController";
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
class abcd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      error: false,
      message: "",
      token: ""
    };
  }

  componentDidMount() {
    this.state.token = this.props.match.params.token;
    console.log("token is", this.state.token);
  }

  onchangenewPassword = event => {
    this.setState({ newPassword: event.target.value });
  };

  onchangeconfirmPassword = event => {
    this.setState({ confirmPassword: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    var resetDetails = {
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword
    };
    console.log(this.state.token);
    console.log(resetDetails);

    // UserController.resetpassword(resetDetails, this.state.token).then(res => {
    //   console.log("hiii...", res);
    //   if (res.data.statusCode === 200) {
    //     this.props.history.push("/login");
    //     this.setState({
    //       error: true,
    //       message: "Login success"
    //     });
    //   } else {
    //     this.setState({
    //       error: true,
    //       message: "Please Reregister"
    //     });
    //   }
    // });
  };

  render() {
    const classes = { useStyles };

    return (
      <div id="form-structure">
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
              Reset Password
            </Typography>
            <div>
              <br />
            </div>
            <form className={classes.form} noValidate>
              <TextField
                required={true}
                error={this.state.error}
                id="newPassword"
                label="New Password"
                type="password"
                variant="outlined"
                value={this.state.newPassword}
                onChange={this.onchangenewPassword}
                className={classes.paper}
              />
              <div>
                <br />
              </div>
              <TextField
                required={true}
                error={this.state.error}
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={this.state.confirmPassword}
                onChange={this.onchangeconfirmPassword}
                className={classes.paper}
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
                  Submit
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

export default abcd;
