import React, { Component } from "react";
import TakeNote from "./TakeNote.jsx";
import GetNotes from "./GetNotes.jsx";
export class MenuNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getNoteArr: this.props.getNoteArr,
      getLabelArr: this.props.getLabelArr,
      isGrid: this.props.isGrid,
      service: "advance",
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
    var pinflag = false;
    var othersflag = false;

    let othersnotes = this.state.getNoteArr.map((item) => {
      console.log("check here", item);
      if (!item.archieved && !item.trashed && !item.pinned) {
        othersflag = true;
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
    let pinnednotes = this.state.getNoteArr.map((item) => {
      if (!item.archieved && !item.trashed && item.pinned) {
        pinflag = true;
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
        {this.props.notes ? (
          <div>
            <div>
              <TakeNote
                getNotes={this.props.getNotes}
                getLabels={this.props.getLabels}
                getLabelArr={this.props.getLabelArr}
              />
            </div>
            <div>
              <div className="pinned_text">PINNED</div>
              <div className="pin_notes">{pinnednotes}</div>
            </div>
            <div>
              <div className="Others_text">OTHERS</div>
              <div className="get_notes">{othersnotes}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MenuNotes;
