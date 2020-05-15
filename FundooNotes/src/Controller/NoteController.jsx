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
    return axios.put(`http://localhost:8085/notes/pin/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },

  archivenote(id) {
    alert("inside controller");
    return axios.put(`http://localhost:8085/notes/archieve/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },

  getprofilelink() {
    return axios.get(`http://localhost:8085/user/files/link`, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  removeprofilepic() {
    return axios.post("http://localhost:8085/user/files/delete", {
      headers: {
        token: token,
        "Content-type": "application/json ",
      },
    });
  },
  colornote(id, color) {
    console.log(id, color);
    return axios.put(
      `http://localhost:8085/notes/addcolor/${id}`,
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
    return axios.post(`http://localhost:8085/notes/create`, noteDetails, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  deletenote(id) {
    return axios.put(`http://localhost:8085/notes/delete/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  editNotes(noteDetails) {
    console.log("remainder date is", noteDetails.reminder);
    return axios.put(
      `http://localhost:8085/notes/update/${noteDetails.noteId}`,
      noteDetails,
      {
        headers: { token: token, "Content-type": "application/json " },
      }
    );
  },
  getAllNotes() {
    return axios.get(`http://localhost:8085/note/getallnotes/${token}`);
  },
  restorenote(id) {
    return axios.put(`http://localhost:8085/notes/restore/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  deletenoteforever(id) {
    return axios.put(`http://localhost:8085/notes/deleteforever/${id}`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  emptytrash() {
    return axios.put(`http://localhost:8080/note/emptytrash/${token}`, null, {
      headers: { "Content-type": "application/json " },
    });
  },
  addlabeltonote(noteDetails, id) {
    return axios.put(
      `http://localhost:8080/note/update/label/${id}`,
      noteDetails,
      { headers: { jwt: token, "Content-type": "application/json " } }
    );
  },
  deletelabelfornote(id, id1) {
    return axios.delete(`http://localhost:8080/note/delete/label/${id}`, {
      headers: { id1: id1, jwt: token, "Content-type": "application/json " },
    });
  },
};
export default controller;
