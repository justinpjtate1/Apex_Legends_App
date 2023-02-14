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
            allComments: [],
            updateClassNameHidden: 'hidden',
            updateClassNameVisible: '',
            isDisabled: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
        this.updateComment = this.updateComment.bind(this)
        this.getCommentId = this.getCommentId.bind(this)
    }


    // GENERAL CHAT GET
    getAllComments = () => {
        axios.get(`${apiUrl}/api/generalchat`, 
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
        })
        .then((response) => {
            this.setState({
                allComments: response.data.comment,
                comment: ''
            })
        })
        .catch(e => console.log(`error: DISPLAY >>> ${e}`))
    }


    // DISPLAY ALL COMMENTS
    componentDidMount = () => {
        this.getAllComments()
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
            let newComment = {
                "comment": this.state.comment, 
                "userId": this.props.user_id
            }
            this.setState(prevState =>{ 
                return{
                    allComments: [...prevState.allComments, newComment]
                }
                })
          })  
          .catch(e => console.log(`error: SAVE >>> ${e}`))
          console.log(this.state.allComments)
      }


    // GETTING COMMENT ID
    getCommentId = (event) => {
        console.log('get comment id')
        axios.get(`${apiUrl}/api/generalchat/`, 
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
            })
            .then((response) => {
                console.log(response)
                this.setState({
                    commentId: response.data.comment._id
                })
            })
            .catch(e => console.log(`error: COMMENT ID >>> ${e}`))
            console.log(this.state.commentId)
    }

    // DELETE COMMENT
    deleteComment = (event, param) => {
        event.preventDefault();
        console.log('event >>> ', event.target)
        console.log("comment id >>>", event.target.getAttribute("data-commentid"))

        // on page load, save the id into data attribute
        let clickedCommentId =  event.target.getAttribute("data-commentid");

        // const allComments = 

        axios.delete(`${apiUrl}/api/generalchat/${clickedCommentId}`, 
        {headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
        })
        .then((response) => {
            console.log('response >>>', response)
            this.getAllComments()
        })
        .catch(e => console.log(`error: DELETE >>> ${e}`))  

        // const comments = this.state.allComments.filter(item => item.id !== id)
        // this.setState({allComments})

    }  


    // UPDATE COMMENT
    updateComment = (event) => {
        event.preventDefault();

        this.setState({
            updateClassNameHidden: '',
            isDisabled: false,
            updateClassNameVisible: 'hidden'
        })
    }

        
    // SAVE UPDATED COMMENT
    saveUpdatedComment = (event) => {
        event.preventDefault()
        console.log(event)
        // getting the input value
        console.log('value >>> ', event.target.parentElement[0].value)

        let clickedCommentId =  event.target.getAttribute("data-commentid")

        axios.put(`/api/generalchat/${clickedCommentId}`, 
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }, comment: {
            userId: this.props.user_id,
            comment: event.target.parentElement[0].value
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
               { this.state.allComments.map((comment, index) => {
                    return <Comment 
                        comment={comment.comment}
                        username={this.props.username}
                        key={index}
                        deleteComment={this.deleteComment}
                        updateComment={this.updateComment}
                        dataattribute={comment._id}
                        updateClassNameHidden={this.state.updateClassNameHidden}
                        saveUpdatedComment={this.saveUpdatedComment}
                        isDisabled={this.state.isDisabled}
                        updateClassNameVisible={this.state.updateClassNameVisible}
                />}) }
            </div>
        )
    } 
}


export default GeneralChat
