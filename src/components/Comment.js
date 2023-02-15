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
    //     this.setState({
    //         comment: event.target.value
    //     })
    //     // May be call for search result
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
                            onChange={(e)=>{this.props.inputChangedHandler(e, this.props.index)}}/>

                            <button onClick={this.props.updateComment} className={`${this.props.updateClassNameVisible} btn-apex`} >Update</button>

                            <button className={`${this.props.updateClassNameHidden} btn-apex`}  onClick={(event)=>{this.props.saveUpdatedComment(this.props.commentId, event)}} >Save</button>

                            <button onClick={()=>{this.props.deleteComment(this.props.commentId)}} className={`${this.props.updateClassNameVisible} btn-apex`}>Delete</button>  */}
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