import Axios from "axios";
let header= {
    'token':localStorage.getItem('token'),
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
}
class NoteController{
    createNote(noteDetails){
        console.log("Inside NoteController :"+noteDetails.title+", "+noteDetails.description);
        return Axios.post('notes/create',noteDetails,{
            headers:header
        });
    }
}