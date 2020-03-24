import Axios from "axios";

let headers= {
    'token':localStorage.getItem('token'),
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
}
export function uploadFile(file){
    return Axios.post('uploadfile', null, {
        headers: headers,
        params: file
    });
}s