import axios from "axios";

class UserController{
    registration(regDetails){
        console.log("registratrionDetails :"+regDetails);
        return axios.post("/users/register",regDetails);
    
    }
    authentication(loginDetails){
        console.log("Inside User Controller :"+loginDetails.email);
        return axios.post("/users/login",loginDetails);
    }

    forgotPassword(userEmail){
        console.log("Email Info :"+userEmail.email);
        return axios.post("/users/forgotpassword?email="+userEmail.email);
    }

    updatePassword(pswdInfo,token){
        console.log("pswd--->"+pswdInfo.newPassword+" cnfpswd---->"+pswdInfo.cnfPassword);
        return axios.put("/users/updatepassword/"+token,pswdInfo);
    }
}

export default new  UserController();

