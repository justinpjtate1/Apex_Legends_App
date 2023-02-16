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
        axios.post(`${apiUrl}/api/user`, {
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
            <h1 className='page-header'>Sign Up</h1>
            <div className='center-align'>
            <label className='normal margin-ten'>Username: </label>
            <input className='card-input margin-ten' type="text" id="signup-username" onChange={this.onUsernameChange}></input><br/>
            <label className='normal margin-ten'>Password: </label>
            <input className='card-input margin-ten' type="text" id="signup-password" onChange={this.onPasswordChange}></input><br/>
            <button className={'btn-apex margin-ten'} onClick={this.handleRegisterClick}>Sign Up!</button>
            </div>
        </div>
        )
    }
}

export default Signup