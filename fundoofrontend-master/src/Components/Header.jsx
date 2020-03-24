import React, { Component } from "react";
import "../App.css";
import MyToolTip from "./myToolTip";
import MaterialIcon from "react-google-material-icons";
import { Button,FormControl,Dropdown } from "react-bootstrap";
import {ImagePicker} from "react-file-picker";
import Axios from "axios";
import { uploadFile } from "../Controller/profile";
class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      profilePic:''
    }
  }

  getOnChange = (file) => {
   uploadFile(file).
   then(resp => this.setState({profilePic:resp.data.obj}))
   .catch(err => console.log(err.response));
  };
  render() {
    return (
      <div className="container-fluid nav-bar">
        <div className="row header" style={{ display: "flex", alignItems: "center" }}>
          <div
            className="col-sm-3"
            style={{ display: "flex", alignItems: "center"}}
          >
            <div className="col-sm-2" style={{ color: "gray" }}>
              <i
                className="fa fa-bars"
                aria-hidden="true"
                style={{ fontSize: "20px",cursor:'pointer'}}
                onClick={this.props.handleSideBar}
              ></i>
            </div>
            <div className="col-sm-2">
              <img src="../keep.png" alt="logo" width="40px" height="40px" />
            </div>
            <div className="col-sm-3">
              <span style={{ fontSize: "29px", color: "gray" }}>
                fundoo
              </span>
            </div>
          </div>
        
          <div className="col-sm-6 has-search">
          <i className="fa fa-search form-control-feedback" title="Search"></i>
          <input type="text" className="form-control" placeholder="Search..." />
          <button type="button" className="close" aria-label="Close" />
          </div>

          <div
            className="col-sm-3 right-content"
            style={{ display: "flex", alignItems: "center"}}
          >
            <div className="col-sm-3"></div>
            <div className="col-sm-3" style={{ color: "gray" }}>
            <i
                className="fa fa-refresh"
                title="Refresh"
                aria-hidden="true"
              ></i>
            </div>
            <div className="col-sm-3" style={{ color: "gray",zIndex:'6000'}}>
              <MyToolTip text={this.props.text}>
                  <i
                    className="fa fa-th-list"
                    aria-hidden="true"
                    style={{cursor:'pointer'}}
                    onClick={this.props.handleView}
                  >
                  <MaterialIcon icon={this.props.viewIcon}/>
                  </i>
              </MyToolTip>
            </div>
            <div className="col-sm-3">
              <Dropdown>
                    <Dropdown.Toggle as={Button} variant={"light"} className="p-0" bsPrefix="dropdown">
                        <MyToolTip text={"Profile"}>
                             <img src=" " alt="Profile" style={{borderRadius:'50%',width:'40px',height:'40px'}}/> 
                        </MyToolTip>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div className="bg-light text-center p-2 border shadow-lg position-fixed"
                             style={{right: 10, width: "300px", borderRadius: "10px"}}>
                            <div className="w-100 mb-2">
                               <img src=" " alt="Profile pic" style={{borderRadius:'50%'}} width={70} height={70} roundedcircle="true"/> */}
                                <MyToolTip text={"Update"}>
                                    <ImagePicker
                                        extensions={['jpg', 'jpeg', 'png']}
                                        dims={{minWidth: 100, maxWidth: 1024, minHeight: 100, maxHeight: 1024}}
                                        onChange={this.getOnChange}
                                        onError={errMsg => alert(errMsg)}>
                                        <Button variant={"light"} className="p-0"
                                                style={{position: "absolute", bottom: 146, left: 165}}>
                                            <MaterialIcon icon={"linked_camera"} size={20}/>
                                        </Button>
                                    </ImagePicker>
                                </MyToolTip>
                            </div>
                            <div style={{marginTop:'17px', display:'flex', flexDirection:'column',fontWeight:'normal'}}>
                                  <span>raji bhimireddy</span>
                                  <span>{localStorage.getItem('emailId')}</span>
                                </div>
                            <div className="w-100 mb-2 border-bottom">
                              <FormControl
                                className="bg-transparent border-0 text-center text-#eceff1" 
                                style={{fontSize: "15px"}}
                                type="text"
                                />
                                </div>

                            <Button type="file" variant={"light"} style={{backgroundColor: '#eceff1'}}
                                    // onClick={logout}
                                    >Logout</Button>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
