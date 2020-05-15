import React, { Component } from "react";
import GetNotes from "../Components/GetNotes";
import CreateLabelNote from "../Components/CreateLabelNote";
import LabelTwoToneIcon from "@material-ui/icons/LabelTwoTone";

class LabelMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getNoteArr: this.props.getNoteArr,
      labelName: this.props.labelName,
      view: this.props.view,
      getLabelArr: this.props.getLabelArr,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      getNoteArr: props.getNoteArr,
      getLabelArr: props.getLabelArr,
      labelName: props.labelName,
      view: props.view,
      profilePicture: props.profilePicture,
    });
  }
  render() {
    var pinflag = false;
    var othersflag = false;
    let archiveflag = false;
    let othersnotes = this.state.getNoteArr.map((item) => {
      if (!item.archieved && !item.trashed && !item.pinned) {
        for (let i = 0; i < item.list.length; i++) {
          const element = item.list[i].name;
          if (element === this.state.name) {
            othersflag = true;
            return (
              <GetNotes
                getNotes={this.props.getNotes}
                getNoteLabelArr={this.props.getNoteLabelArr}
                getLabelArr={this.props.getLabelArr}
                data={item}
                key={item.noteId}
                fromArchive={false}
                view={this.state.view}
                profilePicture={this.state.profilePicture}
              />
            );
          }
        }
      }
    });

    let archivenotes = this.state.getNoteArr.map((item) => {
      if (item.archieved && !item.trashed && !item.pinned) {
        for (let i = 0; i < item.list.length; i++) {
          const element = item.list[i].name;
          if (element === this.state.name) {
            archiveflag = true;
            return (
              <GetNotes
                getNotes={this.props.getNotes}
                getNoteLabelArr={this.props.getNoteLabelArr}
                getLabelArr={this.props.getLabelArr}
                data={item}
                key={item.noteId}
                fromArchive={true}
                view={this.state.view}
                profilePicture={this.state.profilePicture}
              />
            );
          }
        }
      }
    });

    let pinnednotes = this.state.getNoteArr.map((item) => {
      if (!item.archieved && !item.trashed && item.pinned) {
        for (let i = 0; i < item.list.length; i++) {
          const element = item.list[i].name;
          if (element === this.state.name) {
            pinflag = true;
            return (
              <GetNotes
                getNotes={this.props.getNotes}
                getLabels={this.props.getLabels}
                getNoteLabelArr={this.props.getNoteLabelArr}
                getLabelArr={this.props.getLabelArr}
                data={item}
                key={item.noteId}
                fromArchive={false}
                view={this.state.view}
                profilePicture={this.state.profilePicture}
              />
            );
          }
        }
      }
    });

    return (
      <div style={{ marginTop: "55px" }}>
        {this.props.labelNoteOpen ? (
          <div className={this.props.open ? "shift-true" : "shift-false"}>
            <div className="create_note">
              <div>
                <CreateLabelNote
                  getNotes={this.props.getNotes}
                  getLabels={this.props.getLabels}
                  getLabelArr={this.props.getLabelArr}
                  className={this.props.name}
                  profilePicture={this.state.profilePicture}
                />
              </div>
            </div>

            {pinflag || archiveflag ? (
              <div>
                {pinflag ? (
                  <div>
                    <div
                      className={
                        !this.state.view ? "pin_heading" : "pin_heading_view"
                      }
                    >
                      PINNED
                    </div>
                    <div className="pin_notes">{pinnednotes}</div>
                  </div>
                ) : null}
                {archiveflag ? (
                  <div>
                    <div
                      className={
                        !this.state.view
                          ? "others_heading"
                          : "others_heading_view"
                      }
                    >
                      ARCHIVE
                    </div>
                    <div className="get_notes">{archivenotes}</div>
                  </div>
                ) : null}

                {othersflag ? (
                  <div>
                    <div
                      className={
                        !this.state.view
                          ? "others_heading"
                          : "others_heading_view"
                      }
                    >
                      OTHERS
                    </div>
                    <div className="get_notes">{othersnotes}</div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                {othersflag ? (
                  <div>
                    <div
                      className={
                        !this.state.view
                          ? "others_heading"
                          : "others_heading_view"
                      }
                    ></div>
                    <div style={{ marginTop: "-2%" }}>
                      <div className="get_notes">{othersnotes}</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      <LabelTwoToneIcon
                        style={{
                          fontSize: "115px",
                          marginTop: "100px",
                          color: "lightgrey",
                        }}
                      />
                    </div>
                    <div className="noarchive_head">
                      No notes with this label yet
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default LabelMenu;
