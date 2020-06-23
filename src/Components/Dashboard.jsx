import React, { Component } from "react";
import {
  SwipeableDrawer,
  List,
  createMuiTheme,
  MuiThemeProvider,
  MenuItem,
  Divider,
} from "@material-ui/core";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import NoteController from "../Controller/NoteController";
import UserController from "../Controller/UserController";
import LabelController from "../Controller/LabelController";
// import BorderColorIcon from "@material-ui/icons/BorderColorOutlined";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
//import EditSharpIcon from "@material-ui/icons/EditSharp";
import Header from "./Header.jsx";
import { flex } from '@material-ui/system';
import SearchComponent from "./SearchComponent.jsx";
import MenuNotes from "./MenuNotes.jsx";
import ArchieveMenu from "./ArchieveMenu";
import TakeNote from "./TakeNote";
import ReminderMenu from "./ReminderMenu";
import TrashMenu from "./TrashMenu";
import LabelMenu from "./LabelMenu";
import EditLabelsMenu from "./EditLabelsMenu";
import GetNotes from "./GetNotes";
import edit from "../Assets/edit.svg";

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        display: flex,

        left: 0,
        top: "65px",
        right: "auto",
      },
    },
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: true,
      reminder: false,
      editLabel: false,
      archieveMenu: false,
      trash: false,
      sideOpen: true,
      getNoteArr: [],
      getLabelArr: [],
      searchNotesArr: [],
      archieveMenu: false,
      reminderMenu: false,
      editlabelsOpen: false,
      isGrid: false,
      profileLink: null,
      profileOpen: false,
      searchOpen: false,
      searchListOpen: false,
    };
  }

  componentDidMount() {
    this.getProfileLink();
    this.getNotes();
    this.getLabels();
  }
  handleIsGrid = (data) => {
    this.setState({
      isGrid: data,
    });
    console.log(data);
  };

  handleProfileOpen = (data) => {
    this.setState({
      profileOpen: data,
    });
  };

  getNotes = async () => {
    await NoteController.getAllNotes().then((res) => {
      if (res.data.statusCode === 200) {
        this.setState({
          getNoteArr: res.data.data,
        });
      }
    });
    console.log("notes are:", this.state.getNoteArr);
  };

  Collaborator = async () => {
    await NoteController.getAllNotes().then((res) => {
      if (res.data.statusCode === 200) {
        this.setState({
          getNoteArr: res.data.data,
        });
      }
    });
    console.log("notes are:", this.state.getNoteArr);
  };

  getProfileLink = () => {
    NoteController.getprofilelink().then((res) => {
      if (res.data.statusCode === 200) {
        this.setState({
          profileLink: res.data.message,
        });
      }
    });
    console.log("link is:", this.state.profileLink);
  };

  getLabels = () => {
    LabelController.getAllLabels().then((res) => {
      console.log("inside label controller");
      if (res.data.statusCode === 200) {
        this.setState({
          getLabelArr: res.data.data,
        });
      }
    });
    console.log("Labels are:", this.state.getLabelArr);
  };
  handleSideOpen = async () => {
    this.setState({
      sideOpen: !this.state.sideOpen,
    });
  };
  handleMenuNotes = async () => {
    this.setState({
      notes: true,
      reminder: false,
      editLabel: false,
      archieveMenu: false,
      trash: false,
      editlabelsOpen: false,
      searchOpen: false,
    });
  };

  handleArchieveNotes = async () => {
    await this.setState({
      notes: false,
      reminder: false,
      editLabel: false,
      archieveMenu: true,
      trash: false,
      editlabelsOpen: false,
      searchOpen: false,
    });
    console.log("arc state", this.state.archieveMenu);
  };
  handleReminderNotes = async () => {
    await this.setState({
      notes: false,
      reminder: false,
      editLabel: false,
      archieveMenu: false,
      trash: false,
      reminderMenu: true,
      editlabelsOpen: false,
      searchOpen: false,
    });
    console.log("arc state", this.state.archieveMenu);
  };
  handleEditLabelsMenu = async () => {
    await this.setState({
      editlabelsOpen: !this.state.editlabelsOpen,
      openDialog: !this.state.openDialog,
      searchOpen: false,
    });
  };
  handleTrashNotes = async () => {
    await this.setState({
      notes: false,
      reminder: false,
      editLabel: false,
      archieveMenu: false,
      trash: true,
      editlabelsOpen: false,
      searchOpen: false,
    });
    console.log("arc state", this.state.trash);
  };
  onChangeSearchInput = async (event) => {
    await this.setState({
      searchBy: event.target.value,
    });

    if (this.state.searchBy !== "") {
      await NoteController.searchbytitledescription(this.state.searchBy).then(
        (res) => {
          this.setState({ searchNotesArr: res });
          console.log("The serch Arr :", this.state.searchNotesArr);
          if (this.state.searchNotesArr.length !== 0) {
            this.setState({
              searchOpen: true,
              notes: false,
              reminder: false,
              editLabel: false,
              archieveMenu: false,
              trash: false,
              reminderMenu: false,
              editlabelsOpen: false,
            });
          } else if (this.state.searchNotesArr.length === 0) {
          }
        }
      );
    } else {
      if (this.state.searchBy === "") {
        await this.setState({
          searchOpen: true,
          notes: false,
          reminder: false,
          editLabel: false,
          archieveMenu: false,
          trash: false,
          reminderMenu: false,
          editlabelsOpen: false,
        });
      }
    }
  };

  render() {
    let userLabels = this.state.getLabelArr.map((items) => {
      return (
        <div>
          <MenuItem>
            <div>
              <LabelOutlinedIcon />
              {/* <img src={require("../Assets/edit.svg")} alt="" /> */}
            </div>
            <div className="sidefont">
              <span>{items.name}</span>
            </div>
          </MenuItem>
        </div>
      );
    });

    return (
      <div>
        <Header
          handleSideOpen={this.handleSideOpen}
          handleIsGrid={this.handleIsGrid}
          handleProfileOpen={this.handleProfileOpen}
          profileLink={this.state.profileLink}
          getProfilePic={this.getProfileLink}
          onChangeSearchInput={this.onChangeSearchInput}
          searchOpen={this.state.searchOpen}
        />
        <SearchComponent
          searchOpen={this.state.searchOpen}
          searchNotesArr={this.state.searchNotesArr}
          getNoteArr={this.state.getNoteArr}
          getNotes={this.getNotes}
          getLabels={this.getLabels}
          getLabelArr={this.state.getLabelArr}
        />
        <MenuNotes
          notes={this.state.notes}
          getNoteArr={this.state.getNoteArr}
          getLabelArr={this.state.getLabelArr}
          getNotes={this.getNotes}
          getLabels={this.getLabels}
          isGrid={this.state.isGrid}
        />

        <ArchieveMenu
          archieveMenu={this.state.archieveMenu}
          getNoteArr={this.state.getNoteArr}
          getLabelArr={this.state.getLabelArr}
          getNotes={this.getNotes}
          getLabels={this.getLabels}
          isGrid={this.state.isGrid}
        />
        <EditLabelsMenu
          editlabelsOpen={this.state.editlabelsOpen}
          open={this.state.open}
          openDialog={this.state.openDialog}
          handleEditLabelsMenu={this.handleEditLabelsMenu}
          getLabelArr={this.state.getLabelArr}
          getLabels={this.getLabels}
          getNotes={this.getNotes}
          isGrid={this.state.isGrid}
        />

        <TrashMenu
          trash={this.state.trash}
          getNoteArr={this.state.getNoteArr}
          getLabelArr={this.state.getLabelArr}
          getNotes={this.getNotes}
          getLabels={this.getLabels}
          isGrid={this.state.isGrid}
        />
        <ReminderMenu
          reminderMenu={this.state.reminderMenu}
          getNoteArr={this.state.getNoteArr}
          getLabelArr={this.state.getLabelArr}
          getNotes={this.getNotes}
          getLabels={this.getLabels}
          isGrid={this.state.isGrid}
        />
        <LabelMenu
          getNoteArr={this.state.getNoteArr}
          name={this.state.name}
          labelNoteOpen={this.state.labelNoteOpen}
          getNotes={this.getNotes}
          getLabels={this.getLabels}
          getLabelArr={this.state.getLabelArr}
          open={this.state.open}
          view={this.state.view}
          handleLabelNoteMenu={this.handleLabelNoteMenu}
          isGrid={this.state.isGrid}
        />

        <MuiThemeProvider theme={theme}>
          <SwipeableDrawer
            className="list"
            anchor={"left"}
            variant="persistent"
            open={this.state.sideOpen}
          >
            <List className="list">
              <div className="note">
                <MenuItem onClick={this.handleMenuNotes}>
                  <div>
                    <EmojiObjectsIcon></EmojiObjectsIcon>
                  </div>
                  <div className="sidefont">Notes</div>
                </MenuItem>
              </div>
              <div>
                <MenuItem onClick={this.handleReminderNotes}>
                  <div>
                    <NotificationsIcon></NotificationsIcon>
                  </div>
                  <div className="sidefont">Reminders</div>
                </MenuItem>
              </div>
              <div className="labels">
                <div className="lbl">{userLabels}</div>

                <MenuItem onClick={this.handleEditLabelsMenu}>
                  <div>
                    {/* <EditSharpIcon></EditSharpIcon> */}
                    <img src={require("../Assets/edit.svg")} alt="" />
                  </div>
                  <div className="sidefont">Edit labels</div>
                </MenuItem>
              </div>
              {/* <Divider></Divider> */}
              <div className="note">
                <MenuItem onClick={this.handleArchieveNotes}>
                  <div>
                    <ArchiveIcon />
                  </div>
                  <div className="sidefont">Archive</div>
                </MenuItem>
              </div>
              <MenuItem onClick={this.handleTrashNotes}>
                <div>
                  <DeleteIcon></DeleteIcon>
                </div>
                <div className="sidefont">Trash</div>
              </MenuItem>
            </List>
          </SwipeableDrawer>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Dashboard;
