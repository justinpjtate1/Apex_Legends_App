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
            allComments: [{"comment": "Hello"}, {"comment": "Pickles"}]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount () {
            axios.get(`${apiUrl}/api/generalchat`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
            })
            .then((response) => {
                console.log(response)
                return response.data
            }).then((results) => {
                console.log(results)
                if (results.length > 0){
                    // setting state for all comments in the database
                    this.setState({
                        allComments: results
                    })
                }
            })
    }

    handleChange (event) {
        this.setState({
            comment: event.target.value
        })
    }


    handleSubmit(event) {
        console.log(event)
        event.preventDefault();
        // pushing comment to database
        axios.post(`${apiUrl}/api/generalchat`, 
            { 
                userId: this.props.user_id,
                comment: this.state.comment
            }, 
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            })
          .then((response) => {
              return response.data
          })  

          // array in a state >>> pushing comment to allComments array
          this.setState(prevState => ({
            allComments: [ {"comment": this.state.comment}, ...prevState.allComments]
          }))
      }

    // addNewComment = () => {
    //     console.log('>> this.state.allComments ', this.state.allComments);
    //     if (this.state.allComments.length > 0){
    //         this.state.allComments.map((comment, index) => {
    //         return <Comment 
    //         comment={comment.comment}
    //         key={index} />
    //      })}
    // }



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
            key={index} />}) }
            </div>
        )
    } 
}


export default GeneralChat