import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import NoteController from "../Controller/NoteController";
import LabelController from "../Controller/LabelController";

class GetLabelsInNoteMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.item.name,
      labelId: this.props.item.labelId,
      checkedLabel: false,
      allLabels: this.props.allLabels,
      labelIschecked: false,
      tick: this.props.tick,
      data: this.props.data,
      noteId: this.props.data.noteId,
      getNotes: this.props.getNotes,
    };
    this.handleCheckLabel = this.handleCheckLabel.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.item.name,
      labelId: props.item.labelId,
      allLabels: props.allLabels,
      tick: props.tick,
      data: props.data,
      noteId: props.item.noteId,
      getNotes: props.getNotes,
    });
  }

  handleCheckLabel = async (event, props) => {
    await this.setState({ checkedLabel: event.target.checked });
    if (this.state.checkedLabel === true) {
      console.log(this.state.checkedLabel);

      let noteDetails = {
        noteId: this.state.noteId,
      };

      await LabelController.addlabeltonote(
        this.state.noteId,
        this.state.labelId
      ).then((res) => {
        console.log(this.state.noteId, "check here raji please");
        if (res.status === 200) {
          console.log("Label added to the note successfully");
        }
        this.props.getNotes();
      });
    } else if (this.state.checkedLabel === false) {
      console.log(this.state.noteId, "check here raji please");
      await LabelController.deletelabelfromnote(
        this.state.noteId,
        this.state.labelId
      ).then((res) => {
        if (res.status === 200) {
          console.log("Label deleted for the note successfully");
        }
      });
    }
    this.props.getNotes();
  };

  
  render() {
    console.log("My array is ", this.state.allLabels);
    if (this.props.allLabels !== undefined) {
      let mat = this.state.allLabels.map((element) => {
        if (this.state.labelName === element) {
          this.setState({
            labelIschecked: true,
            checkedLabel: true,
          });
        }
      });
    }
    return (
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              display: "flex",
              justifyContent: "start",
              padding: "5px",
            }}
          >
            <div className="checkbox_label">
              <div>
                <Checkbox
                  checked={this.state.tick}
                  onClick={this.handleCheckLabel}
                  //defaultChecked
                  color="default"
                  value="default"
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
              </div>
            </div>
            <span className="labelname_field">{this.state.name}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default GetLabelsInNoteMenu;
