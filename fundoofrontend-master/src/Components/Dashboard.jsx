import React, { Component } from "react";
import NoteController from "../Controller/NoteController";
import Header from "../Components/Header";
import SideDrawer from "../Components/SideDrawer";
import CreateNote from "./CreateNote";
import NoteList from "../Components/NoteList";
import "../App.css";
import {
  getUserLabel,
  addUserLabel,
  deleteLabel,
  editLabel
} from "../Controller/labelController";
import { Toast } from "react-bootstrap";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [],
      descriptions: [],
      title: "",
      description: "",
      notelist: [],
      openNote: false,
      addReminder: false,
      editLabel: false,
      archive: false,
      trash: false,
      active: true,
      reminder: false,
      labels: [],
      sidenav: false,
      edit: false,
      addLabel: "",
      listView: "col-",
      viewText: "List View",
      viewIcon: "list",
      visible: true,
      toastShow:false,
      toastText:""
    };
    this.handleSideBar = this.handleSideBar.bind(this);
  }
  activateToast = (text) =>{
    this.setState({toastShow:true,toastText:text});
  } 
  deActivateToast = () =>{
    this.setState({toastShow:false,toastText:""});
  } 
  handleSideBar() {
    this.setState(prev => ({ visible: !prev.visible }));
  }

  handleSideNav = () => {
    console.log("hidden");
    this.setState({ sidenav: !this.state.sidenav });
  };

  handleActive = () => {
    this.setState({ active: true, archive: false, trash: false });
  };
  /*-------Reminder--------*/
  handleReminder = () => {
    this.setState({
      active: false,
      archive: false,
      trash: false,
      reminder: false
    });
  };
  /*-------Archive---------*/
  handleArchive = () => {
    this.setState({ active: false, archive: true, trash: false });
  };

  /*-------Trash--------*/
  handleTrash = () => {
    this.setState({ active: false, archive: false, trash: true });
  };
  /*-----Edit Label---------*/
  onClickEditLabel = () => {
    this.setState({ editLabel: !this.state.editLabel });
  };
  /*-----Add Reminder---------*/
  onClickReminderIcon = () => {
    this.setState({ addReminder: true });
  };
  handleClickOpen = () => {
    this.setState({
      openNote: true
    });
  };
  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };
  onClose = e => {
    e.preventDefault();
    if (this.state.title === "" && this.state.description === "") {
      this.setState({ openNote: false });
    } else {
      const notes = {
        title: this.state.title,
        description: this.state.description
      };
      NoteController.createNote(notes)
        .then(response => {
          this.setState({
            notelist: [notes, ...this.state.notelist],
            title: "",
            description: "",
            createNote: true,
            openNote: false
          });
        })
        .catch(err => {
          console.log("error", err.response.data);
        });
    }
  };

  componentDidMount() {
    getUserLabel()
      .then(response => {
        console.log("LABEl :", response.data.obj);
        this.setState({ labels: response.data.obj });
      })
      .catch(error => {
        console.log("No Data Found", error.response.data.message);
      });
    this.getAllNotes();
  }
  getAllNotes = () => {
    NoteController.allNotes().then(response => {
      console.log(response.data.obj);
      this.setState({ notelist: response.data.obj.reverse() });
    });
  };
  /* Add Label to the user*/
  addLabelList = labelName => {
    addUserLabel(labelName)
      .then(response => {
        this.setState({ labels: [...this.state.labels, response.data.obj] });
      })
      .catch(error => {
        console.log("Error :", error.response.data.message);
      });
  };

  removeLabel = labelId => {
    if (window.confirm("Are you sure? label will be permanently deleted")) {
      deleteLabel(labelId).then(response => {
        this.setState({
          labels: this.state.labels.filter(l => labelId !== l.labelId)
        });
        this.getAllNotes();
      });
    }
  };

  editLabel = (labelId, labelName) => {
    const labelInfo = {
      labelId: labelId,
      name: labelName
    };
    editLabel(labelInfo)
      .then(response => {
        console.log(response.data.obj);
        this.setState({
          labels: this.state.labels.map(el =>
            el.labelId === labelId ? { ...el, name: labelInfo.name } : el
          )
        });
      })
      .catch(error => {
        console.log(error.data.message);
      });
  };
  /* Change View (List or Grid) */
  changeView = () => {
    console.log("View", this.state.viewIcon);
    if (this.state.viewIcon !== "grid_on") {
      this.setState({ viewIcon: "grid_on", viewText: "Grid View" });
      this.setState({ listView: "col-12" });
    } else {
      this.setState({ viewIcon: "list", viewText: "List View" });
      this.setState({ listView: "col-" });
    }
  };
  render() {
    return (
      <div className="App">
        <div className="">
          <div className="new-nav">
            <Header
              handleSideNav={this.handleSideNav}
              text={this.state.viewText}
              handleView={this.changeView}
              icon={this.state.viewIcon}
              handleSideBar={this.handleSideBar}
            />
          </div>
        </div>
        <div className="side-main">
          <div
            id="my-navbar"
            className={this.state.visible ? "slideIn" : "slideOut"}
          >
            <div className="side-bar-content">
              <SideDrawer
                onClickArchive={this.handleArchive}
                onClickTrash={this.handleTrash}
                onClickActive={this.handleActive}
                onClickReminder={this.handleReminder}
                labels={this.state.labels}
                hidden={this.state.sidenav}
                addLabelList={this.addLabelList}
                removeLabel={this.removeLabel}
                visible={this.state.visible}
                editLabel={this.editLabel}
              />
            </div>
          </div>
          <div className="content-main">
            {this.state.active ? (
              <div className="note-create">
                <div className="note-create-content">
                  <CreateNote
                    title={this.state.title}
                    description={this.state.description}
                    openNote={this.state.openNote}
                    handleClickOpen={this.handleClickOpen}
                    onChangeTitle={this.onChangeTitle}
                    onChangeDescription={this.onChangeDescription}
                    onClose={this.onClose}
                    labels={this.state.labels}
                    getAllNotes={this.props.getAllNotes}
                    notelist={this.state.notelist}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="notelist">
              <div className="notelist-content">
                <NoteList
                  status={{
                    active: this.state.active,
                    archive: this.state.archive,
                    trash: this.state.trash,
                    reminder: this.state.reminder
                  }}
                  addReminder={this.state.addReminder}
                  onClickReminderIcon={this.onClickReminderIcon}
                  list={this.state.listView}
                  labels={this.state.labels}
                  notelist={this.state.notelist}
                  getAllNotes={this.getAllNotes}
                  activateToast={this.activateToast}
                />
              </div>
            </div>
          </div>
        </div>
        <Toast
          show={this.state.toastShow}
          onClose={this.deActivateToast}
          className="fixed-bottom"
          style={{ right: "auto" }}
          autohide
        >
          <Toast.Header className="bg-dark text-white">
            <strong className="mr-2">{this.state.toastText}</strong>
          </Toast.Header>
        </Toast>
      </div>
    );
  }
}
