import React, { useState, useEffect } from "react";
import { Dropdown, Form, Row} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import NoteController from "../Controller/NoteController";
import CollaboratorModal from "./collaboratorModal";
import { getCollaboratorList } from "../Controller/collaborator";
import { MdColorLens, MdDone } from "react-icons/md";
import { mapLabelwithNote } from "../Controller/labelController";

export default function Icon(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState({});
  const [allLabels, setAllLabels] = useState([]);
  const [colabShow, setColabShow] = useState(false);
  const [collaboratorList, setCollaboratorList] = useState([]);
  const colors = [
    "white",
    "#ffcdd2",
    "#ffe0b2",
    "#fff59d",
    "#e6ee9c",
    "#e1f5fe",
    "#d7ccc8",
    "#e1bee7",
    "#f1f8e9"
  ];
  useEffect(() => {
    // getCollaboratorList(props.note.noteId)
    //   .then(response => {
    //     //console.log("MESSAGE :", response.data.obj);
    //     setCollaboratorList(response.data.obj);
    //   })
    //   .catch(error => {
    //     console.log("ERROR :", error.response.data.message);
    //   });
     setNote(props.note);
    //console.log(props.note);
    setAllLabels(props.labels.map(lbl => {
      return lbl.name;
    }));
  }, []);

  const handleColabShow = () => {
    getCollaboratorList(props.note.noteId)
      .then(response => {
        console.log("MESSAGE :", response.data.obj);
        setCollaboratorList(response.data.obj);
      })
      .catch(error => {
        console.log("ERROR :", error.response.data.message);
      });
    setColabShow(true);
  };
  const handleColabClose = () => setColabShow(false);

  const handleDateChange = e => {
    setDate(e.target.value);
  };
  const handleTimeChange = e => {
    setTime(e.target.value);
  };
  const onSubmit = noteID => {
    var reminder = {
      datetime: date + " " + time,
      noteId: note.noteId
    };
    setDate("");
    setTime("");
    NoteController.setReminder(reminder)
      .then(response => {
        console.log("RESPONSE :", response.data.message);
        props.addReminder(response.data.obj);
      })
      .catch(error => {
        console.log("ERROR" + error.data.message);
      });
  };

  const colorChange = clr => {
    // console.log("Color :"+clr);
     //console.log("axios",note);
    // setNote({...note,colour:clr})
    const colorInfo = {
      color: clr,
      noteId: note.noteId
    };
    NoteController.addColour(colorInfo)
      .then(response => {
        console.log("Response :", response.data.obj);
        props.addColor(response.data.obj);
        setNote(response.data.obj);
      })
      .catch(error => {
        console.log("Error :", error.data.message);
      });
  };

  const mapLabel = (labels) =>{
    labels.map(labelName => {
      if(!note.labelList.includes(labelName)){
        let noteId=note.noteId;
        mapLabelwithNote({labelName,noteId}).then(props.getAllNotes).catch(e =>console.log(e.response))
      }
    });
    setNote({...note,labelList:labels});
  }

  const deletePermanently = (noteId) =>{
    console.log("Note ID :",noteId);
    NoteController.permanentDelete(noteId).then(props.getAllNotes).catch(err => console.log(err.response))
  }
  return (
    <div className="icon-list">
      {
        props.trashStatus ?
        <div style={{display:'flex'}}>
        <img src="images/delete_forever.svg" alt="Delete" onClick={() =>deletePermanently(note.noteId)}/>
        <img src="images/delete-restore.svg" alt="Restore" style={{paddingLeft:'20px'}}/>
        </div>
        :
        <div className="icon-list">
          <Dropdown>
        <Dropdown.Toggle
          bsPrefix="dropdown"
          style={{ background: "none", border: "none" }}
        >
          <i
            className="fa fa-bell"
            title="Remind me"
            aria-hidden="true"
            // onClick={props.onClickReminderIcon}
            style={{ color: "black" }}
          ></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="reminder-div">
            <div className="reminder-header">Reminder:</div>
            <div style={{ marginTop: "17px" }}>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                required
                className="reminder-input"
              />
            </div>
            <div style={{ background: "#dadce0", height: "1px" }}></div>
            {/* <small style={{ color: "red" }}>{this.state.dateErr}</small> */}
            <div style={{ marginTop: "15px" }}>
              <input
                type="time"
                value={time}
                onChange={handleTimeChange}
                required
                className="reminder-input"
              />
            </div>
            <div style={{ background: "#dadce0", height: "1px" }}></div>
          </div>
          {/* <small style={{ color: "red" }}>{this.state.timeErr}</small> */}

          <button
            className="float-right reminder-save-btn"
            onClick={() => onSubmit(note.noteId)}
          >
            Save
          </button>
        </Dropdown.Menu>
      </Dropdown>
      <div className="icon-div-content">
        <i
          className="fa fa-user-plus"
          title="Collaborator"
          aria-hidden="true"
          onClick={() => handleColabShow(note.noteId)}
        ></i>
      </div>
      <Dropdown>
        <Dropdown.Toggle
          className="rounded-circle bg-transparent"
          variant={"light"}
          bsPrefix="dropdown"
        >
          <MdColorLens size={"20"} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Form>
            <Row className="justify-content-center" style={{ height: "40px" }}>
              {colors
                .filter((clr, id) => {
                  return id < 3;
                })
                .map((clr, id) => (
                  <div
                    key={id}
                    className="colorBtn"
                    style={{ backgroundColor: clr }}
                    onClick={() => colorChange(clr)}
                  >
                    {clr === note.colour ? <MdDone /> : ""}
                  </div>
                ))}
            </Row>
            <Row className="justify-content-center" style={{ height: "40px" }}>
              {colors
                .filter((clr, id) => {
                  return id >= 3 && id < 6;
                })
                .map((clr, id) => (
                  <div
                    key={id}
                    className="colorBtn"
                    style={{ backgroundColor: clr }}
                    onClick={() => colorChange(clr)}
                  >
                    {clr === note.colour ? (
                      <MdDone style={{ color: "black" }} />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </Row>
            <Row className="justify-content-center" style={{ height: "40px" }}>
              {colors
                .filter((clr, id) => {
                  return id >= 6 && id < 9;
                })
                .map((clr, id) => (
                  <div
                    key={id}
                    className="colorBtn"
                    style={{ backgroundColor: clr }}
                    onClick={() => colorChange(clr)}
                  >
                    {clr === note.colour ? (
                      <MdDone style={{ color: "black" }} />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </Row>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
      <div className="icon-div-content">
        <i
          className="fa fa-archive"
          title="Archive"
          aria-hidden="true"
          onClick={props.handleArchive}
        ></i>
      </div>

      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-more"
          bsPrefix="dropdown"
          style={{ background: "none", border: "none" }}
        >
          <i
            className="fa fa-ellipsis-v"
            aria-hidden="true"
            style={{ color: "black" }}
          ></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-more"
              bsPrefix="dropdown"
              style={{
                border: "none",
                background: "#fff",
                color: "black",
                marginLeft: "12px"
              }}
            >
              Add Label
            </Dropdown.Toggle>
            <Dropdown.Menu style={{width:"500px",height:'auto'}}>
              <div className="font-weight-light pl-1">Create Label</div>
              <Typeahead
                id={"typeHead"+ note.noteId}
                clearButton
                defaultSelected={note.labelList}
                multiple
                options={allLabels}
                onChange={mapLabel}

              />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown.Item onClick={props.handleTrash}>Delete note</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {colabShow ? (
        <CollaboratorModal
          show={colabShow}
          onHide={handleColabClose}
          collaboratorList={note.colabList}
          loadColb={handleColabShow}
          noteId={note.noteId}
          getAllNotes={props.getAllNotes}
        />
      ) : (
        ""
      )}
        </div>
      }
      
    </div>
  );
}
