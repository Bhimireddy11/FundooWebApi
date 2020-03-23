import React from "react";
import { InputGroup } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import MyToolTip from "./myToolTip";

export default function MyTag(props) {
    const showClose = (id) => {
        document.getElementById(id).removeAttribute("hidden")
    };
    const hideClose = (id) => {
        document.getElementById(id).setAttribute("hidden", true);
    };
  return (
    <div
      key={props.id}
      className="rounded-pill mt-1 mr-1 p-1"
      style={{ maxWidth: "100px", backgroundColor: "#eceff1" }}
      onMouseOver={() => showClose(props.id)}
      onMouseLeave={() => hideClose(props.id)}
    >
      <MyToolTip text={props.data}>
        <InputGroup>
          {props.icon}
          <label
            className="m-0 overflow-hidden"
            style={{
              maxWidth: "51px",
              fontSize: "x-small",
              whiteSpace: "nowrap"
            }}
          >
            {props.data}
          </label>
          <IoMdClose
            id={props.id}
            size={"15"}
            onClick={props.handleCloseIcon}
            hidden={true}
          />
        </InputGroup>
      </MyToolTip>
    </div>
  );
}
