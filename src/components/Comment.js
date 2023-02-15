import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CommentButtons from "./CommentButtons";


class Comment extends Component{

    // constructor(props){
    //     super(props)
    //     this.state = {
    //         comment: this.props.comment
    //     }
    // }

    // inputChangedHandler = (event) => {

    //         this.setState({
    //         comment: event.target.value
    //     })

    // }

    render() {
        return(
            <div>
                    <Form.Group>
                        {!this.props.currentUsername && <Form.Label>{this.props.databaseUsername}</Form.Label>}
                        {this.props.currentUsername && <Form.Label>{this.props.currentUsername}</Form.Label>}

                        <Form>
                            <Form.Control type="text" 
                            value={this.props.comment} 
                            disabled={this.props.isDisabled}
                            onChange={(e)=>{this.inputChangedHandler(e)}}/>

                            <Button variant="primary" onClick={this.props.updateComment} className={`${this.props.updateClassNameVisible}`} >Update</Button>

                            <Button variant="primary"  className={`${this.props.updateClassNameHidden}`}  onClick={(event)=>{this.props.saveUpdatedComment(this.props.commentId, event)}} >Save</Button>

                            <Button variant="primary" onClick={()=>{this.props.deleteComment(this.props.commentId)}} className={`${this.props.updateClassNameVisible}`}>Delete</Button> 

                            <CommentButtons 
                            updateComment={this.props.updateComment}
                            updateClassNameHidden={this.props.updateClassNameHidden}
                            updateClassNameVisible={this.props.updateClassNameHidden}
                            commentId={this.props.commentId}
                            saveUpdatedComment={this.props.saveUpdatedComment}
                            deleteComment={this.props.deleteComment}
                            />

                        </Form>
                    </Form.Group>
            </div>
        )} 
    }


export default Comment