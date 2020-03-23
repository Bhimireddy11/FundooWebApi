import Axios from "axios";
//const baseURL = "http://localhost:8081";

class UserController{

    userRegistration(regDetails){
        return Axios.post("/users/register",regDetails);
    }

    authentication(loginDetails){
        console.log("Inside User Controller :"+loginDetails.email);
        return Axios.post("/users/login",loginDetails);
    }

    forgotPassword(userEmail){
        console.log("Email Info :"+userEmail.email);
        return Axios.post("/users/forgotpassword?email="+userEmail.email);
    }

    updatePassword(pswdInfo,token){
        console.log("pswd--->"+pswdInfo.newPassword+" cnfpswd---->"+pswdInfo.cnfPassword);
        return Axios.put("/users/updatepassword/"+token,pswdInfo);
    }
}
export default new  UserController();