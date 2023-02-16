import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class SubmitComments extends Component{
    constructor(props){
        super(props)
        this.state = {
            comment: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    render() {
        return(
            <>
                <Form.Group>
                    <Form.Label>Comment</Form.Label>
                        <Form.Control type="text" onChange={this.handleChange} value={this.state.comment}/>
                        <Button variant="primary" type="submit" onClick={(e) =>{e.preventDefault(); this.props.handleSubmit(this.state.comment); this.setState({comment: ''})}}>Submit</Button>
                </Form.Group>
            </>
    )}
}

export default SubmitComments