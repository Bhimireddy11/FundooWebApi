import React, { Component, Fragment } from "react";
import "../App.css";
import { Card } from "react-bootstrap";
import Icon from "./Icon";

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        noteId: 0,
        title: "",
        description: "",
        colour: "white",
        reminder: null,
        pin: false,
        trash: false,
        archiev: false,
        colabList:[]
      }
    };
  }
  render() {
    const {
      title,
      description,
      onChangeTitle,
      onChangeDescription,
      onClose,
      handleClickOpen,
      openNote
    } = this.props;
    return (
      <Fragment>
        <div style={{ margin: "0px 22%" }}>
          {!openNote ? (
            <Card style={{ borderRadius: "8px" }}>
              <input
                spellCheck={true}
                placeholder="Take a note...."
                onClick={handleClickOpen}
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  outline: "none",
                  border: "none",
                  fontSize: "18px",
                  paddingLeft: "8px"
                }}
              />
            </Card>
          ) : (
            <Card>
              <input
                name="title"
                className=""
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  outline: "none",
                  border: "none",
                  fontSize: "20px",
                  paddingLeft: "8px"
                }}
                placeholder="Tittle...."
                value={title}
                onChange={onChangeTitle}
              />
              <input
                name="description"
                className=""
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  outline: "none",
                  border: "none",
                  fontSize: "18px",
                  paddingLeft: "8px"
                }}
                multiline="true"
                placeholder="Take a note...."
                value={description}
                onChange={onChangeDescription}
              />

              <div>
                <div className="button-icon">
                  <Icon
                    note={this.state.note}
                    labels={this.props.labels}
                    getAllNotes={this.props.getAllNotes}
                    activateToast={this.props.activateToast}
                  />
                  <button
                    className="float-right"
                    variant="light"
                    onClick={onClose}
                    style={{
                      background: "none",
                      fontWeight: "bold",
                      outline: "none",
                      border: "none"
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Fragment>
    );
  }
}
export default CreateNote;
