import React, { Component, PureComponent } from "react";
import GetNotes from "../Components/GetNotes";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

class SearchComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchNotesArr: this.props.searchNotesArr,
      getLabelArr: this.props.getLabelArr,
      isGrid: this.props.isGrid,
      getNoteArr: this.props.getNoteArr,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      searchNotesArr: props.searchNotesArr,
      getLabelArr: props.getLabelArr,
      isGrid: props.isGrid,
      getNoteArr: props.getNoteArr,
    });
  }
  render() {
    var searchFlag = false;
    let searchNotes = this.state.searchNotesArr.map((item) => {
      console.log("the item before is:", item);

      searchFlag = true;

      console.log("the item is:", item);

      return (
        <GetNotes
          getNotes={this.props.getNotes}
          getLabels={this.props.getLabels}
          data={item}
          key={item.noteId}
          getLabelArr={this.state.getLabelArr}
          isGrid={this.state.isGrid}
        />
      );
    });

    return (
      <div>
        {this.props.searchOpen ? (
          <div className="search_notes">{searchNotes}</div>
        ) : null}
      </div>
    );
  }
}

export default SearchComponent;
