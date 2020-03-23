import React, { Component,Fragment } from "react";
import "../sidedrawer.css";
import "../App.css";
import AddLabel from "./addLabel";
import MaterialIcon from "react-google-material-icons";
class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  handleEditLabel = () => {
    this.setState({ editLabel: !this.state.editLabel });
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: !this.state.show });
  render() {
    return (
      <Fragment>
      <nav className="side-drawer">
        <ul>
          <li className="active">
            <div className="side-drawer-header">
              <i
                className="fa fa-sticky-note"
                aria-hidden="true"
                style={{ color: "gray", fontSize: "18px" }}
              ></i>
              <div
                className="side-drawer-content "
                onClick={this.props.onClickActive}
              >
                Note
              </div>
            </div>
          </li>
          <li>
            <div className="side-drawer-header">
              <i
                className="fa fa-bell-o"
                aria-hidden="true"
                style={{ color: "gray", fontSize: "18px" }}
              ></i>
              <div
                className="side-drawer-content"
                onClick={this.props.onClickReminder}
              >
                Reminders
              </div>
            </div>
          </li>
          <hr style={{ backgroundColor: "#e9ecef" }} />
          <p style={{ color: "gray" }}>LABELS</p>
          {this.props.labels.map(lbl => {
            return (
              <li key={lbl.labelId}>
                <div className="side-drawer-header">
                  <MaterialIcon icon={"label"} size={20}/>
                  <div
                    className="label-list"
                    style={{marginLeft:'25px'}}
                  >
                    {lbl.name}
                  </div>
                </div>
              </li>
            );
          })}
          <li>
            <div className="side-drawer-header">
              <i
                className="fa fa-pencil-square-o"
                aria-hidden="true"
                style={{ color: "gray", fontSize: "18px" }}
              ></i>
              <div className="side-drawer-content" onClick={this.handleShow}>
                Edit labels
              </div>
            </div>
          </li>
          <hr style={{ backgroundColor: "#e9ecef" }} />
          <li>
            <div className="side-drawer-header">
              <i
                className="fa fa-archive"
                aria-hidden="true"
                style={{ color: "gray", fontSize: "18px" }}
              ></i>
              <div
                className="side-drawer-content"
                onClick={this.props.onClickArchive}
              >
                Archive
              </div>
            </div>
          </li>
          <li>
            <div className="side-drawer-header">
              <i
                className="fa fa-trash-o"
                aria-hidden="true"
                style={{ color: "gray", fontSize: "18px" }}
              ></i>
              <div
                className="side-drawer-content"
                onClick={this.props.onClickTrash}
              >
                Trash
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div>
      {this.state.show ? (
          <AddLabel
            hide={this.handleShow}
            show={this.state.show}
            labelList={this.props.labels}
            setLabels={this.props.addLabelList}
            removeLabel={this.props.removeLabel}
            editLabel={this.props.editLabel}
          />
        ) : (
         ""
        )}
      </div>
      </Fragment>
    );
  }
}
export default SideDrawer;