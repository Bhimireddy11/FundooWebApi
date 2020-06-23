import serviceConstant from '../const'
import firebase from 'firebase'
import fire from '../config/fire'
import jwt from 'jsonwebtoken'
const db = firebase.firestore();
export async function registration(data) {
  console.log("enterd in user registration controller")
  let userData = {
    firstName: data.firstName,
    // lastName: data.lastName,
    email: data.email,
    password: data.password,
    phoneNumber: data.phoneNumber,
  }
  try {
    let response = await fire.auth().createUserWithEmailAndPassword(data.email, data.password);
    console.log('this is firebase', response)
    //this is my url
    let currentUser = fire.auth().currentUser.uid
    console.log("current user data", currentUser);

    let userdetails = db.collection('users').doc(currentUser).set(userData);
    console.log("register succes", userdetails)
    let verification = fire.auth().currentUser.sendEmailVerification();
    console.log("email verification send to your mail", verification)
    return response;
  }
  catch (error) {
    console.log(error)
    return error.message
  }
}