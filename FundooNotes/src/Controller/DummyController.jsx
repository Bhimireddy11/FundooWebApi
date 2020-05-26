import React, { Component } from "react";

// import Note from "../Data/Note.json";
// getNote() 
// {
// return this.http.get("../src/Data.Note.Json")
// };
import Note from "../Data/Note.json";
 getlogin() 
{
 return this.http.get("../src/Data.login.Json")
 };
getcreateNote(userid)
{

    return this.http.get(`../src/Data/Note.json`, addNotes, {
      headers: {  "Content-type": "application/json " },
    });
}