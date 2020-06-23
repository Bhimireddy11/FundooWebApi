import React, { Component } from "react";

import {
  Tooltip,
  AppBar,
  Toolbar,
  MuiThemeProvider,
  createMuiTheme,
  InputBase,
  Typography,
  IconButton,
  Divider,
  Card,
  Popover,
  Avatar,
  Badge,
} from "@material-ui/core";
import { StickyContainer, Sticky } from "react-sticky";

import AppsIcon from "@material-ui/icons/Apps";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import PhotoCameraIcon from "@material-ui/icons/PhotoCameraOutlined";

import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import grid from "../Assets/grid.svg";
import Dashboard from "./Dashboard";
import ProfilePicture from "./ProfilePicture";

let owner = localStorage.getItem("owner");
const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        // alignContent:stretch,
        flexDirection:"row",
        flexflow:"row"
      },
    },
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isGrid: false,
      anchorEl: null,
      isMenuOpen: false,
      changePic: false,
      profileLink: this.props.profileLink,
      getProfilePic: this.props.getProfilePic,
      onChangeSearchInput: this.props.onChangeSearchInput,
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      profileLink: props.profileLink,
      getProfilePic: props.getProfilePic,
      onChangeSearchInput: props.onChangeSearchInput,
    });
  }

  handleProfileMenuOpen = async (event) => {
    console.log(this.state.profileLink);
    await this.setState({ anchorEl: event.currentTarget, isMenuOpen: true });
  };
  handleMenuClickAway = async () => {
    this.setState({ changePic: false, anchorEl: null });

    console.log("the picture URL :", this.props.profilePicture);
  };
  handleEditPicture = async () => {
    await this.setState({ changePic: !this.state.changePic });
  };

  handleSignout = async () => {
    alert("inside signout");

    localStorage.clear();
    window.location = "http://localhost:3000/login";
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="head">
          <StickyContainer>
            <sticky>
              <div>
                <Card display="block" color="white">
                  <Toolbar>
                    <div className="menuAndlogo">
                      <Tooltip title="main menu">
                        <IconButton onClick={this.props.handleSideOpen}>
                          <MenuIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="nameAndlogo">
                      <img
                        width="75%"
                        height="75%"
                        src={
                          "https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
                        }
                        alt="Logo"
                      />
                    </div>
                    <div className="fundootext">
                      <Typography color="default" variant="h6">
                        Keep
                      </Typography>
                    </div>

                    <div className="search" fxlayoutgap="50px">
                      <InputBase
                        placeholder="            Search"
                        onChange={this.props.onChangeSearchInput}
                      />
                      <div className="searchButton">
                        <Tooltip title="search">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="appicons">
                      <div>
                        <IconButton>
                          <Tooltip title="Refresh">
                            <RefreshOutlinedIcon
                              style={{ color: "#616161" }}
                              style={{ fontSize: "22px" }}
                            />
                          </Tooltip>
                        </IconButton>
                      </div>

                      <div>
                        <IconButton>
                          <Tooltip title="Grid View">
                        
                            <img
                              src={require("../Assets/grid.svg")}
                              alt=""
                              style={{ fontSize: "22px" }}
                              onClick={() => {
                                this.setState({
                                  isGrid: !this.state.isGrid,
                                });
                                this.props.handleIsGrid(!this.state.isGrid);
                              }}
                            />
                          </Tooltip>
                        </IconButton>
                      </div>
                      <div>
                        <IconButton>
                          <Tooltip title="settings">
                            <SettingsIcon style={{ fontSize: "22px" }} />
                          </Tooltip>
                        </IconButton>
                      </div>
                    </div>
                    <div className="Apps">
                      <IconButton>
                        <Tooltip title="Google Apps">
                          <AppsIcon style={{ fontSize: "22px" }} />
                        </Tooltip>
                      </IconButton>
                    </div>

                    <div className="GoogleAccount">
                      <Tooltip title="Google Account">
                        {/* <IconButton onClick={this.handleProfileMenuOpen}>
                          <AccountCircleIcon style={{ fontSize: "29px" }} />
                        </IconButton> */}
                        <Avatar
                          edge="end"
                          // aria-controls={menuId}
                          aria-haspopup="true"
                          src={this.props.profileLink}
                          className={Avatar.height}
                          onClick={this.handleProfileMenuOpen}
                        />
                      </Tooltip>
                      {this.state.isMenuOpen ? (
                        <div>
                          <Popover
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            keepMounted
                            className="profile-popover"
                            transformOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            open={this.state.isMenuOpen}
                            onClose={this.handleMenuClickAway}
                          >
                            <Card className="card_decor8">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingTop: "15px",
                                    paddingBottom: "5px",
                                  }}
                                >
                                  <Badge
                                    badgeContent={
                                      <div className="editProfile">
                                        <Tooltip title="Edit" placement="right">
                                          <IconButton
                                            onClick={this.handleEditPicture}
                                          >
                                            <PhotoCameraIcon />
                                          </IconButton>
                                        </Tooltip>
                                      </div>
                                    }
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "right",
                                    }}
                                  >
                                    <div>
                                      <Avatar
                                        edge="end"
                                        // aria-controls={menuId}
                                        aria-haspopup="true"
                                        src={this.props.profileLink}
                                        className={Avatar.height}
                                        onClick={this.handleProfileMenuOpen}
                                      />
                                      {/* <img
                    src={profilePicture}
                    style={{
                      height: "2cm",
                      width: "2cm",
                      borderRadius: "50%",
                      border: "2px solid grey",
                    }}
                  /> */}
                                    </div>
                                  </Badge>
                                </div>
                                <div className="profilepic-owner">
                                  <span style={{ fontWeight: "bold" }}>
                                    {owner}
                                  </span>
                                </div>
                                {this.state.changePic ? (
                                  <div>
                                    <Divider />
                                    <Toolbar className="profile-toolbar">
                                      <ProfilePicture
                                        getProfilePic={this.props.getProfilePic}
                                        profileLink={this.props.profileLink}
                                      />
                                    </Toolbar>
                                  </div>
                                ) : null}

                                <div className="signout-button-div">
                                  <button
                                    onClick={this.handleSignout}
                                    className="signout-button2"
                                  >
                                    Sign Out
                                  </button>
                                </div>
                              </div>
                            </Card>
                          </Popover>
                        </div>
                      ) : null}
                    </div>
                  </Toolbar>
                </Card>
              </div>
            </sticky>
          </StickyContainer>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default Header;
