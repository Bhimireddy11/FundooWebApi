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
    updateNote(noteInfo){
        console.log('updated data :'+noteInfo.noteId+" ,"+noteInfo.title+" ,"+noteInfo.description);
        return Axios.put('notes/update?noteId='+noteInfo.noteId,noteInfo,{
            headers:header
        });
    }

    deleteNote(noteId){
        console.log("NOTE ID :"+noteId);
        return Axios.delete('notes/delete/'+noteId,{
            headers:header
        });
    }
    allNotes(){
        // console.log("Inside allNotes method...");
        return Axios.get('notes',{
            headers:header
        });
    }
   
    pinNote(noteId){
        console.log("NOTE ID :"+noteId);
        return Axios.put('notes/pin?noteId='+noteId,null,{
            headers:header
        });
    }

    archiveNote(noteId){
        console.log("NOTE ID :"+noteId);
        return Axios.put('notes/archive/'+noteId,null, {
            headers:header
        });
    }
    setReminder(reminder){
        console.log("DATA :"+reminder.datetime);
        return Axios.put('notes/reminder?noteId='+reminder.noteId,reminder,{
            headers:header
        });
    }

    deleteReminder(noteId){
        return Axios.delete('reminder/delete?noteId='+noteId,{
            headers:header
        });
    }

    addColour(colorInfo){
        console.log("COLOR :",colorInfo.noteId+" , "+colorInfo.color);
        return Axios.put('notes/color/'+colorInfo.noteId,colorInfo,{
            headers:header
        })
    }
    permanentDelete(noteId){
        return Axios.delete('notes/permanentDelete/'+noteId,{
            headers:header
        })
    }
}
export default new  NoteController();
