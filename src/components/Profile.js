import React, { Component } from 'react';
import axios from 'axios';
import apiUrl from "../apiConfig";
import WeaponSimpleView from "./WeaponSimpleView";

class Profile extends Component {
    render() {
        const weaponsList = this.props.favoriteWeapons.map((weapon, index) => {
            <WeaponSimpleView key={index} weapon={weapon} />
        })
        return(
            <div>
                <h1>Profile</h1>
                <div>Image</div>
                <h3>{this.props.username}</h3>
                <h2>Favorite Weapons</h2>
                {weaponsList}
            </div>
        )
    }
}

export default Profile