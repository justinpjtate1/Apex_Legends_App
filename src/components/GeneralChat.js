import React, { Component } from "react"
import Comment from "./Comment"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import apiUrl from "../apiConfig";
import SubmitComments from "./SubmitComment";

class GeneralChat extends Component {
    constructor(props){
        super(props)
        this.ChildElement = React.createRef()
        this.state = {
            commentId: '',
            isDisabled: true
        }
  
        this.deleteComment = this.deleteComment.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // DISPLAY ALL COMMENTS
    componentDidMount = () => {
        axios.get(`${apiUrl}/api/generalchat`, 
        {headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`}
        })
        .then((response) => {
            this.props.setComments(response.data.comment)
        })
        .catch(e => console.log(`error: DISPLAY >>> ${e}`))
    }


    // SAVING COMMENTS TO DATABASE
    handleSubmit = (comment) => {
        axios.post(`${apiUrl}/api/generalchat`, 
            { comment: {
                    userId: this.props.user_id,
                    comment: comment
                }}, 
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },})
            .then((response) => {
                console.log('>>>> response ', response)
            let newComment = {
                "comment": comment, 
                "userId": this.props.user_id,
                "username": this.props.username,
                "_id": response.data.comment._id
            }
            let newAllCommentsSave = this.props.allComments.concat([newComment])
            this.props.setComments(newAllCommentsSave)
          })  
          .catch(e => console.log(`error: SAVE >>> ${e}`))
    
      }

    // DELETE COMMENT
    deleteComment = (commentId) => {
        axios.delete(`${apiUrl}/api/generalchat/${commentId}`, 
        {headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
        })
        .then((response) => {
            let newAllCommentsDelete =  this.props.allComments.filter((comment) => {
                return comment._id !== commentId
            })
            this.props.setComments(newAllCommentsDelete)
        })
        .catch(e => console.log(`error: DELETE >>> ${e}`))  
    }  


    // UPDATED COMMENT
    UpdateComment = (commentId, comment) => {
        axios.put(`${apiUrl}/api/generalchat/${commentId}`, 
        {comment: {
            _id: commentId,
            userId: this.props.user_id,
            comment: comment
        }},
        {headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }}
        )
        .then((response) => {
            console.log(response)
        })  
        .catch(e => console.log(`error: UPDATE >>> ${e}`)) 
 } 
    

 render() {
    const commentsList = this.props.allComments.map((comment, index) => {
        console.log()
        return <Comment 
        comment={comment.comment}
        commentId={comment._id}
        currentUsername={comment.username}
        databaseUsername = {comment.userId.username}
        userId={comment.userId}
        deleteComment={this.deleteComment}
        index={index}
        key={comment._id}
        updateComment={this.UpdateComment}
        handleSubmit={this.handleSubmit}
        />
    })
        return(
            <div>
                <h1> General Chat </h1>
                <SubmitComments 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                />
               {commentsList}
            </div>
        )
    } 
}

export default GeneralChat;
