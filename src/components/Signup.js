import axios from 'axios';
import React, { Component } from 'react';
import apiUrl from "../apiConfig";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleRegisterClick = () => {
        axios.post(`${apiUrl}/user`, {
            "user": {
                "username": this.state.username,
                "password": this.state.password
            }
            
        }).then((response) => {
            console.log(response)
        })
    }
    render() {
        return(
            <div>
            <h1>Sign Up</h1>
            <label>Username</label>
            <input type="text" id="signup-username" onChange={this.onUsernameChange}></input>
            <label>Password</label>
            <input type="text" id="signup-password" onChange={this.onPasswordChange}></input>
            <button onClick={this.handleRegisterClick}>Register!</button>
        </div>
        )
    }
}

export default Signup