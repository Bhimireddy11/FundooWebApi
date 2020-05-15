import React, { Component, PureComponent } from "react";
import GetNotes from "../Components/GetNotes";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

class TrashMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      getNoteArr: this.props.getNoteArr,
      getLabelArr: this.props.getLabelArr,
      isGrid: this.props.isGrid,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      getNoteArr: props.getNoteArr,
      getLabelArr: props.getLabelArr,
      isGrid: props.isGrid,
    });
  }
  render() {
    var trashNotesFlag = false;
    let trashNotes = this.state.getNoteArr.map((item) => {
      console.log("the item before is:", item);

      if (!item.archieved && item.trashed && !item.pinned) {
        trashNotesFlag = true;

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
      <div>
        {this.props.trash ? (
          <div className="trash_notes">{trashNotes}</div>
        ) : null}
      </div>
    );
  }
}

export default TrashMenu;
