import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Comment extends Component{

    constructor(props){
        super(props)
        this.state = {
            comment: this.props.comment
        }
    }

    inputChangedHandler = (event) => {
        this.setState({
            comment: event.target.value
        })
        // May be call for search result
    }

    render() {
        return(
            <div>
                    <Form.Group>
                        <Form.Label>{this.props.username}</Form.Label>

                        <Form>
                            <Form.Control type="text" 
                            value={this.state.comment} 
                            disabled={this.props.isDisabled}
                            onChange={(e)=>{this.inputChangedHandler(e)}}/>

                            <Button variant="primary" onClick={this.props.updateComment} className={`${this.props.updateClassNameVisible}`} >Update</Button>

                            <Button variant="primary"  className={`${this.props.updateClassNameHidden}`}  onClick={(event)=>{this.props.saveUpdatedComment(this.props.commentId, event)}} >Save</Button>

                            <Button variant="primary" onClick={()=>{this.props.deleteComment( this.props.commentId)}} className={`${this.props.updateClassNameVisible}`}>Delete</Button>
                        </Form>
                    </Form.Group>
            </div>
        )} 
    }


export default Comment