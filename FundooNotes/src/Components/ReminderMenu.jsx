import React, { Component, PureComponent } from "react";
import GetNotes from "../Components/GetNotes";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

class ReminderMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      getNoteArr: this.props.getNoteArr,

      isGrid: this.props.isGrid,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      getNoteArr: props.getNoteArr,
      isGrid: this.props.isGrid,
    });
  }
  render() {
    var reminderflag = false;
    let reminderNotes = this.state.getNoteArr.map((item) => {
      console.log("the item before is:", item);

      if (item.reminder !== null) {
        reminderflag = true;

        console.log("the item is:", item);

        return (
          <GetNotes
            getNotes={this.props.getNotes}
            getLabels={this.props.getLabels}
            getLabelArr={this.props.getLabelArr}
            data={item}
            key={item.noteId}
            isGrid={this.props.isGrid}
          />
        );
      }
    });

    return (
      <div className="reminder_notes">
        {this.props.reminderMenu ? <div>{reminderNotes}</div> : null}
      </div>
    );
  }
}

export default ReminderMenu;
