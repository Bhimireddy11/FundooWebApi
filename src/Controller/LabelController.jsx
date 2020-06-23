import axios from "axios";


const header = {
  Authorization: "Bearer " + localStorage.getItem("logintoken"),
};
const token = localStorage.getItem("logintoken");
var controller = {
  createandmaplabel(labelDetails, noteId) {
    return axios.post(
      `http://localhost:8080/labels/create`,
      labelDetails,

      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
  addlabeltouser(labelDetails) {
    return axios.post(
      `http://localhost:8080/labels/creatyelables`,
      labelDetails,

      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
  addlabeltonote(noteId, labelId) {
    return axios.post(
      `http://localhost:8080/labels/addlabels`,
      null,
      {
        headers: {
          token: token,
          noteId: noteId,
          "Content-type": "application/json ",
        },
      }
    );
  },

  deletelabelfromnote(noteId, labelId) {
    return axios.post(
      `http://localhost:8080/labels/delete`,
      null,

      {
        headers: {
          token: token,
          noteId: noteId,
          "Content-type": "application/json ",
        },
      }
    );
  },
  getAllLabels() {
    var token=localStorage.getItem("token")
    return axios.get(`http://localhost:8080/labels/labels/getalllabel/`+token,);
  },
  editlabelforuser(labelDetails) {
    return axios.post(
      `http://localhost:8080/label/edit/${labelDetails.labelId}`,
      labelDetails,
      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
  deletelabelforuser(labelDetails) {
    return axios.post(
      `http://localhost:8080/label/delete/${labelDetails.labelId}`,
      null,
      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
 
};
export default controller;
