import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "../Collaborator.css";
import { updateCollaborator } from "../Controller/collaborator";

export default function CollaboratorModal(props) {
  const [emailId] = useState(localStorage.getItem("emailId"));
  const [email, setEmail] = useState("");
  const [updateColab, setUpdateColab] = useState({
    newEmail: [],
    noteId: 0,
    removeEmail: []
  }); 
  const [cList, setCList] = useState(props.collaboratorList);

  const addCollaborator = e => {
    e.preventDefault();
    console.log(email);
    if (!cList.includes(email)) {
      setCList([...cList, email]);
      setUpdateColab({
        ...updateColab,
        newEmail: updateColab.newEmail.concat([email]),
        noteId: props.noteId
      });
      console.log(updateColab.newEmail.concat([email]));
    }
    setEmail("");
  };
  const removeCollaborator = colab => {
    setCList(
      cList.filter(emailId => {
        return emailId !== colab;
      })
    );
    setUpdateColab({
      ...updateColab,
      removeEmail: updateColab.removeEmail.concat([colab]),
      noteId: props.noteId
    });
  };

  const saveColab = () => {
    if (updateColab.noteId !== 0) {
      updateCollaborator(updateColab)
        .then(() => {
          props.getAllNotes();
          setUpdateColab({ newEmail: [], noteId: 0, removeEmail: [] });
        })
        .catch(error => {
          alert("false");
          console.log(error.response);
        });
    }
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <div className="colab-wrapper">
        <div className="colab-header">
          <div className="colab-header-item">Collaborators</div>
          <div className="colab-content">
            <div className="colab-content-header">
              <div style={{ fontSize: "13px" }}>
                <div style={{ display: "flex", padding: "5px" }}>
                  <div className="colab-owner">
                    <div className="colab-owner-content">
                      <img
                        src=" "
                        alt="logo"
                        style={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px"
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ margin: "0 13px" }}>
                    <div>
                      <span style={{ fontWeight: 700 }}>raji bhimireddy</span>
                      <span style={{ fontStyle: "italic", marginLeft: "5px" }}>
                        (Owner)
                      </span>
                    </div>
                    <div style={{ color: "#5f6368" }}>{emailId}</div>
                  </div>
                </div>
              </div>
              {cList.map((colabEmail, id) => (
                <div key={id} style={{ fontSize: "13px" }}>
                  <div style={{ display: "flex", padding: "5px" }}>
                    <div className="colab-owner">
                      <div className="colab-owner-content">
                        <img
                          src="../keep.png"
                          alt="logo"
                          width="40px"
                          height="40px"
                        />
                      </div>
                    </div>
                    <div
                      className="w-75"
                      style={{
                        margin: "0 13px",
                        display: "flex",
                        fontSize: "16px"
                      }}
                    >
                      <div
                        style={{ color: "#5f6368", flex: 1, marginTop: "10px" }}
                      >
                        {colabEmail}
                      </div>
                      <div
                        className="float-right"
                        style={{ marginTop: "10px" }}
                      >
                        <i
                          className="fa fa-times"
                          aria-hidden="true"
                          onClick={() => removeCollaborator(colabEmail)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Form onSubmit={addCollaborator}>
                <div style={{ fontSize: "13px" }}>
                  <div style={{ display: "flex", padding: "5px" }}>
                    <div className="colab-owner">
                      <div className="colab-owner-content">
                        <i
                          className="fa fa-user-plus colab-user-plus"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                    <div
                      className="w-75"
                      style={{ margin: "0 13px", display: "flex" }}
                    >
                      <div style={{ color: "#5f6368", flex: 1 }}>
                        <input
                          className="colab-input"
                          type="email"
                          placeholder="Person or email to share with"
                          maxLength="320"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          pattern={
                            "^[a-zA-z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$"
                          }
                          required
                        />
                      </div>
                      <div>
                        <i
                          className="fa fa-check"
                          aria-hidden="true"
                          onClick={addCollaborator}
                          style={{ cursor: "pointer", marginTop: "15px" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="colab-footer"
        style={{
          background: "lightgray",
          display: "flex",
          flexDirection: "row-reverse"
        }}
      >
        <div className="colab-footer-content" style={{ padding: "10px" }}>
          <Button variant="light" className="mr-2" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="light" onClick={saveColab}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );

      }
