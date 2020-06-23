import axios from "axios";


let jwt = localStorage.getItem("logintoken");

const token = localStorage.getItem("logintoken");
var controller = {
  register(registrationDetails) {
     console.log("controller register method ", registrationDetails);
     return axios.post(`http://localhost:8081/users/register`,registrationDetails );
     
  },

  // getprofilelink() {
  //   return axios.post(`http://localhost:8080/user/files/link`, null, {
  //     headers: { token: token, "Content-type": "application/json " },
  //   });
  // },
  login(loginDetails) {
    console.log("controller login method ", loginDetails);
    return axios.post("http://localhost:8081/users/login",loginDetails);
  },
  forgotpassword(forgotDetails) {
    console.log("controller forgotpassword method ", forgotDetails);
   return axios.post("http://localhost:8080/users/forgotpassword",this.forgotDetails

    );
  },
  async addprofilepic(formData) {
    return await axios.post("http://localhost:8080/profile/uploadprofilepic", formData, {
      headers: {
        "content-type": "multipart/form-data",
        token: token,
        enablePublicReadAccess: true,
      },
    });
  },
  removeprofilepic() {
    return axios.post("http://localhost:8080/profile/deleteprofilepic", null, {
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
      "http://localhost:8080/users/resetpassword/" + forgetToken,
      resetDetails
    );
  },
  verification(jwt) {
    console.log("controller verification method ");
    console.log(jwt);
    return axios.get(`http://localhost:8080/verify/${jwt}`);
  },
  getprofilelink() {
    return (
      axios.post("http://localhost:8080/profile/getprofilepic"),
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
  // takenote(noteDetails) {
  //   return axios.post(
  //     "http://localhost:8080/notes/create/" + token,
  //     noteDetails
  //   );
  // },
  // async getNotes() {
  //   let datas = [];
  //    axios
  //     .get(`http://localhost:8080/notes/notes/${token}`)
  //     .then((res) => {
  //       console.log(res.data, "kjlk");
  //       res.data.data.forEach((element) => {
  //         datas.push(element);
  //       });
  //     });
  //   return datas;
  // },
};

export default controller;
