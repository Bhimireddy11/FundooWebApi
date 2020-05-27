

 getlogin() 
{
 return this.http.get("../src/Data.login.Json")
 };

  getNotes ()
   {
    return this.http.get("src/Data/Note.json")
    .map(res => res.json());
    
    };
  
  