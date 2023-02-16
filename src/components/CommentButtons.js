import React, { Component } from "react";


class CommentButtons extends Component{

    componentDidMount = () => {

    }

    render() {

        let actionBtn = null
        if(this.props.isEditing === false) {
            actionBtn =  <>
                            <button onClick={(e) => {e.preventDefault(); this.props.changeView('edit')}} className={`btn-apex`} >Update</button>
                            
                            <button onClick={(event)=>{event.preventDefault(); this.props.deleteComment(this.props.commentId)}} className={`btn-apex`}>Delete</button>
                        </>
        } else {
            actionBtn = <button className={`btn-apex`}  onClick={(e) => {e.preventDefault(); this.props.changeView('show')}} >Save</button>
        }
        return(
            <>
                {actionBtn}
            </>
        )
    }
}

export default CommentButtons