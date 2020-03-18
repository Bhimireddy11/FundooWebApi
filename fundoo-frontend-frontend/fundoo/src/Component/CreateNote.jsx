import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { InputBase, MuiThemeProvider, createMuiTheme, Tooltip } from '@material-ui/core';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import Button from '@material-ui/core/Button';
import noteController from '../Controller/noteController';


const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            padding: "12px 8px 7px"

        },
        MuiSvgIcon: {
            root: {
                fontSize: "1.2rem"
            }
        }


    }
})
export default class CreateNote extends Component {


    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            title: '',
            description: '',
            craeteNote: false,
        }
    }

    handleClickOpen = () => {
        this.setState({
            openNote: true
        })
    }
    handleClickClose = () => {
        this.setState({
            openNote: false
        })
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    onChangeDescription = (event) => {
     
        this.setState({
            description: event.target.value
        })
    }
    onClose = () => {

        if (this.state.title === '' && this.state.description === '') {
            this.setState({
                openNote: false
            }) 
        }
        else{
            var noteDetails = {
                "title": this.state.title,
                "description": this.state.description
            }
            console.log('in note create ',noteDetails)
            this.setState({
                openNote: false
            })
            controller.createNote(noteDetails).then((res) => {
                console.log(res.data)
                this.setState({
                    title:'',
                    description:'',
                    craeteNote : true
                })
                 this.props.response(this.state.craeteNote)
            }).catch((err) => {
                console.log("in error");
                console.log("error", err.response.data);
              
            })
        }
    }


    render() {
        return (
            <div className="createNote-container">
                <div className="noteComponent">
                    {!this.state.openNote ? (
                        <Card className="note-button">
                            <MuiThemeProvider theme={theme}>
                                <InputBase className="inputbase" style={{ width: "100%", padding: "10px" }}
                                    multiline
                                    spellCheck={true}
                                    placeholder="Take a note...."
                                    onClick={this.handleClickOpen}
                                />
                            </MuiThemeProvider>

                        </Card>
                    ) : (
                            <Card>
                                <div>
                                    <InputBase className="inputbase" style={{ width: "100%", padding: "10px", fontWeight: "bold", fontSize: "120%" }}
                                        multiline
                                        // spellCheck={true}
                                        placeholder="Tittle...."
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}

                                    />
                                    <InputBase className="inputbase" style={{ width: "100%", padding: "10px" }}
                                        multiline
                                        // spellCheck={true}
                                        placeholder="Description...."
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}

                                    />
                                </div>

                                <MuiThemeProvider theme={theme}>
                                    <div>
                                        <div className="buttons">
                                            <div>
                                                <Tooltip title="reminder">
                                                    <IconButton aria-label="reminder" className="iconButtons">
                                                        <AddAlertIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip title="collaborator">
                                                    <IconButton aria-label="reminder">
                                                        <PersonAddIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip title="colour">
                                                    <IconButton aria-label="colour">
                                                        <PaletteOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip title="Archive">
                                                    <IconButton aria-label="Archive">
                                                        <ArchiveOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                            <Button className="CloseButton" onClick={this.onClose}>
                                                Close
                                             </Button>

                                        </div>
                                        {/* <div className="CloseButton"> */}
                                        {/* onClick={this.handleClickClose }
                                    
                                    } */}

                                        {/* </div> */}
                                    </div>
                                </MuiThemeProvider>

                            </Card>
                        )}
                </div>
               
            </div>
        )
    }
}