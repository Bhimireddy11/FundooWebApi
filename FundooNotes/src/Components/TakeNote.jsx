import React, { Component } from "react";
import { Card, IconButton } from "@material-ui/core";
import NoteController from "../Controller/NoteController";
import {
  InputBase,
  Toolbar,
  Button,
  Tooltip,
  Menu,
  Typography,
  Divider,
  TextField,
  Popover,
  Chip,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushIcon from "@material-ui/icons/BrushOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import PaletteIcon from "@material-ui/icons/PaletteOutlined";
import pin from "../Assets/pin.svg";
import fillpin from "../Assets/fillpin.svg";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";

import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import GetNotes from "./GetNotes";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

let rem = [];
class TakeNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj3: this.props.obj3,
      open: false,
      menu: false,
      openNote: false,
      openTooltip:true ,
      title: "",
      description: "",
      createNote: false,
      archieved: false,
      archivemsg: "",
      pinned: false,
      reminder: "",
      labelName: "",
      createdTime: "",
      checkedLabel: false,
      labelMenu: false,
      labelAnchor: null,
      isTrashed: false,
      colorTooltipOpen: false,
      colorAnchor: null,
      colorOpen: false,
      hoverColorTooltip: false,
      hoverMoreTooltip: false,
      color: "#FDFEFE",
      getNotes: this.props.getNotes,
      allLabels: [],
      collaborators1: [],
      collaborators: [],
      labelpresent: false,
      collabpresent: false,
      collabOpen: false,
      disable: true,
      collabName: "",
      err1: false,
      err2: true,
      

      reminderMenu: false,
      reminderAnchor: null,
      selectedDate: "",
      remState: null,
      
    

      manycolor: [
        { name: "Red", colorCode: "red" },
        { name: "Cyan", colorCode: "Cyan" },
        { name: "Blue", colorCode: "Blue" },
        { name: "Indigo", colorCode: "Indigo" },
        { name: "LightBlue", colorCode: "LightBlue" },
        { name: "Purple", colorCode: "Purple" },
        { name: "Yellow", colorCode: "Yellow" },
        { name: "Lime", colorCode: "Lime" },
        { name: "Pink", colorCode: "Pink" },
        { name: "gray", colorCode: "gray" },
        { name: "Brown", colorCode: "Brown" },
        { name: "White", colorCode: "White" },
      ],
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ getNotes: props.getNotes });
  }
  handleIsPinned = async () => {
    await this.setState({ pinned: !this.state.pinned });
    console.log("is pinned value", this.state.pinned);
  };
  handleReminder = async (event) => {
    await this.setState({
      selectedDate: event.target.value,
    });
    console.log("date is :", this.state.selectedDate);
  };

  handleIsArchieved = async () => {
    await this.setState({ archieved: !this.state.archieved });
    alert("note archieved");
    console.log("is pinned value", this.state.archieved);
  };
  // handleIsPinned = () => {
  //   this.setState({ isPinned: !this.state.isPinned });
  // };
  handleMenuClickAway = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    await this.setState({
      menu: false,
      labelMenu: false,
      hoverColorTooltip: false,
      hoverMoreTooltip: false,
      reminderMenu: false,
      selectedDate: "",
    });
  };
  handleSaveReminder = async () => {
    alert("inside handle save");
    if (this.state.selectedDate === "") {
      await this.setState({
        remState: null,
        reminderMenu: false,
        selectedDate: "",
      });
      var noteDetails = {
        noteId: this.state.noteId,
        title: this.state.title,
        description: this.state.description,
        isTrashed: this.state.trashed,
        isArchived: this.state.archieved,
        isPinned: this.state.pinned,
        color: this.state.colour,
        // labelName: this.state.labelName,
        reminder: this.state.selectedDate,
      };
      await NoteController.editNotes(noteDetails).then((res) => {
        alert("inside success");
        if (res.status === 200) {
          console.log("Note updated successfully", noteDetails.reminder);

          alert("inside success");
        }
      });
      this.props.getNotes();
    } else if (this.state.selectedDate !== "") {
      let date = new Date(this.state.selectedDate);
      let val = "";
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      let remVal = val.concat(
        date.toLocaleString("default", { month: "long" }),
        " ",
        date.getDate(),
        " ",
        date.getFullYear(),
        " ",
        strTime
      );
      console.log("rem value is : ", remVal);

      await this.setState({
        remState: remVal,
        reminderMenu: false,
      });
      var noteDetails = {
        noteId: this.state.noteId,
        title: this.state.title,
        description: this.state.description,
        isTrashed: this.state.trashed,
        isArchieved: this.state.archieved,
        isPinned: this.state.pinned,
        color: this.state.colour,
        // labelName: this.state.labelName,
        reminder: this.state.selectedDate,
        service: "advance",
      };
      await NoteController.editNotes(noteDetails).then((res) => {
        console.log("please check here", res);
        if (res.status === 200) {
          console.log("Note updated successfully");
          alert("please work");
        }
      });
      this.props.getNote();
    }
  };

  MenuClose = () => {
    this.setState({ menu: false });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };
  changeColor = (event) => {
    event.preventDefault();
    this.setState({
      colorOpen: true,
      colorAnchor: event.currentTarget,
    });
  };

  // onClickclose = async () => {
  //   this.setState({ open: false });
  // };
  onClickTakeNote = async () => {
    this.setState({ open: true });
  };
  handleReminderClick = async (event) => {
    await this.setState({
      reminderMenu: true,
      reminderAnchor: event.currentTarget,
    });
  };
  onChangeTitle = async (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeDescription = async (event) => {
    this.setState({ description: event.target.value });
  };

  
  onClickTrash = async (event) => {
    this.setState({ isTrashed: true });
  };
  changeNoteColor = async (event) => {
    await this.setState({
      colorOpen: false,
      color: event.target.value,
      openTooltip: false,
      hoverColorTooltip: false,
    });
    console.log(this.state.color);
    await NoteController.colornote(this.state.noteId, this.state.color).then(
      (res) => {
        if (res.status === 200) {
          console.log("Color set Successfully");
        }
      }
    );
    this.props.getNotes();
  };
  addNotes = async () => {
    var noteDetails = {
      title: this.state.title,
      description: this.state.description,
      isTrashed: this.state.isTrashed,
      archieved: this.state.archieved,
      colour: this.state.color,
      reminder: this.state.reminder,
      pinned: this.state.pinned,
      service: "advance",
    };
    console.log(noteDetails);
    await NoteController.createNote(noteDetails).then((res) => {
      if (res.data.statusCode === 200) {
        console.log(res);
        alert("Note is created");
        this.setState({
          open: false,
          message: "note created",
        });
      }
      this.props.getNotes();
    });
  };
  render() {
    const color1 = this.state.manycolor.map((color) => {
      return (
        <Tooltip
          //TransitionComponent={Fade}
          TransitionProps={{ timeout: 100 }}
          title={color.name}
        >
          <IconButton
            style={{
              background: color.name,
              margin: "2%",
              
            }}
            value={color.colorCode}
            onClick={this.changeNoteColor}
          />
        </Tooltip>
      );
    });
    return (
      <div className="noteSize">
        {!this.state.open ? (
          <div className="show">
            <Card className="notesCard">
              
              <InputBase
                className="takeNote"
                style={{
                  marginTop: "0px",
                  
                }}
                onClick={this.onClickTakeNote}
                placeholder="   Take a notes..."
              ></InputBase>
              <div className="checkbox">
                <IconButton>
                  <CheckBoxIcon />
                </IconButton>
                <IconButton>
                  <BrushIcon />
                </IconButton>
                <IconButton>
                  <ImageIcon />
                </IconButton>
              </div>
            </Card>
          </div>
        ) : (
          <div className="takeNote1">
            {/* // <div className="cardlist"> */}
            <Card style={{ backgroundColor: this.state.color }}>
              <div className="titleAndPin">
                <div>
                  <InputBase
                    className="titleNote"
                    placeholder="Title"
                    onClick={this.onClickTitle}
                    onChange={this.onChangeTitle}
                  ></InputBase>
                </div>
                <div className="pin">
                  {!this.state.pinned ? (
                    <IconButton onClick={this.handleIsPinned}>
                      <img
                        src={require("../Assets/pin.svg")}
                        alt=""
                        style={{ fontSize: "20px" }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton onClick={this.handleIsPinned}>
                      <img
                        src={require("../Assets/fillpin.svg")}
                        alt=""
                        style={{ fontSize: "16px" }}
                      />
                    </IconButton>
                  )}
                </div>
              </div>
              <div className="inp1">
                <InputBase
                  className="in1"
                  type={File}
                  onChange={this.onChangeDescription}
                  placeholder="    Take a note..."
                  style={{ fontSize: "14px" }}
                  multiline={this.state.nextLine}
                ></InputBase>
              </div>

              {/* <Toolbar id="label_chip"> */}
              {this.state.remState !== null ? (
                <div className="chip-style">
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={rem}
                    onDelete={this.handleReminderDelete}
                  />
                </div>
              ) : null}
              {/* {displaylabels}
          {displaycollabs} */}
              {/* </Toolbar> */}
              <div className="toolbarAndClose3">
                {/* <Toolbar className="CardTool"> */}
                <div className="CardToolbar">
                  <AddAlertIcon
                    onClick={this.handleReminderClick}
                    style={{ fontSize: "16px" }}
                  />
                </div>

                <div className="CardToolbar">
                  <PersonAddIcon
                    onClick={this.onClickCollaborator}
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <div className="CardToolbar">
                  <PaletteIcon
                    onClick={this.changeColor}
                    style={{ fontSize: "16px" }}
                  />

                  <Menu
                    id="simple-menu"
                    open={this.state.colorOpen}
                    anchorEl={this.state.colorAnchor}
                    onClose={this.closeColorBox}
                    transformOrigin={{
                      vertical: "right",
                      horizontal: "right",
                      // width:"50%",
                    }}
                  >
                    <div id="color-align">{color1}</div>
                  </Menu>
                </div>
                <div className="CardToolbar">
                  <ImageIcon style={{ fontSize: "16px" }} />
                </div>
                <div className="CardToolbar">
                  <ArchiveIcon
                    onClick={this.handleIsArchieved}
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <div className="CardToolbar">
                  <MoreVertIcon style={{ fontSize: "16px" }} />
                </div>
              
                <div className="closeButton">
                  <Button onClick={this.addNotes} style={{ fontSize: "11px" }}>
                    <b>close</b>
                  </Button>
                </div>
                <ToastContainer />
              </div>
              <Popover
                id="label-menu"
                open={this.state.reminderMenu}
                anchorEl={this.state.reminderAnchor}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                onClose={this.handleMenuClickAway}
              >
                <Card id="reminder-card">
                  <Toolbar id="createlabelnote_field">
                    <Typography style={{ fontWeight: "bolder" }}>
                      Reminders
                    </Typography>
                  </Toolbar>
                  <Divider />
                  <Toolbar>
                    <div style={{ marginLeft: "-11px" }}>
                      <form>
                        <TextField
                          id="datetime-local"
                          type="datetime-local"
                          value={this.state.selectedDate}
                          defaultValue={this.state.selectedDate}
                          onChange={this.handleReminder}
                        />
                      </form>
                    </div>
                    {/* <div id="close_button">
                      <Tooltip
                        // TransitionComponent={Fade}
                        TransitionProps={{ timeout: 100 }}
                        // title={saveclose}
                        arrow
                      >
                        <Button onClick={this.onCloseDialog}>Close</Button>
                      </Tooltip>
                    </div> */}
                    {/* <Button variant="contained" color="primary">
                      close
                      </Button> */}
                      
        
                  </Toolbar>
                  <Toolbar id="createlabelnote_field">
                    <div className="rem-save">
                      <Button onClick={this.handleSaveReminder}>save</Button>
                    </div>
                  </Toolbar>
                </Card>
              </Popover>
            </Card>
          </div>
        )}
      </div>
    );
  }
}
export default TakeNote;
