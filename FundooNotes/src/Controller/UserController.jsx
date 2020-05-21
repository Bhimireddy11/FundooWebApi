import axios from "axios";
//import Forgetpassword from "../Components/Forgetpassword";

//require('dotenv').config()

let jwt = localStorage.getItem("logintoken");

const token = localStorage.getItem("logintoken");
var controller = {
  register(registrationDetails) {
    console.log("controller register method ", registrationDetails);
    return axios.post(
      "http://localhost:3000/user/register",
     //"http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp?access_token=rajibhimireddy",

      registrationDetails
    );

  },

  getprofilelink() {
    return axios.post(`http://localhost:3000/user/files/link`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  login(loginDetails) {
    console.log("controller login method ", loginDetails);
    return axios.post("http://localhost:3000/user/login", loginDetails);
  },
  forgotpassword(forgotDetails) {
    console.log("controller forgotpassword method ", forgotDetails);
    alert("inside controller");
    return axios.post(
      "http://localhost:3000/user/forgetpassword",
      forgotDetails
    );
  },
  async addprofilepic(formData) {
    return await axios.post("http://localhost:3000/user/files/add", formData, {
      headers: {
        "content-type": "multipart/form-data",
        token: token,
        enablePublicReadAccess: true,
      },
    });
  },
  removeprofilepic() {
    return axios.post("http://localhost:3000/user/files/delete", null, {
      headers: {
        token: token,
        "Content-type": "application/json ",
      },
    });
  },
  resetpassword(resetDetails, forgetToken) {
    console.log("controller resetpassword method ", resetDetails);
    console.log(forgetToken);
    alert("check token value");
    console.log(jwt);
    return axios.put(
      "http://localhost:3000/user/resetpassword/" + forgetToken,
      resetDetails
    );
  },
  verification(jwt) {
    console.log("controller verification method ");
    console.log(jwt);
    return axios.put(`http://localhost:3000/verify/${jwt}`);
  },
  getprofilelink() {
    return (
      axios.post("http://localhost:3000/user/files/link"),
      null,
      {
        headers: {
          token: token,
          "Content-type": "application/json ",
        },
      }
    );
  },
  signout(jwt) {},
  takenote(noteDetails) {
    return axios.post(
      "http://localhost:3000/note/create/" + token,
      noteDetails
    );
  },
  async getNotes() {
    let datas = [];
    await axios
      .get(`http://localhost:3000/note/getallnotes/${token}`)
      .then((res) => {
        console.log(res.data, "kjlk");
        res.data.data.forEach((element) => {
          datas.push(element);
        });
      });
    return datas;
  },
};

export default controller;
