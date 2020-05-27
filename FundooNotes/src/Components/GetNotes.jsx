import React, { Component } from "react";
import {
  Card,
  InputBase,
  IconButton,
  Toolbar,
  Chip,
  MenuItem,
  Menu,
  Dialog,
  Popover,
  Tooltip,
  Button,
  MuiThemeProvider,
  TextField,
  Divider,
  Typography,
  Input,
  Avatar,
  
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import PaletteIcon from "@material-ui/icons/PaletteOutlined";
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import DoneIcon from "@material-ui/icons/DoneOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import pin from "../Assets/pin.svg";
import fillpin from "../Assets/fillpin.svg";
import NoteController from "../Controller/NoteController";
import LabelController from "../Controller/LabelController";
import GetLabelsInNoteMenu from "./GetLabelsInNoteMenu";
import Note from "../Data/Note.json";
const saveclose = "Save & Close";
let array = [];
let arrcollab1 = [];
let rem = "";
let profpic = localStorage.getItem("profilepicture");
class GetNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      open: false,
      label: [],
     
      allLabels: this.props.data.list,
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

      defaultColour: "#FDFEFE",
      collaborators: this.props.data.colabUser,
      colorOpen: false,
      opencolourBox: false,
      title: this.props.data.title,
      description: this.props.data.description,
      isPinned: this.props.data.pinned,
      isTrashed: this.props.data.trashed,
      noteId: this.props.data.noteId,
      isGrid: this.props.isGrid,
      reminder: this.props.data.reminder,
      isArchieved: this.props.data.archieved,
      moreopen: false,
      labelAnchor: null,
      collabOpen: false,
      colorOpen: false,
      colorAnchor: null,
      color: this.props.data.colour,
      openDialog: false,
      labelName: "",
      getLabelArr: this.props.getLabelArr,

      reminderMenu: false,
      reminderAnchor: null,
      remState: this.props.data.reminder,
      selectedDate: this.props.data.reminder,
      service: "advance",
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.editNote = this.editNote.bind(this);
    this.handleReminder = this.handleReminder.bind(this);
    this.openPop = this.openPop.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }
  onChangeLabelName = async (event) => {
    await this.setState({ labelName: event.target.value });
    console.log(this.state.labelName);
  };
  handleMoreOpen = async (event) => {
    this.setState({
      moreopen: !this.state.moreopen,
      labelAnchor: event.currentTarget,
    });
  };

  onChangeCollabName = async (event) => {
    await this.setState({ collabName: event.target.value });

    if (
      /^[a-zA-z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/.test(
        this.state.collabName
      )
    ) {
      this.setState({ err1: false });
      if (this.state.collabName !== "") {
        await this.setState({ disable: false });
      }
    } else if (this.state.collabName === "") {
      this.setState({ err1: false, disable: true });
    } else {
      this.setState({ err1: true });
    }
  };
  handleCollabOpen = async () => {
    await this.setState({ collabOpen: true });
  };
  handleCollabSave = async () => {
    await this.setState({
      collabOpen: false,
    });
    arrcollab1 = [];
  };
  handleCollabCancel = async () => {
    if (arrcollab1.length !== 0) {
      for (let index = 0; index < arrcollab1.length; index++) {
        let collabDetails = {
          noteId: this.props.data.id,
          collaborator: arrcollab1[index],
        };
        NoteController.deletecollabfromnote(collabDetails).then((resp) => {
          if (resp.status === 200) {
            console.log("Collaborator added to note");
          }
        });
      }
    }
    arrcollab1 = [];
    this.props.getNotes();
    await this.setState({
      collabOpen: false,
    });
  };
  helpercollabmethod = () => {
    if (this.state.err1) {
      return "Not a valid mail id";
    }
  };
  componentWillReceiveProps(props) {
    this.setState({
      getLabelArr: props.getLabelArr,
      title: props.data.title,
      description: props.data.description,
      isPinned: props.data.pinned,
      isTrashed: props.data.trashed,
      noteId: props.data.noteId,
      isArchieved: props.data.archieved,
      selectedDate: props.data.reminder,
      remState: props.data.reminder,
      reminder: props.data.reminder,
      pin: false,
      color: props.data.colour,
      isGrid: props.isGrid,
      collaborators: props.data.colabUser,
    });
  }

  handleLabel(val) {
    this.setState({
      label: val,
    });
  }

  openPop() {
    this.setState({
      open: !this.state.open,
    });
  }
  editNote() {
    this.setState({
      edit: !this.state.edit,
    });
  }
  handleEdit() {
    this.setState({ edit: !this.state.edit });
  }
  //   isPinned(event, note, key) {
  //     pinnedNote(note, key);
  //   }
  // handleReminder(rem) {
  //   this.setState({
  //     reminder: rem,
  //   });
  // }
  handleReminderClick = async (event) => {
    await this.setState({
      reminderMenu: true,
      reminderAnchor: event.currentTarget,
    });
  };
  handleCollabDoneClick = async () => {
    arrcollab1.push(this.state.collabName);

    let collabDetails = {
      noteId: this.props.data.noteId,
      collabName: this.state.collabName,
    };
    await NoteController.addcollabtonote(collabDetails).then((resp) => {
      if (resp.status === 200) {
        console.log("Collaborator added to note");
        this.props.getNote();
      }
    });
    await this.setState({
      collabName: "",
      disable: true,
    });
  };
  handleRemoveCollab = async (data, item) => {
    let collabDetails = {
      noteId: this.props.data.noteId,
      collabName: item.email,
    };
    NoteController.deletecollabfromnote(collabDetails).then((resp) => {
      if (resp.status === 200) {
        console.log("Collaborator added to note");
        this.props.getNote();
      }
    });
  };
  handleDoneClick = async () => {
    if (this.state.labelName !== "") {
      var labelDetails = {
        name: this.state.labelName,
      };
      console.log("the label  ", labelDetails);
      await LabelController.createandmaplabel(
        labelDetails,
        this.props.data.noteId
      ).then((res) => {
        if (res.status === 200) {
          console.log("Label added to the note successfully");
        }
      });
    }
    await this.setState({ labelName: "" });

    this.props.getLabels();
    this.props.getNotes();
  };

  handleReminder = async (event) => {
    await this.setState({
      selectedDate: event.target.value,
    });
    console.log("date is :", this.state.selectedDate);
  };
  handleReminderDelete = async () => {
    await this.setState({
      remState: null,
      selectedDate: null,
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
      service: "advance",
    };
    await NoteController.editNotes(noteDetails).then((res) => {
      if (res.status === 200) {
        console.log("Note updated successfully");
        this.props.getNotes();
      }
    });
  };

  handleDeleteForever = async () => {
    await this.setState({});
    var noteDetails = {
      noteId: this.state.noteId,
    };
    await NoteController.deletenoteforever(noteDetails.noteId).then((res) => {
      if (res.status === 200) {
        this.props.getNotes();
        console.log("Note deleted successfully");
      }
    });
    this.props.getNotes();
  };
  handleRestoreNotes = async () => {
    await this.setState({});
    var noteDetails = {
      noteId: this.state.noteId,
    };
    await NoteController.restorenote(noteDetails.noteId).then((res) => {
      if (res.status === 200) {
        this.props.getNotes();
        console.log("Note restored successfully");
      }
    });
    this.props.getNotes();
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
      };
      await NoteController.editNotes(noteDetails).then((res) => {
        console.log("please check here", res);
        if (res.status === 200) {
          console.log("Note updated successfully");
          alert("please work");
        }
      });
      this.props.getNotes();
    }
  };

  changeColor = (event) => {
    this.setState({
      colorOpen: true,
      colorAnchor: event.currentTarget,
    });
  };
  changeNoteColor = async (event) => {
    event.preventDefault();
    await this.setState({
      colorOpen: false,
      color: event.target.value,
      openTooltip: false,
      hoverColorTooltip: false,
    });

    await NoteController.colornote(this.state.noteId, this.state.color).then(
      (res) => {
        if (res.status === 200) {
          console.log("Color set Successfully");
        }
      }
    );
    this.props.getNotes();
  };
  handleArchieve = async () => {
    console.log("in archive", this.state.isPinned + "   " + this.state.noteId);

    

    await NoteController.archivenote(this.state.noteId).then((res) => {
      if (res.status === 200) {
        console.log("Successfully unpinned and archived");
      }
    });
    this.props.getNotes();
  };
  handleLabelMenuOpen = () => {
    this.setState({
      labelMenu: true,
      menu: false,
      hoverMoreTooltip: true,
    });
  };

  handlePin = async () => {
    await NoteController.pinnote(this.state.noteId).then((res) => {
      if (res.data.statusCode === 200) {
        this.props.getNotes();

        console.log("Successfully unpinned and archived");
      }
    });

  };

  handleisTrashed = async () => {
    await NoteController.deletenote(this.state.noteId).then((res) => {
      if (res.data.statusCode === 200) {
        this.props.getNotes();

        console.log("Successfully trashed");
      }
    });
  };
  deleteReminder(note, key) {
    this.setState({
      reminder: "",
    });
    // removeReminder(this.state.reminder, note, key);
  }
  //   deleteLabel(note, key, index) {
  //     removeLabel(note, key, index);
  //   }
  handleDialogOpen = () => {
    this.setState({ openDialog: true });
  };
  handleDialogClose = (data) => {
    this.setState({ openDialog: false });
  };
  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  onChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onCloseDialog = async () => {
    var noteDetails = {
      noteId: this.state.noteId,
      title: this.state.title,
      description: this.state.description,
      createdtime: this.state.createdTime,
      isTrashed: this.state.trashed,
      isArchived: this.state.archieved,
      isPinned: this.state.pinned,
      color: this.state.colour,
      reminder: this.state.reminder,
      labelName: this.state.labelName,
      
    };

    await NoteController.editNotes(noteDetails).then((res) => {
      alert("inside edit");
      console.log("hiii...", res);
      if (res.status === 200) {
        console.log(res.data.message);
      }
    });
    this.props.getNotes();
    await this.setState({ openDialog: false });
  };
  render() {
     return(
      <div>
        
      {Note.addNotes.map(function(addNotes){
       return <div>
       <card>
         <h5>{addNotes.title}</h5>
       <h5>{addNotes.description}</h5>
        
         
            </card>
            console.log();
        </div>  
   } )} 
      </div>
  
     )
    if (this.state.remState !== "") {
      let date = new Date(this.state.remState);
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
      rem = remVal;
    }
    let owner = localStorage.getItem("owner");
    const label = this.state.getLabelArr.map((item) => {
      console.log("sssss");
      if (this.state.allLabels !== null) {
        if (this.state.allLabels.length !== 0) {
          for (let i = 0; i < this.state.allLabels.length; i++) {
            let bool = this.state.allLabels[i].name === item.name;
            if (bool) {
              return (
                <GetLabelsInNoteMenu
                  getLabels={this.props.getLabels}
                  getNotes={this.props.getNotes}
                  data={this.props.data}
                  item={item}
                  allLabels={this.state.allLabels}
                  tick={true}
                />
              );
            }
            if (i === this.state.allLabels.length - 1) {
              return (
                <GetLabelsInNoteMenu
                  getLabels={this.props.getLabels}
                  getNotes={this.props.getNotes}
                  data={this.props.data}
                  item={item}
                  allLabels={this.state.allLabels}
                  tick={false}
                />
              );
            }
          }
        } else {
          return (
            <GetLabelsInNoteMenu
              getLabels={this.props.getLabels}
              getNotes={this.props.getNotes}
              data={this.props.data}
              item={item}
              allLabels={this.state.allLabels}
              tick={false}
            />
          );
        }
      }
    });

    let displaylabels;
    if (this.state.allLabels !== null) {
      if (this.state.allLabels.length !== 0) {
        console.log(this.state.allLabels, "all Labels");
        displaylabels = this.state.allLabels.map((el) => {
          console.log(el.name);
          let x;
          this.state.getLabelArr.map((elem) => {
            if (elem.name === el.name) {
              x = elem.labelId;
            }
          });
          return (
            <div className="chip-style">
              <Chip
                style={{ fontSize: "10px" }}
                label={el.name}
                onDelete={async () => {
                  await LabelController.deletelabelfromnote(
                    this.props.data.noteId,
                    x
                  ).then((res) => {
                    if (res.status === 200) {
                      console.log("Label deleted for the note successfully");
                    }
                  });
                  this.props.getNotes();
                  this.props.getLabels();
                }}
                deleteIcon={
                  <Tooltip title="Remove Label" placement="top">
                    <CancelTwoToneIcon />
                  </Tooltip>
                }
              />
            </div>
          );
        });
      }
    }

    let displaycollabs = this.state.collaborators.map((item) => {
      return (
        <div className="collab-style">
          <Tooltip title={item.collaborator}>
            <Avatar
              id="avatar"
              src=" "
              onClick={this.handleCollabOpen}
            />
          </Tooltip>
        </div>
      );
    });
    let collabs;
    collabs = this.state.collaborators.map((item) => {
      return (
        <div className="collab-owner">
          <div style={{ marginLeft: "23px" }}>
            <Avatar src=" " />
          </div>
          <div style={{ marginLeft: "73px", marginTop: "-52px" }}>
            <h4>{item.email}</h4>
          </div>
          <div style={{ marginTop: "-3px" }}>
            <IconButton
              onClick={(data) => {
                console.log("collabs", item.email);

                this.handleRemoveCollab(data, item.email);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      );
    });

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
              // width:"40%",
              
            }}
            value={color.colorCode}
            onClick={this.changeNoteColor}
          />
        </Tooltip>
      );
    });

    return (
      <Card
        className={!this.props.isGrid ? "cardlist" : "gridlist"}
        style={{
          backgroundColor: this.state.color,
        }}
      >
        <div className="titleAndPin">
          <div>
            <InputBase
              className="titleNote"
              value={this.state.title}
              disabled
              onClick={this.handleDialogOpen}
            ></InputBase>
          </div>
          {!this.state.isPinned ? (
            <div>
              <IconButton
                onClick={this.handlePin}
                // onClick={(event) =>
                //   this.isPinned(event, this.props.show, this.props.index)
                // }
              >
                <img
                  src={require("../Assets/pin.svg")}
                  alt=""
                  style={{ fontSize: "16px" }}
                />
              </IconButton>
            </div>
          ) : (
            <div>
              <IconButton
                onClick={this.handlePin}
                // onClick={(event) =>
                //   this.isPinned(event, this.props.show, this.props.index)
                // }
              >
                <img
                  src={require("../Assets/fillpin.svg")}
                  alt=""
                  style={{ fontSize: "16px" }}
                />
              </IconButton>
            </div>
          )}
        </div>
        <div className="inp">
          <InputBase
            className="in"
            // readOnly={this.props.show.Description}
            value={this.state.description}
            disabled
            onClick={this.handleDialogOpen}
            // type={File}
            // onChange={(event) =>
            //   this.setState({ description: event.target.value })
            //}
            multiline={this.state.nextLine}
          ></InputBase>
        </div>

        {/* <Toolbar id="label_chip"> */}
        {this.state.remState !== null ? (
          <div className="chip-style">
            <Chip
              style={{ fontSize: "10px" }}
              icon={<AccessTimeIcon style={{ fontSize: "0px" }} />}
              label={rem}
              onDelete={this.handleReminderDelete}
            />
          </div>
        ) : null}
        {displaylabels}
        {displaycollabs}
        {/* </Toolbar> */}
        <div
          className={
            !this.props.isGrid ? "toolbarAndClose" : "toolbarAndClose2"
          }
        >
          {this.state.isTrashed ? (
            <div>
              <Tooltip title="delete forever">
                <IconButton>
                  <DeleteOutlineIcon style={{ fontSize: "16px" }} />
                </IconButton>
              </Tooltip>

              {/* <IconButton onClick={this.handleDeleteForever}>
                <DeleteForeverIcon style={{ fontSize: "16px" }} />
              </IconButton> */}
              <Tooltip title="Restore note">
                <IconButton onClick={this.handleRestoreNotes}>
                  <RestoreFromTrashIcon style={{ fontSize: "16px" }} />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <div>
              <Toolbar className="CardToolBar">
                <div className="spaceBetween">
                  <div>
                    <Tooltip title="Reminde me">
                      <IconButton
                        aria-label="Reminder"
                        onClick={this.handleReminderClick}
                      >
                        <AddAlertIcon style={{ fontSize: "16px" }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Collaborator">
                      <IconButton onClick={this.handleCollabOpen}>
                        <PersonAddIcon style={{ fontSize: "16px" }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Change color">
                      <IconButton>
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
                            // width: "113%",
                            //   marginleft:" 5%",
                          }}
                        >
                          <div className="color-align">{color1}</div>
                        </Menu>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Add image">
                      <IconButton>
                        <ImageIcon style={{ fontSize: "16px" }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="archive">
                      <IconButton onClick={this.handleArchieve}>
                        <ArchiveIcon style={{ fontSize: "16px" }} />
                      </IconButton>
                    </Tooltip>
                  </div>

                  <div>
                    <Tooltip title="more">
                      <IconButton>
                        <MoreVertIcon
                          aria-controls="fade-menu"
                          onClick={this.handleMoreOpen}
                          style={{ fontSize: "16px" }}
                        />
                        <Popover
                          open={this.state.moreopen}
                          anchorEl={this.state.labelAnchor}
                          anchorOrigin={{
                            width: "100%",
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            width: "100%",
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <MenuItem onClick={this.handleLabelMenuOpen}>
                            Add Label
                          </MenuItem>
                          <MenuItem onClick={this.handleisTrashed}>
                            Delete Note
                          </MenuItem>
                        </Popover>
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </Toolbar>
            </div>
          )}
        </div>

        <Popover
          className="labelbox"
          id="addlabel-menu"
          open={this.state.labelMenu}
          anchorEl={this.state.labelAnchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={this.handleLabelMenuClickAway}
        >
          <div className="labelNote" id="labelnote_menu">
            Label Note
          </div>
          <MenuItem>
            <Toolbar id="createlabelnote_field">
              <div style={{ display: "flex" }}>
                <div className="cancel_labeltext">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Cancel"
                    placement="left"
                    arrow
                  >
                    <IconButton aria-label="Cancel">
                      <CloseOutlinedIcon
                        style={{ fontSize: "20px" }}
                        onClick={this.handleCancel}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="input_createlabelnote">
                  <Input
                    placeholder="enter label name"
                    inputProps={{ "aria-label": "description" }}
                    spellCheck={false}
                    value={this.state.labelName}
                    onChange={this.onChangeLabelName}
                  />
                </div>
                <div className="done_icon">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Create label"
                    placement="right"
                    arrow
                  >
                    <IconButton aria-label="Create label">
                      <DoneIcon onClick={this.handleDoneClick} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Toolbar>
          </MenuItem>
          {/* {label} */}
        </Popover>

        <Dialog open={this.state.openDialog}>
          <div className="note-button">
            <Card
              id="card_decor5"
              style={{
                backgroundColor: this.state.color,
              }}
            >
              <div id="pin-inputbase">
                <InputBase
                  id="style-inpbase"
                  multiline
                  spellCheck={false}
                  placeholder="Title...."
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />

                {!this.state.isPinned ? (
                  <div className="pinunpin-align">
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      title="Pin"
                      arrow
                    >
                      <IconButton aria-label="Pin">
                        <img
                          style={{
                            height: "0.54cm",
                            width: "0.54cm",
                            opacity: "0.65",
                          }}
                          src={pin}
                          onClick={this.handleDialogPinUnpin}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <div className="pinunpin-align">
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      title="Unpin"
                      arrow
                    >
                      <IconButton aria-label="Unpin">
                        <img
                          style={{
                            height: "0.54cm",
                            width: "0.54cm",
                            opacity: "0.65",
                          }}
                          src={fillpin}
                          onClick={this.handleDialogPinUnpin}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </div>
              <div id="pin-inputbase">
                <InputBase
                  id="style-inpbase"
                  multiline
                  spellCheck={false}
                  placeholder="Description...."
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <Toolbar id="display_labels">
                {displaylabels}
                {displaycollabs}
              </Toolbar>

              <MuiThemeProvider>
                <div>
                  <Toolbar id="toolbaricons">
                    <div style={{ display: "flex" }}>
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          title="Reminder"
                          arrow
                        >
                          <IconButton
                            aria-label="Reminder"
                            className="iconButtons"
                          >
                            <AddAlertIcon style={{ fontSize: "20px" }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          title="Collaborator"
                          arrow
                        >
                          <IconButton
                            aria-label="Collaborator"
                            onClick={this.handleCollabOpen}
                          >
                            <PersonAddIcon style={{ fontSize: "20px" }} />
                          </IconButton>
                        </Tooltip>
                      </div>

                      <div>
                        {this.state.fromArchive ? (
                          <Tooltip
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 100 }}
                            title="Unarchive"
                            arrow
                          >
                            <IconButton aria-label="Unarchive">
                              <UnarchiveOutlinedIcon
                                style={{ fontSize: "20px" }}
                                onClick={this.handleIsUnArchived}
                              />
                              <Snackbar
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                open={this.state.open}
                                autoHideDuration={4000}
                                onClose={this.handleClose}
                                message={this.state.archivemsg}
                                action={
                                  <React.Fragment>
                                    <div>
                                      <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={this.handleClose}
                                      >
                                        <CloseIcon fontSize="small" />
                                      </IconButton>
                                    </div>
                                  </React.Fragment>
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 100 }}
                            title="Archive"
                            arrow
                          >
                            <IconButton aria-label="Archive">
                              <ArchiveIcon
                                style={{ fontSize: "20px" }}
                                onClick={this.handleIsArchived}
                              />
                              <Snackbar
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                open={this.state.open}
                                // autoHideDuration={4000}
                                onClose={this.handleClose}
                                message={this.state.archivemsg}
                                action={
                                  <React.Fragment>
                                    <div>
                                      <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={this.handleClose}
                                      >
                                        <CloseIcon fontSize="small" />
                                      </IconButton>
                                    </div>
                                  </React.Fragment>
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 100 }}
                          title="Color"
                          disableHoverListener={this.state.hoverColorTooltip}
                          arrow
                        >
                          <IconButton aria-label="Color">
                            <PaletteIcon
                              style={{ fontSize: "20px" }}
                              onClick={this.changeColor}
                            />
                            <Menu
                              id="simple-menu"
                              open={this.state.colorOpen}
                              anchorEl={this.state.colorAnchor}
                              onClose={this.closeColorBox}
                              transformOrigin={{
                                vertical: "right",
                                horizontal: "right",
                              }}
                            >
                              <div id="color-align">{color1}</div>
                            </Menu>
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 1000 }}
                          title="More"
                          disableHoverListener={this.state.hoverMoreTooltip}
                          arrow
                        >
                          <IconButton aria-label="More">
                            <MoreVertIcon
                              style={{ fontSize: "20px" }}
                              onClick={this.changeLabel}
                            />
                            <div>
                              <Popover
                                id="label-menu"
                                open={this.state.menu}
                                anchorEl={this.state.labelAnchor}
                                onClick={this.handleMenuClickAway}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                >
                              
                                <MenuItem onClick={this.handleLabelMenuOpen}>
                                  Add label
                                </MenuItem>
                                <MenuItem onClick={this.handleDeleteNote}>
                                  Delete note
                                </MenuItem>
                              </Popover>
                            </div>
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <div id="close_button">
                      <Tooltip
                        // TransitionComponent={Fade}
                        TransitionProps={{ timeout: 100 }}
                        // title={saveclose}
                        arrow
                      >
                        <Button onClick={this.onCloseDialog}>close</Button>
                      </Tooltip>
                    </div>
                  </Toolbar>
                </div>
              </MuiThemeProvider>
            </Card>
          </div>
        </Dialog>
        <Dialog open={this.state.collabOpen}>
          <Card className="card_decor_collab">
            
            <Toolbar>
              <h3>Collaborators</h3>
            </Toolbar>
            <Divider />
            <div className="collab-owner">
              <div style={{ marginLeft: "23px", marginTop: "20px" }}>
                <Avatar src={this.state.profilePicture} />
              </div>
              <div style={{ marginLeft: "76px", marginTop: "-50px" }}>
                <h4>{owner}(owner)</h4>
              </div>
            </div>
            {collabs}
            <div className="collab-new">
              <div>
                <IconButton>
                  <PersonAddTwoToneIcon fontSize="15px" />
                </IconButton>
              </div>
              <div
                className="collabEmail"
                style={{
                  paddingTop: "6px",
                  marginLeft: "40px",
                  marginTop: "-40px",
                }}
              >
                <Input
                  required="true"
                  error={this.state.err1}
                  placeholder="Email to share with"
                  spellCheck={false}
                  value={this.state.collabName}
                  onChange={this.onChangeCollabName}
                  helperText={this.helpercollabmethod()}
                />
              </div>
              <div className="done">
                <IconButton disabled={this.state.disable}>
                  <DoneIcon onClick={this.handleCollabDoneClick} />
                </IconButton>
              </div>
            </div>
            <Divider />
            <div className="collab-cancelsavebutton">
              <div style={{ marginRight: "5%" }}>
                <Button variant="contained" onClick={this.handleCollabCancel}>
                  Cancel
                </Button>
              </div>
              <div>
                <Button variant="contained" onClick={this.handleCollabSave}>
                  Save
                </Button>
              </div>
            </div>
          </Card>
        </Dialog>
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
            </Toolbar>
            <Toolbar id="createlabelnote_field">
              <div className="rem-save">
                <Button onClick={this.handleSaveReminder}>save</Button>
              </div>
            </Toolbar>
          </Card>
        </Popover>
      </Card>
    );
  }
}

export default GetNotes;
