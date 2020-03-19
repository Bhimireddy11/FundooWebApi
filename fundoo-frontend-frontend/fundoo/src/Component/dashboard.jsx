
import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
//import AppNavBar from "./AppBar";
//import SideNavBar from "./SideBar";



 class Dashboard extends Component {
    constructor(props) {
         super(props);
         this.state = {
         open: true,
        
        notesOpen: true,
        openDialog:false,
        getNoteArr: []

    };
   }

   handleDialogClose = data => {
    this.setState({ openDialog: false });
  };
     
   handleDraweropen = () => {

    this.setState({ open: !this.state.open })
}

render()
{
    console.log("Daashboar-----------");
    return(
        <div>

            <div>
                <AppNavBar handleDraweropen={this.handleDraweropen} />
                
                {/* <Note
                style={{ display: "flex"}}/> */}

                </div>

                <div style={{ display: "flex", background: "" }} >       
              <SideNavBar 
                show={this.state.open}
              handleDialogOpen={this.handleDialogOpen} />
           
            
            </div>
        </div>

    )
}




}








    
//      render() 
     
//      {
//          return(
//              <div className="dashboard">
//                  <h1>Welcome to react fundoo notes---------Laravel+react</h1>
//                  <h1>Welcome to BridgeLabz</h1>
                
//      </div>
//          )
//      }
      
// }


export default withRouter(Dashboard)

