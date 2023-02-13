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
                        <Button variant="primary" onClick={this.props.updateComment} >Update</Button>
                        <Button variant="primary" onClick={this.props.deleteComment}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        )} 
    }


export default Comment