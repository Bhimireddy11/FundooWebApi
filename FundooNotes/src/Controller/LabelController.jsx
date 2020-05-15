import axios from "axios";

// let header = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'jwt': localStorage.getItem('logintoken')
// }
const header = {
  Authorization: "Bearer " + localStorage.getItem("logintoken"),
};
const token = localStorage.getItem("logintoken");
var controller = {
  createandmaplabel(labelDetails, noteId) {
    return axios.post(
      `http://localhost:3000/label/createandmap/${noteId}`,
      labelDetails,

      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
  addlabeltouser(labelDetails) {
    return axios.post(
      `http://localhost:3000/label/add/`,
      labelDetails,

      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
  addlabeltonote(noteId, labelId) {
    return axios.post(
      `http://localhost:3000/label/addlabeltonote/${labelId}`,
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
      `http://localhost:3000/label/removelabelfromnote/${labelId}`,
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
    return axios.get(`http://localhost:3000/label/alllabels`, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  editlabelforuser(labelDetails) {
    return axios.post(
      `http://localhost:3000/label/edit/${labelDetails.labelId}`,
      labelDetails,
      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
  deletelabelforuser(labelDetails) {
    return axios.post(
      `http://localhost:3000/label/delete/${labelDetails.labelId}`,
      null,
      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
  // async getLabelsInsideNote(id) {

  //   let datas = []
  //   console.log("magic", id)
  //   await axios.get(`http://localhost:3000/label/labelsinsidenotes/${token}`, null,
  //     { headers: { id: id, "Content-type": "application/json " } }).then(res => {
  //       console.log(res.data, "labels controller get all labels method")
  //       res.data.object.forEach(element => {

  //         datas.push(element)
  //       });
  //     })
  //   return datas
  // }
};
export default controller;
