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
            allComments: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
        this.updateComment = this.updateComment.bind(this)

    }

    // DISPLAY ALL COMMENTS
    componentDidMount = () => {
            axios.get(`${apiUrl}/api/generalchat`, 
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
            })
            .then((response) => {
                console.log(response)
                this.setState({
                    allComments: response.data.comment,
                    comment: ''
                })
            })
            .catch(e => console.log(`error: DISPLAY >>> ${e}`))
    }

    handleChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    // SAVING COMMENTS TO DATABASE
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.user_id)
        axios.post(`${apiUrl}/api/generalchat`, 
            { 
                comment: {
                    userId: this.props.user_id,
                    comment: this.state.comment,
                    
                }
            }, 
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            })
          .then((response) => {
            let newComment = {
                "comment": this.state.comment, 
                "userId": this.props.user_id
            }
            this.setState({ 
                allComments: [...this.state.allComments, newComment],
                comment: '' })
          })  
          .catch(e => console.log(`error: SAVE >>> ${e}`))
      }

    // DELETE COMMENT
    deleteComment = (event) => {
    event.preventDefault();
        axios.delete(`${apiUrl}/api/generalchat/${this.props.user_id}`, 
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
        })
        .then((response) => {
            console.log('response >>>',response)
            this.setState({
                allComments: response.data.comment,
                comment: ''
            })
        })
        .catch(e => console.log(`error: DELETE >>> ${e}`))  
    }  

    // UPDATE COMMENT
    updateComment = (event) => {
        event.preventDefault();
        axios.delete('/api/generalchat/:id', 
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
        })
        .then((response) => {
            return response.data
        })  
        .catch(e => console.log(`error: UPDATE >>> ${e}`)) 
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
               { this.state.allComments.sort(function(a, b){
                return new Date(a.date) - new Date(b.date);
                }).map((comment, index) => {
                return <Comment 
                comment={comment.comment}
                username={this.props.username}
                key={index} 
                deleteComment={this.deleteComment}
                updateComment={this.updateComment}
                />}) }
            </div>
        )
    } 
}


export default GeneralChat














