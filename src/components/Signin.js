import axios from 'axios';
import React, { Component } from 'react';
import apiUrl from "../apiConfig";

class Signin extends Component {
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

    handleSigninClick = () => {
        axios.post(`${apiUrl}/login`, {
                "username": this.state.username,
                "password": this.state.password
            })
            .then((response) => {
                console.log(response.data)
                window.localStorage.setItem("jwt", response.data.token);
            })
            .then((response) => {
                this.props.userSignedIn()
            })
            .catch((error) => {
                console.log(error);
            })


    }
    render() {
        return(
            <div>
            <h1>Sign In</h1>
            <label>Username</label>
            <input type="text" id="signup-username" onChange={this.onUsernameChange}></input>
            <label>Password</label>
            <input type="text" id="signup-password" onChange={this.onPasswordChange}></input>
            <button onClick={this.handleSigninClick}>Sign In!</button>
        </div>
        )
    }
}

export default Signin