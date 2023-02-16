import axios from 'axios';
import React, { Component } from 'react';
import apiUrl from "../apiConfig";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            signUpMessage: ""
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
        axios.get(`${apiUrl}/api/users/${this.state.username}`)
        .then((response) => {
            if(response.data.user) {
                if(this.state.username.length >= 8) {
                    this.setState({
                        signUpMessage: "Username already exists! Please try another."
                    })
                }
            }
        })
        .catch((error) => {
            if(this.state.username.length >= 8 && this.state.password.length >= 8) {
                axios.post(`${apiUrl}/api/user`, {
                    "user": {
                        "username": this.state.username,
                        "password": this.state.password
                    }
                    
                }).then((response) => {
                    this.setState({
                        signUpMessage: "Sign up succssful! Please use the Sign In link to access your account."
                    })
                })
            } else {
                this.setState({
                    signUpMessage: "Username and password need to be at least 8 characters."
                })
            }
        })
        
    }
    render() {
        return(
            <div>
                <h1 className='page-header'>Sign Up</h1>
                <div className='center-align'>
                    <label className='normal margin-ten'>Username: </label>
                    <input className='card-input margin-ten' type="text" id="signup-username" onChange={this.onUsernameChange}></input><br/>
                    <label className='normal margin-ten'>Password: </label>
                    <input className='card-input margin-ten' type="text" id="signup-password" onChange={this.onPasswordChange}></input><br/>
                    <button className={'btn-apex margin-ten'} onClick={this.handleRegisterClick}>Sign Up!</button>
                    <p className="normal">{this.state.signUpMessage}</p>
                </div>
        </div>
        )
    }
}

export default Signup