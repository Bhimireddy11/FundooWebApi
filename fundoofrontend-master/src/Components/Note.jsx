import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";
import NoteController from "../Controller/NoteController";
import ModalBox from "./ModalBox";
import Icon from "./Icon";
import MyTag from "./myTag";
import { IoMdTime } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { deleteCollaborator } from "../Controller/collaborator";
import { removeLabelFromNote } from "../Controller/labelController";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: false,
      //iconShow: false,
      isPinned: false,
      show: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleClick() {
    this.setState(oldState => ({ condition: !oldState.condition }));
  }

  handleTrash = () => {
    NoteController.deleteNote(this.props.fnote.noteId)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.log(error.data.message);
      });
  };

  handleCollaborator = (email, noteId) => {
    deleteCollaborator({ email, noteId })
      .then(() => {
        this.props.getAllNotes();
        this.props.activateToast("Collabarator Deleted");
      })
      .catch(e => console.log(e.response));
  };
  handleRemoveLabel = (noteId, labelText) => {
    removeLabelFromNote({ noteId, labelText })
      .then(() => {
        this.props.getAllNotes();
        this.props.activateToast("Label Deleted");
      })
      .catch(e => console.log(e.response));
  };
  render() {
    return (
      <Fragment>
        <Fragment>
          <Card
            className={"shadow-sm mr-2 mb-10" + this.props.list}
            style={{
              width: "15rem",
              borderRadius: "7px",
              marginBottom: "10px",
              backgroundColor: this.props.fnote.colour
            }}
          >
            <Card.Body>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }} onClick={this.handleShow}>
                  {this.props.fnote.title}
                </div>
                <div className="pin-icon">
                  <i
                    className="fa fa-thumb-tack"
                    aria-hidden="true"
                    onClick={this.props.onPinClick}
                  ></i>
                </div>
              </div>
              <div onClick={this.handleShow}>
                {this.props.fnote.description}
              </div>
              <div className="row ml-1 p-2 w-100">
                {this.props.fnote.reminder !== null &&
                this.props.fnote.reminder !== "" ? (
                  <MyTag
                    icon={<IoMdTime />}
                    id={"reminder" + this.props.fnote.noteId}
                    data={
                      this.props.fnote.reminder !== null
                        ? this.props.fnote.reminder
                        : ""
                    }
                    handleCloseIcon={this.props.handleReminder}
                  />
                ) : (
                  ""
                )}
                {this.props.fnote.colabList.map((colabEmail, id) => (
                  <MyTag
                    icon={<MdAccountCircle />}
                    id={"colab" + this.props.fnote.noteId + id}
                    key={"colab" + this.props.fnote.noteId + id}
                    data={colabEmail}
                    handleCloseIcon={() =>
                      this.handleCollaborator(
                        colabEmail,
                        this.props.fnote.noteId
                      )
                    }
                  />
                ))}
                {this.props.fnote.labelList.map((label, id) => (
                  <MyTag
                    icon={<MdAccountCircle />}
                    id={"label" + this.props.fnote.noteId + id}
                    key={"label" + this.props.fnote.noteId + id}
                    data={label}
                    handleCloseIcon={() =>
                      this.handleRemoveLabel(this.props.fnote.noteId, label)
                    }
                  />
                ))}
              </div>
              <div style={{ marginTop: "30px" }}>
                <Icon
                  handleClick={this.handleClick}
                  handleArchive={this.props.handleArchive}
                  handleTrash={this.props.handleTrash}
                  addReminder={this.props.addReminder}
                  addColor={this.props.addColor}
                  note={this.props.fnote}
                  labels={this.props.labels}
                  getAllNotes={this.props.getAllNotes}
                  trashStatus={this.props.trashStatus}
                />
              </div>
            </Card.Body>
          </Card>
        </Fragment>
        <ModalBox
          show={this.state.show}
          onHide={this.handleClose}
          note={this.props.fnote}
          labels={this.props.labels}
          getAllNotes={this.props.getAllNotes}
        />
      </Fragment>
    );
  }
}
export default Note;
