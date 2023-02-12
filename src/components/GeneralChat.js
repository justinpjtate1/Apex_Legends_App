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
    }

    // 
    getGeneralChat = () => {
        axios.get(`${apiUrl}/api/generalchat`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
        })
        .then((response) => {
            return response.data
        }).then((results) => {
        console.log(results)
            this.setState({
                allComments: results
            })
        })
    }



    handleChange (event) {
        console.log('hey')
        this.setState({
            comment: event.target.value
        })
    }

    handleSubmit(event) {
        console.log(event)
        event.preventDefault();

        console.log(localStorage.getItem("jwt"))
        // saving it 
        axios.post(`${apiUrl}/api/generalchat`, {
            comment: this.state.comment
          }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
          })
          .then((response) => {
              return response.data
          })


        
      }
    addNewComment = () => { 
        this.state.allComments.map((comment) => {
        return <Comment 
        username={comment.username}
        comment={comment.comment}/>
    })}


    editComment() {

    }

    deleteComment() {

    }

    updateComment() {

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
               { this.addNewComment }
            </div>
        )
    } 
}


export default GeneralChat