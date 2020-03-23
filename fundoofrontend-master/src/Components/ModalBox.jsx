import React, { useState } from "react";
import { Card, Modal} from "react-bootstrap";
import Icon from "./Icon";
import NoteController from "../Controller/NoteController";

export default function ModalBox(props) {
  const [note, setNote] = useState(props.note); 
  //console.log("modal :" + note);

  const changeValues = e => {
    setNote({...note, [e.target.name]: e.target.value})
  };
 const handleSubmit = () => {
    //console.log('Calling... :'+note.title+" ,"+note.description);
    var noteInfo = {
      title: note.title,
      description: note.description,
      noteId: note.noteId
    } 
    NoteController.updateNote(noteInfo).then(response =>{
      console.log("Message :",response.data)
      props.onHide();
    props.getAllNotes();
    })
    .catch(error => { 
      console.log("Message :",error.data.mesage)
    })
    
  }
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <div style={{ borderRadius: "6px" }}>
        <Card style={{ width: "100%" }}>
          <div style={{ padding: "13px" }}>
            <div style={{ fontSize: "1.375rem", lineHeight: "1.75rem" }}>
              <div
                style={{
                  display: "flex",
                  paddingBottom: "12px",
                  paddingTop: "5px"
                }}
              >
                <div style={{ flex: 1, outline: "none" }}>
                  <input
                    type="text"
                    name={"title"}
                    value={note.title}
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none"
                    }}
                    onChange={changeValues}
                  />
                </div>
                <div>
                  <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                </div>
              </div>

              <div style={{ outline: "none" }}>
                <input
                  type="text"
                  name={"description"}
                  value={note.description}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none"
                  }}
                  onChange={changeValues}
                />
              </div>
            </div>
            <div className="icon-component" style={{ marginTop: "50px" }}>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <Icon labels={props.labels} note={props.note} />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <button
                    type="button"
                    style={{ border: "none", background: "none" }}
                    onClick={handleSubmit}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
}
