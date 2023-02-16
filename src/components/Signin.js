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
        axios.post(`${apiUrl}/api/login`, {
                "username": this.state.username,
                "password": this.state.password
            })
            .then((response) => {
                localStorage.setItem("jwt", response.data.accessToken);
                localStorage.setItem("user", response.data.user);
                localStorage.setItem("refreshToken", response.data.refreshToken);
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
            <h1 className='page-header'>Sign In</h1>
            <div className='center-align'>
            <label className='normal margin-ten'>Username: </label>
            <input className='card-input margin-ten' type="text" id="signup-username" onChange={this.onUsernameChange}></input><br/>
            <label className='normal margin-ten'>Password: </label>
            <input className='card-input margin-ten' type="text" id="signup-password" onChange={this.onPasswordChange}></input><br/>
            <button className={'btn-apex margin-ten'} onClick={this.handleSigninClick}>Sign In!</button>
            </div>
        </div>
        )
    }
}

export default Signin