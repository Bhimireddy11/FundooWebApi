import Axios from "axios";

let headers= {
    'token':localStorage.getItem('token'),
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
}
export function getUserLabel(){
    return Axios.get('labels',{
        headers:headers
    });
}
export function addUserLabel(labelName){
    console.log(labelName);
    return Axios.post('labels/create?labelName='+labelName,null,{
        headers:headers
    })
}
export function deleteLabel(labelId){
    console.log(labelId);
    return Axios.delete('labels/delete?labelId='+labelId,{
        headers:headers
    })
}
export function editLabel(labelInfo){
    console.log(labelInfo.labelId+", "+labelInfo.name);
    return Axios.put('labels/update?labelId='+labelInfo.labelId,labelInfo,{
        headers:headers
    })
}
export function mapLabelwithNote(labelInfo){
    console.log(labelInfo.noteId+", "+labelInfo.labelName);
    return Axios.post('addlabels',null,{
        headers:headers,
        params:labelInfo
    })
}
export function removeLabelFromNote(labelInfo){
    console.log(labelInfo);
    return Axios.delete('labels/remove',{
        headers:headers,
        params:labelInfo
    })
}