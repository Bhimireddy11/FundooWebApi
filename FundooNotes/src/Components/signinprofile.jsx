import React, { Component } from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  Avatar,
  Popper,
  Paper,
  Card,
  Button,
  ClickAwayListener,
  Divider,
} from "@material-ui/core";
//import { getNotes } from "../../Controller/NoteController";

const theme = createMuiTheme({
  overrides: {
    MuiAvatar: {
      colorDefault: {
        margin: 7,
        backgroundColor: "darkorange",
      },
    },
  },
});

class AccountComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      open: false,
      anchorEl: null,
      notes: [],
    };
  }
  closePop() {
    this.setState({
      open: !this.state.open,
    });
  }
  signOut = (event) => {
    localStorage.clear();
    window.location = "http://localhost:3000/login";
  };
  openPop = (event) => {
    var email = localStorage.getItem("Email");
    console.log("Email id", email);

    console.log("in popper");

    const { currentTarget } = event;
    this.setState({
      anchorEl: currentTarget,
      open: !this.state.open,
      email: email,
    });
    console.log("out popper", this.state.anchorEl);
    console.log("open", this.state.open);
  };
  componentDidMount() {
    // getNotes(NoteList => {
    //   console.log("notew list----", NoteList);
    //   if (NoteList !== undefined && NoteList !== null) {
    //     this.setState({
    //       notes: NoteList
    //     });
    //     console.log(" available note  in account---", this.state.notes);
    //   } else {
    //     this.setState({
    //       notes: []
    //     });
    //   }
    // });
  }

  render() {
    var noteArr = [];
    var NoteCount = 0;
    var ArchiveCount = 0;
    var PinCount = 0;
    var TrashCount = 0;
    console.log(" available note account ---", this.state.notes);
    noteArr = Object.keys(this.state.notes).map((note, index) => {
      var key = note;
      var noteData = this.state.notes[key];
      console.log("notedat---", noteData);

      if (noteData.Title !== "") {
        NoteCount = NoteCount + 1;
      }
      console.log("note title---", noteData.Title);

      return noteArr;
    });

    noteArr = Object.keys(this.state.notes).map((note, index) => {
      var key = note;
      var noteData = this.state.notes[key];

      if (noteData.Archive !== false) {
        ArchiveCount = ArchiveCount + 1;
      }

      return noteArr;
    });
    noteArr = Object.keys(this.state.notes).map((note, index) => {
      var key = note;
      var noteData = this.state.notes[key];

      if (noteData.Pinned !== false) {
        PinCount = PinCount + 1;
      }

      return noteArr;
    });
    noteArr = Object.keys(this.state.notes).map((note, index) => {
      var key = note;
      var noteData = this.state.notes[key];

      if (noteData.Trash !== false) {
        TrashCount = TrashCount + 1;
      }

      return noteArr;
    });

    console.log("note count---", NoteCount);
    console.log("note arr---", noteArr);

    var name = localStorage.getItem("Name");
    // var lname = localStorage.getItem("LastName");
    // var fullname = fname + " " + lname;

    var email = localStorage.getItem("Email");
    // var firstLetter = email.substring(0, 1);
    //var upperCaseLetter = firstLetter.toLocaleUpperCase();
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Avatar onClick={(event) => this.openPop(event)}>
            {/* {upperCaseLetter} */}
          </Avatar>
        </MuiThemeProvider>
        <Card>
          <Popper open={this.state.open} anchorEl={this.state.anchorEl}>
            <ClickAwayListener onClickAway={(event) => this.closePop(event)}>
              <Paper className="paper">
                <MuiThemeProvider theme={theme}>
                  <div className="collabmail">
                    <div>
                      <Avatar onClick={(event) => this.openPop(event)}>
                        {/* {upperCaseLetter} */}
                      </Avatar>
                    </div>
                    <div className="NameAndMail">
                      <div>{name} </div>

                      {/* sss */}
                    </div>
                  </div>
                </MuiThemeProvider>
                <Divider />
                <div className="Count">
                  <div>Number of notes:{NoteCount}</div>
                  <div>Number of Archive:{ArchiveCount}</div>
                  <div>Number of pinned note:{PinCount}</div>
                  <div>Number of Trash note:{TrashCount}</div>
                </div>
                <Divider />

                <div className="Sign">
                  <Button onClick={(event) => this.signOut(event)}>
                    Sign out
                  </Button>
                </div>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Card>
      </div>
    );
  }
}
export default AccountComponent;
