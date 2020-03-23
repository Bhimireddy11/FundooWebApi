import React, { useState, useRef} from "react";
import { Modal, InputGroup, Button, FormControl } from "react-bootstrap";
import MaterialIcon from "react-google-material-icons";
export default function AddLabel(props) {
  const inRef = useRef(null);
  const [ic, setIc] = useState("add");
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [icon, setIcon] = useState(false);

  const focusInput = () => {
    if (ic === "add") {
      inRef.current.focus();
      inRef.current.classList.remove("border-bottom-0", "outline-none");
      setIc("close");
    } else {
      inRef.current.classList.add("border-bottom-0");
      setIc("add");
    }
  };

  const showDelete = id => {
    document.getElementById(id).getElementsByTagName("i")[0].innerText =
      "delete";
  };
  const hideDelete = id => {
    document.getElementById(id).getElementsByTagName("i")[0].innerText =
      "label";
  };
  const changeLabel = e => {
    setUpdatedLabel(e.target.value);
    setIcon(!icon);
  };
  return (
    <Modal size="sm" show={props.show} onHide={props.hide} centered>
      <InputGroup className="p-2">
        <Button
          className="navBtn"
          size="sm"
          variant={"light"}
          onClick={focusInput}
        >
          <MaterialIcon icon={ic} size={20} />
        </Button>
        <FormControl
          className="border-top-0 border-left-0 border-right-0 border-bottom-0 mx-1"
          ref={inRef}
          placeholder={"Create new label"}
          onFocus={focusInput}
        />
        <Button
          className="navBtn"
          size="sm"
          variant={"light"}
          onClick={() => {
            props.setLabels(inRef.current.value);
            inRef.current.value="";
          }}
        >
          <MaterialIcon icon={"check"} size={20} />
        </Button>
      </InputGroup>
      <div className="overflow-auto" style={{ maxHeight: "200px" }}>
        {props.labelList.map((label, id) => (
          <div
            key={id}
            onMouseOver={() => showDelete(label.name + "icon")}
            onMouseLeave={() => hideDelete(label.name + "icon")}
          >
            <InputGroup className="p-2">
              <Button
                id={label.name + "icon"}
                className="navBtn"
                size="sm"
                variant={"light"}
                onClick={() => props.removeLabel(label.labelId)}
              >
                <MaterialIcon icon={"label"} size={20} />
              </Button>
              <FormControl
                id={label.name}
                className="border-top-0 border-left-0 border-right-0 border-bottom-0 mx-1"
                defaultValue={label.name}
                onChange={changeLabel}
              />
              <Button
                name={label.name}
                className="navBtn"
                size="sm"
                variant={"light"}
                onClick={() => props.editLabel(label.labelId, updatedLabel)}
              >
                <MaterialIcon icon={"edit"} size={20} />
              </Button>
            </InputGroup>
          </div>
        ))}
      </div>
      <div className="text-right p-2">
        <Button variant={"light"} onClick={props.hide}>
          Done
        </Button>
      </div>
    </Modal>
  );
}
