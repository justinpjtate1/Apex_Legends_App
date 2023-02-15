import React, { Component } from "react"
import Comment from "./Comment"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import apiUrl from "../apiConfig";

class GeneralChat extends Component {
    constructor(props){
        super(props)
        this.state = {
            comment: '',
            commentId: '',
            updateComment: '',
            updateClassNameHidden: 'hidden',
            updateClassNameVisible: '',
            isDisabled: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
        this.updateComment = this.updateComment.bind(this)

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


    // SAVE INPUT
    handleChange = (event) => {
        this.setState({
            comment: event.target.value
        })
        }


    // SAVING COMMENTS TO DATABASE
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${apiUrl}/api/generalchat`, 
            { comment: {
                    userId: this.props.user_id,
                    comment: this.state.comment
                }}, 
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },})
            .then((response) => {
                console.log('>>>> response ', response)
            let newComment = {
                "comment": this.state.comment, 
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
        console.log(' delete ', commentId);
        axios.delete(`${apiUrl}/api/generalchat/${commentId}`, 
        {headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
        })
        .then((response) => {
            let newAllCommentsDelete =  this.props.allComments.filter((comment) => {
                console.log('comment id', comment._id)
                return comment._id !== commentId
            })
            this.props.setComments(newAllCommentsDelete)
        })
        .catch(e => console.log(`error: DELETE >>> ${e}`))  
    }  


    // UPDATE COMMENT
    updateComment = (event) => {
        event.preventDefault()
        this.setState({
            updateClassNameHidden: '',
            isDisabled: false,
            updateClassNameVisible: 'hidden'
        })
    }


    // SAVE UPDATED COMMENT
    saveUpdatedComment = (commentId, event) => {
        console.log('>> event ', event);
        axios.put(`${apiUrl}/api/generalchat/${commentId}`, 
        {comment: {
            _id: commentId,
            userId: this.props.user_id,
            comment: event.target.parentElement[0].value
        }},
        {headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }}
        )
        .then((response) => {
            console.log(response)

        })  
        .catch(e => console.log(`error: UPDATE >>> ${e}`)) 


        this.setState({
        updateClassNameHidden: 'hidden',
        isDisabled: true,
        updateClassNameVisible: ''
        })
        
 } 
    

    render() {
        const commentsList = this.props.allComments.map((comment, index) => {
            console.log()
            return <Comment 
            comment={comment.comment}
            currentUsername={comment.username}
            databaseUsername = {comment.userId.username}
            key={index}
            index={index}
            deleteComment={this.deleteComment}
            updateComment={this.updateComment}
            commentId={comment._id}
            updateClassNameHidden={this.state.updateClassNameHidden}
            saveUpdatedComment={this.saveUpdatedComment}
            isDisabled={this.state.isDisabled}
            updateClassNameVisible={this.state.updateClassNameVisible}
            inputChangedHandler={this.inputChangedHandler} />
        })
            
        return(
            <div>
                <h1> General Chat </h1>
                <Card>
                    <Card.Header>Comment</Card.Header>
                    <Card.Body>
                        <input type="text" onChange={this.handleChange} />
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                    </Card.Body>
                </Card>
               {commentsList}
            </div>
        )
    } 
}

export default GeneralChat;