import React from "react";
import UserController from "../Controller/UserController";
import NoteController from "../Controller/NoteController";
// import Button from "@material-ui/core/Button";
// import Input from "@material-ui/core/Input";

let filename = localStorage.getItem("profilepicture");
class ProfilePicture extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      added: false,

      getProfilePic: this.props.getProfilePic,
      profileLink: this.props.profileLink,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  handleProfilepicRemove = async () => {
    console.log("check here ", filename);
    await UserController.removeprofilepic().then((res) => {
      if (res.status === 200) {
        console.log("profile pic is removed");
      }
      this.props.getProfilePic();
    });
  };

  onFormSubmit = async () => {
    console.log("file is:", this.state.file);
    this.fileUpload(this.state.file);
  };
  onChange = async (e) => {
    await this.setState({ file: e.target.files[0] });
    this.setState({ added: this.state.file.name });
  };
  componentWillReceiveProps(props) {
    this.setState({
      getProfilePic: props.getProfilePic,
    });
  }
  fileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(this.state.added);
    localStorage.setItem("profilepicture", this.state.added);
    await UserController.addprofilepic(formData).then((res) => {
      if (res.status === 200) {
        console.log("inside output", res);
        localStorage.setItem("profilelink", res.data.message);
        console.log("profile pic is added");
      }
      this.props.getProfilePic();
    });
  };

  render() {
    return (
      <div>
        <div className="choose-file">
          <input type="file" onChange={this.onChange} />
        </div>
        <div style={{ display: "flex" }}>
          <div className="upload-file">
            <button className="signout-button" onClick={this.onFormSubmit}>
              UPLOAD
            </button>
          </div>
          {
            <div className="upload-file1">
              <button
                className="signout-button"
                onClick={this.handleProfilepicRemove}
              >
                REMOVE
              </button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ProfilePicture;
