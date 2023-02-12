import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class Comment extends Component{
    render() {
        return(
            <div>
                <Card>
                    <Card.Header>{this.props.username}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        {this.props.comment}
                        </Card.Text>
                        <Button variant="primary">Edit</Button>
                        <Button variant="primary">Delete</Button>
                        <Button variant="primary">Update</Button>
                    </Card.Body>
                </Card>
            </div>
        )} 
    }


export default Comment