import React, { Component } from 'react';
import axios from 'axios';
import apiUrl from "../apiConfig";

class Profile extends Component {
    render() {
        return(
            <div>
                <h1>Profile</h1>
                <div>Image</div>
                <h2>Name</h2>
                <p>Bio</p>
                <ul>Favorite Weapons</ul>
            </div>
        )
    }
}

export default Profile