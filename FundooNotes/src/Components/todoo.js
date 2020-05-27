import React, { Component, PropTypes } from 'react'
 //import { connect } from 'react-redux'
 import { createBlogPost } from '../../actions/todoadd';
 import { addTodo } from '../../actions/todo'
 import { setTodoDialogOpen, setErrorText } from '../../actions/todoDialog';
 import Dialog from 'material-ui/Dialog';
 import FlatButton from 'material-ui/FlatButton';
 import RaisedButton from 'material-ui/RaisedButton';
 import TextField from 'material-ui/TextField';


const initialstate = {
title: '',
desc: '',
type: '',
imageurl: ''
}

class TodoDialog extends Component {
constructor(props) {
    super(props)
    this.state = initialstate;
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
};

onChange(e) {
    if (e.target.id === 'title') {
        this.setState({ title: e.target.value });
    } else if (e.target.id === 'desc') {
        this.setState({ desc: e.target.value });
    } else if (e.target.id === 'type') {
        this.setState({ type: e.target.value });
    } else if (e.target.id === 'image') {
        this.setState({ imageurl: e.target.value});
        console.log(e.target.value);
    }
}

handleSubmit() {
    const text = {
        news_title: this.state.title,
        news_description: this.state.desc,
        news_type: this.state.type,
        news_src_url: this.state.imageurl,
        operation:"insert"
    }
    alert(text.news_src_url);
    createBlogPost(text);
    setErrorText(undefined);
    setTodoDialogOpen(false);

};


render() {
    const { messages, todoDialog, setTodoDialogOpen, addTodo, setErrorText } = this.props;
    const styles = {
        button: {
            margin: 12,
        },
        exampleImageInput: {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
        },
    };

    function handleClose() {
        setErrorText(undefined);
        setTodoDialogOpen(false);
    };

    const actions = [< FlatButton label={
        messages.cancel || 'cancel'
    }
        primary={
            true
        }
        onTouchTap={
            handleClose
        } />, < FlatButton label={
            messages.submit || 'submit'
        }
            primary={
                true
            }
            onTouchTap={this.handleSubmit} />
    ];

    return (
        <div>
            <Dialog title={messages.todo_add || 'todo_add'} actions={actions} modal={false} open={todoDialog.open} onRequestClose={handleClose}>
                <form>
                    <TextField ref="todoText1" onChange={this.onChange} id='title' hintText={messages.todo_hint1 || 'todo_hint'} errorText={todoDialog.errorText} floatingLabelText={messages.todo_label1 || 'todo_label1'} fullWidth={true} />
                    <TextField ref="todoText2" onChange={this.onChange} id='desc' hintText={messages.todo_hint2 || 'todo_hint'} errorText={todoDialog.errorText} floatingLabelText={messages.todo_label2 || 'todo_label2'} fullWidth={true} multiLine={true} rows={1} rowsMax={3} />
                    <TextField ref="todoText3" onChange={this.onChange} id='type' hintText={messages.todo_hint3 || 'todo_hint'} errorText={todoDialog.errorText} floatingLabelText={messages.todo_label3 || 'todo_label3'} fullWidth={true} />
                    <RaisedButton label='ADD Photo' style={styles.button} labelPosition="before" containerElement="label"><input type='file' onChange={this.onChange} id='image' style={styles.exampleImageInput} /></RaisedButton>
                </form>
            </Dialog>
        </div>
    )
}
}
export default todoo;