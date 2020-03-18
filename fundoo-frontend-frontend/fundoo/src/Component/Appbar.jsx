import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { MuiThemeProvider, createMuiTheme, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import AppsIcon from '@material-ui/icons/Apps';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
//import Logout from '../Components/Logout';
import { withRouter } from 'react-router-dom'
import SideNav from '../Component/SideNav';
import controller from '../Controller/noteController';

const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "black",
                view: true,

            },
            // height: "48px",
        },
    }
})
class Appbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawer: true,
            drawerClose: false,
            searchedTitle: '',
            searchedNotes: []

        }
    }


    handleRefresh = () => {
        window.location.reload();
    }





    handleView = () => {
        this.setState({
            view: !this.state.view
        })
        this.props.viewprop(true)
        console.log(this.state.view)

    }




    handleDrawerOpen = async () => {
        await this.setState({ drawer: !this.state.drawer })
        this.props.slide(this.state.drawer)

    }
    handleClickCloseAway = () => {
        this.setState({ drawer: false })

        // this.props.slideClose(this.state.drawer)
    }


    handleSearch = () => {
        this.props.history.push("/search")
    }



    handleSeachState = async (e) => {
        // await this.setState({
        //     searchedTitle: e.target.value 
        // })
        //console.log(e.target.value)
        controller.search(e.target.value).then((res) => {
            console.log(res.data);
            this.setState({
                searchedNotes: res.data.obj
            });
            this.props.appToDisplay(this.state.searchedNotes)
        }).catch((err) => {
            console.log("in error");
            console.log("error", err.data);
            this.setState({ message: 'failed to load the data' })
        });


    }


    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="appBar-main">
                    <AppBar >
                        <Toolbar className="appBar-tool" >
                            <div className="fulldiv">

                                <div className="icons">
                                    <div>
                                        < IconButton onClick={this.handleDrawerOpen} >
                                            <MenuIcon />
                                        </ IconButton>
                                        <SideNav menu={this.state.drawer} />
                                    </div>
                                    <div className="logo">
                                        <img width="40px" height="40px" src={require('../Assets/keep.jpg')}></img>
                                    </div>
                                    <span className="name">Fundoo</span>
                                </div>
                                <div className="search">
                                    <div className="searchIcon">
                                        <IconButton >
                                            <SearchIcon />
                                        </IconButton>
                                    </div>
                                    <div className="inputField">
                                        <InputBase
                                            className="inputField"
                                            placeholder="Search....."
                                            //value={this.state.search}
                                            onClick={this.handleSearch}
                                            onChange={this.handleSeachState}

                                        />
                                    </div>
                                    <div className="cancelButton">
                                        <IconButton >
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="middleOne">
                                    <div className="refreshIcon">
                                        <IconButton onClick={this.handleRefresh}>
                                            <RefreshIcon />
                                        </IconButton>
                                    </div>
                                    <div>

                                        <IconButton onClick={this.handleView}>
                                            {this.state.view ? <ViewAgendaIcon /> : <ViewColumnIcon />}
                                        </IconButton>

                                    </div>
                                    <div>
                                        <IconButton >
                                            <SettingsOutlinedIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="lastIcons">
                                    <div>
                                        <IconButton >
                                            <AppsIcon />
                                        </IconButton>
                                    </div>
                                    {/* <Logout></Logout> */}
                                </div>


                            </div>


                        </Toolbar>

                    </AppBar>

                </div></MuiThemeProvider>
        )
    }
}
export default withRouter(Appbar);