import React, { Component } from "react";
import Button from 'react-bootstrap/Button';



class CommentButtons extends Component{

    render() {
        return(
            <>
                    <Button variant="primary"  
                    className={`${this.props.updateClassNameHidden}`}  
                    onClick={(event)=>{this.props.saveUpdatedComment(this.props.commentId, event)}} >Save</Button>

                    <Button variant="primary" onClick={this.props.updateComment} className={`${this.props.updateClassNameVisible}`} >Update</Button>

                    <Button variant="primary" onClick={()=>{this.props.deleteComment(this.props.commentId)}} className={`${this.props.updateClassNameVisible}`}>Delete</Button>
            </>
        )
    }
}

export default CommentButtons