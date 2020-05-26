import React, { Component, PureComponent } from "react";
import {
  InputBase,
  MuiThemeProvider,
  createMuiTheme,
  MenuItem,
  Tooltip,
  Grid,
  makeStyles,
  Menu,
  Dialog,
  ReactFragment,
  Card,
  CssTextField,
} from "@material-ui/core";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Button from "@material-ui/core/Button";
import MoreVertTwoToneIcon from "@material-ui/icons/MoreVertTwoTone";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import "../App.css";

import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import NoteController from "../Controller/NoteController";
import Controller from "../Controller/UserController";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Input from "@material-ui/core/Input";
import DoneIcon from "@material-ui/icons/Done";
import LabelController from "../Controller/LabelController";
import LabelTwoToneIcon from "@material-ui/icons/LabelTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

class GetLabels extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      labelName: this.props.data2.name,
      labelId: this.props.data2.labelId,
      iconChange: false,
      autofocusField: false,
      baseColor: "#FDFEFE",
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      labelName: props.data2.name,
      labelId: props.data2.labelId,
    });
  }

  onChangeRename = async (event) => {
    await this.setState({ labelName: event.target.value });
  };

  handleDeleteIcon = async () => {
    var labelDetails = {
      labelname: this.state.labelName,
      labelId: this.state.labelId,
    };
    console.log("label id", labelDetails.labelId);
    await LabelController.deletelabelforuser(labelDetails).then((res) => {
      if (res.status === 200) {
        console.log("Successfully deleted label for user");
      }
    });
    this.props.getNotes();
    this.props.getLabels();
  };

  handleEditIcon = async () => {
    await this.setState({
      iconChange: true,
      autofocusField: true,
      baseColor: "lightgrey",
    });
  };

  handleDoneIcon = async () => {
    alert("inside edit method");
    if (this.state.labelName !== "") {
      var labelDetails = {
        labelName: this.state.labelName,
        labelId: this.state.labelId,
      };
      console.log("check here ", labelDetails.labelId);
      await LabelController.editlabelforuser(labelDetails).then((res) => {
        alert("after controller ");
        if (res.status === 200) {
          console.log("Successfully renamed label for user");
        }
      });

      await this.setState({
        iconChange: false,
        autofocusField: false,
        baseColor: "#FDFEFE",
      });
      this.props.getLabels();
      this.props.getNotes();
    } else {
      await this.setState({
        iconChange: false,
        autofocusField: false,
        baseColor: "#FDFEFE",
      });
    }
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Toolbar className="editlist-labels">
              <Grid item xs={2}>
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 100 }}
                  placement="left"
                  title={this.state.labelName}
                  arrow
                >
                  <IconButton aria-label="Label">
                    <LabelTwoToneIcon style={{ fontSize: "20px" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  backgroundColor: this.state.baseColor,
                  borderRadius: "2px",
                }}
              >
                <InputBase
                  disabled={!this.state.autofocusField}
                  id="inputBase_margin"
                  autofocusField={this.state.autofocusField}
                  spellCheck={false}
                  style={{
                    fontWeight: "bold",
                    width: "143px",
                    color: "#616161",
                    paddingLeft: "4px",
                    paddingTop: "20px",
                  }}
                  defaultValue={this.state.labelName}
                  inputProps={{ "aria-label": "naked" }}
                  onChange={this.onChangeRename}
                />
              </Grid>
              <Grid item xs={2}>
                <div>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 100 }}
                    title="Delete label"
                    placement="left"
                    arrow
                  >
                    <IconButton aria-label="Delete label">
                      <DeleteTwoToneIcon
                        style={{ fontSize: "20px" }}
                        onClick={this.handleDeleteIcon}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div>
                  {this.state.iconChange ? (
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      placement="right"
                      title="Rename label"
                      arrow
                    >
                      <IconButton aria-label="Rename label">
                        <DoneIcon onClick={this.handleDoneIcon} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 100 }}
                      placement="right"
                      title="Rename label"
                      arrow
                    >
                      <IconButton aria-label="Cancel">
                        <EditTwoToneIcon onClick={this.handleEditIcon} />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </Grid>
            </Toolbar>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default GetLabels;
