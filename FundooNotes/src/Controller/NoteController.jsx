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
  pinnote(id) {
    return axios.put(`http://localhost:3000/notes/pin/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },

  archivenote(id) {
    alert("inside controller");
    return axios.put(`http://localhost:3000/notes/archieve/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },

  getprofilelink() {
    return axios.get(`http://localhost:3000/user/files/link`, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  removeprofilepic() {
    return axios.post("http://localhost:3000/user/files/delete", {
      headers: {
        token: token,
        "Content-type": "application/json ",
      },
    });
  },

  colornote(id, color) {
    console.log(id, color);
    return axios.put(
      `http://localhost:3000/notes/addcolor/${id}`,
      null,

      {
        headers: {
          token: token,
          color: color,
          "Content-type": "application/json ",
        },
      }
    );
  },
  createNote(noteDetails) {
    console.log(token);
    return axios.post(`http://fundoonotes.incubation.bridgelabz.com/api/notes/1/user/notes `, noteDetails, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  deletenote(id) {
    return axios.put(`http://localhost:3000/notes/delete/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  editNotes(noteDetails) {
    console.log("remainder date is", noteDetails.reminder);
    return axios.put(
      `http://localhost:3000/notes/update/${noteDetails.noteId}`,
      noteDetails,
      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
  getAllNotes() {
    return axios.get(`http://fundoonotes.incubation.bridgelabz.com/api/notes/1/user/notess `);
  },
  restorenote(id) {
    return axios.put(`http://localhost:3000/notes/restore/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  deletenoteforever(id) {
    return axios.put(`http://localhost:3000/notes/deleteforever/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  emptytrash() {
    return axios.put(`http://localhost:3000/note/emptytrash/${token}`, null, {
      headers: { "Content-type": "application/json " },
    });
  },
  addlabeltonote(noteDetails, id) {
    return axios.put(
      `http://localhost:3000/note/update/label/${id}`,
      noteDetails,
      { headers: { jwt: token, "Content-type": "application/json " } }
    );
  },
  async searchbytitledescription(title) {
    let datas = [];
    await axios
      .get("http://localhost:3000/notes/searchTitle/", {
        headers: { title: title, "Content-type": "application/json " },
      })
      .then((res) => {
        console.log(res.data, "kjlk");
        if (res.data !== null) {
          res.data.forEach((element) => {
            datas.push(element);
          });
        }
        console.log("searched array is :", datas);
      });
    return datas;
  },
  addcollabtonote(collabDetails) {
    return axios.post("http://localhost:3000/collabrator/add", collabDetails, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },

  deletecollabfromnote(collabDetails) {
    return axios.post(
      "http://localhost:3000/collabrator/remove",
      collabDetails,
      {
        headers: { jwt: token, "Content-type": "application/json " },
      }
    );
  },

  deletelabelfornote(id, id1) {
    return axios.delete(`http://localhost:3000/note/delete/label/${id}`, {
      headers: { id1: id1, jwt: token, "Content-type": "application/json " },
    });
  },
};

export default controller;
