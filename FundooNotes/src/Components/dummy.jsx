// import React, { Component } from "react";
// import {
//   Card,
//   InputBase,
//   IconButton,
//   Toolbar,
//   Chip,
//   MenuItem,
//   Menu,
//   Dialog,
//   Popover,
//   Tooltip,
//   Button,
//   MuiThemeProvider,
//   TextField,
//   Divider,
//   Typography,
//   Input,
//   Avatar,
  
// } from "@material-ui/core";
// import Snackbar from "@material-ui/core/Snackbar";
// import CloseIcon from "@material-ui/icons/Close";
// import Fade from "@material-ui/core/Fade";
// import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
// import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
// import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
// import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";
// import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
// import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
// import PaletteIcon from "@material-ui/icons/PaletteOutlined";
// import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
// import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
// import ImageIcon from "@material-ui/icons/ImageOutlined";
// import DoneIcon from "@material-ui/icons/DoneOutlined";
// import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
// import pin from "../Assets/pin.svg";
// import fillpin from "../Assets/fillpin.svg";
// import NoteController from "../Controller/NoteController";
// import LabelController from "../Controller/LabelController";
// import GetLabelsInNoteMenu from "./GetLabelsInNoteMenu";
// const saveclose = "Save & Close";
// let array = [];
// let arrcollab1 = [];
// let rem = "";
// let profpic = localStorage.getItem("profilepicture");
// class dummy extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       edit: false,
//       open: false,
//       label: []
//     }
//     Collaborators: this.props.data.colabUser,
//     collabOpen; false
//   };
//   onChangeCollabName = async (event) => {
//     await this.setState({ collabName: event.target.value });

//     if (
//       /^[a-zA-z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/.test(
//         this.state.collabName
//       )
//     ) {
//       this.setState({ err1: false });
//       if (this.state.collabName !== "") {
//         await this.setState({ disable: false });
//       }
//     } else if (this.state.collabName === "") {
//       this.setState({ err1: false, disable: true });
//     } else {
//       this.setState({ err1: true });
//     }
//   };
//   handleCollabOpen = async () => {
//     await this.setState({ collabOpen: true });
//   };
//   handleCollabSave = async () => {
//     await this.setState({
//       collabOpen: false,
//     });
//     arrcollab1 = [];
//   };
//   handleCollabCancel = async () => {
//     if (arrcollab1.length !== 0) {
//       for (let index = 0; index < arrcollab1.length; index++) {
//         let collabDetails = {
//           noteId: this.props.data.id,
//           collaborator: arrcollab1[index],
//         };
//         NoteController.deletecollabfromnote(collabDetails).then((resp) => {
//           if (resp.status === 200) {
//             console.log("Collaborator added to note");
//           }
//         });
//       }
//     }
//     arrcollab1 = [];
//     this.props.getNotes();
//     await this.setState({
//       collabOpen: false,
//     });
//   };
//   helpercollabmethod = () => {
//     if (this.state.err1) {
//       return "Not a valid mail id";
//     }
//   };
//   handleCollabDoneClick = async () => {
//     arrcollab1.push(this.state.collabName);

//     let collabDetails = {
//       noteId: this.props.data.noteId,
//       collabName: this.state.collabName,
//     };
//     await NoteController.addcollabtonote(collabDetails).then((resp) => {
//       if (resp.status === 200) {
//         console.log("Collaborator added to note");
//         this.props.getNote();
//       }
//     });
//     await this.setState({
//       collabName: "",
//       disable: true,
//     });
//   };
//   handleRemoveCollab = async (data, item) => {
//     let collabDetails = {
//       noteId: this.props.data.noteId,
//       collabName: item.email,
//     };
//     NoteController.deletecollabfromnote(collabDetails).then((resp) => {
//       if (resp.status === 200) {
//         console.log("Collaborator added to note");
//         this.props.getNote();
//       }
//     });
//   };
// }
//   let displaycollabs = this.state.collaborators.map((item) => {
//     return () =>
//       <div className="collab-style">
//         <Tooltip title={item.collaborator}>
//           <Avatar
//             id="avatar"
//             src=" "
//             onClick={this.handleCollabOpen}
//           />
//         </Tooltip>
//       </div>
    
  
//   let collabs;
//   collabs = this.state.collaborators.map((item) => {
//     return () =>
//       <div className="collab-owner">
//         <div style={{ marginLeft: "23px" }}>
//           <Avatar src=" " />
//         </div>
//         <div style={{ marginLeft: "73px", marginTop: "-52px" }}>
//           <h4>{item.email}</h4>
//         </div>
//         <div style={{ marginTop: "-3px" }}>
//           <IconButton
//             onClick={(data) => {
//               console.log("collabs", item.email);

//               this.handleRemoveCollab(data, item.email);
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//       </div>
    
//   });
//     return()=>
      
//       <div>
//       <Tooltip title="Collaborator">
//         <IconButton onClick={this.handleCollabOpen}>
//           <PersonAddIcon style={{ fontSize: "16px" }} />
//         </IconButton>
//       </Tooltip>
//     </div>
//     <Card className="card_decor_collab">
            
//     <Toolbar>
//       <h3>Collaborators</h3>
//     </Toolbar>
//     <Divider />
//     <div className="collab-owner">
//       <div style={{ marginLeft: "23px", marginTop: "20px" }}>
//         <Avatar src={this.state.profilePicture} />
//       </div>
//       <div style={{ marginLeft: "76px", marginTop: "-50px" }}>
//         <h4>{owner}(owner)</h4>
//       </div>
//     </div>
//     {collabs}
//     <div className="collab-new">
//       <div>
//         <IconButton>
//           <PersonAddTwoToneIcon fontSize="15px" />
//         </IconButton>
//       </div>
//       <div
//         className="collabEmail"
//         style={{
//           paddingTop: "6px",
//           marginLeft: "40px",
//           marginTop: "-40px",
//         }}
//       >
//         <Input
//           required="true"
//           error={this.state.err1}
//           placeholder="Email to share with"
//           spellCheck={false}
//           value={this.state.collabName}
//           onChange={this.onChangeCollabName}
//           helperText={this.helpercollabmethod()}
//         />
//       </div>
//       <div className="done">
//         <IconButton disabled={this.state.disable}>
//           <DoneIcon onClick={this.handleCollabDoneClick} />
//         </IconButton>
//       </div>
//     </div>
//     <Divider />
//     <div className="collab-cancelsavebutton">
//       <div style={{ marginRight: "5%" }}>
//         <Button variant="contained" onClick={this.handleCollabCancel}>
//           Cancel
//         </Button>
//       </div>
//       <div>
//         <Button variant="contained" onClick={this.handleCollabSave}>
//           Save
//         </Button>
//       </div>
//     </div>
//   </Card>
//   </div>
//   </Dialog>

    
//     </div>
//     }
//       );
//     }
//   export default dummy;
