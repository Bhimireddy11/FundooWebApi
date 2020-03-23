import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

class SideNav extends Component {
  state = {
    sideNavLeft: false,
  }

sidenavToggle = sidenavId => () => {
  const sidenavNr = `sideNav${sidenavId}`
  this.setState({
    [sidenavNr]: !this.state[sidenavNr]
  });
};

render() {
    return (
     <h1></h1>
    );
  }
}

export default SideNav;