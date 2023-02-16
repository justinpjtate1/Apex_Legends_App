import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import CommentButtons from "./CommentButtons";
import { findDOMNode } from 'react-dom'


class Comment extends Component{

    constructor(props){
        super(props)
        this.state = {
            editing: false,
            comment: this.props.comment
        }
    }

    inputChangedHandler = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    changeView = (view) => {
        if (localStorage.getItem('user') === this.props.userId._id || localStorage.getItem('user') ===  this.props.userId){
            if(view === 'show'){
            this.setState({
                editing: false
            })
            this.props.updateComment(this.props.commentId, this.state.comment)
        } else if (view === 'edit'){
            this.setState({
                editing: true
            })
        }
        }
        
    }

    render() {
        return(
            <div>
                    <Form.Group>
                        {!this.props.currentUsername && <Form.Label>{this.props.databaseUsername}</Form.Label>}
                        {this.props.currentUsername && <Form.Label>{this.props.currentUsername}</Form.Label>}

                        <Form className='visible'>
                            <Form.Control type="text" 
                            value={this.state.comment} 
                            disabled={!this.state.editing}
                            onChange={this.inputChangedHandler}/>

                            <CommentButtons 
                            commentId={this.props.commentId}
                            deleteComment={this.props.deleteComment}
                            changeView={this.changeView}
                            isEditing={this.state.editing}
                            />

                        </Form>
                    </Form.Group>
            </div>
        )} 
    }


export default Comment