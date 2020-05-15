import React, { Component, PureComponent } from "react";
import GetNotes from "../Components/GetNotes";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

class ArchieveMenu extends PureComponent {
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

      isGrid: props.isGrid,
    });
  }
  render() {
    var archieveflag = false;
    let archiveNotes = this.state.getNoteArr.map((item) => {
      console.log("the item before is:", item);

      if (item.archieved && !item.trashed && !item.pinned) {
        archieveflag = true;

        console.log("the item is:", item);

        return (
          <GetNotes
            getNotes={this.props.getNotes}
            getLabels={this.props.getLabels}
            data={item}
            key={item.noteId}
            getLabelArr={this.props.getLabelArr}
            isGrid={this.state.isGrid}
          />
        );
      }
    });

    return (
      <div>
        {this.props.archieveMenu ? (
          <div className="archieve_notes">{archiveNotes}</div>
        ) : null}
      </div>
    );
  }
}

export default ArchieveMenu;
