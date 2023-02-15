import React, { Component } from "react";
import Button from 'react-bootstrap/Button';



class CommentButtons extends Component{

    render() {
        return(
            <>
                    <button
                    className={`${this.props.updateClassNameHidden} btn-apex`}  
                    onClick={(event)=>{this.props.saveUpdatedComment(this.props.commentId, event)}} >Save</button>

                    <button onClick={this.props.updateComment} className={`${this.props.updateClassNameVisible} btn-apex`} >Update</button>

                    <button onClick={()=>{this.props.deleteComment(this.props.commentId)}} className={`${this.props.updateClassNameVisible} btn-apex`}>Delete</button>
            </>
        )
    }
}

export default CommentButtons