import React, { Component } from 'react';
import axios from 'axios';
import apiUrl from "../apiConfig";
import imageCompression from 'browser-image-compression'

import WeaponSimpleView from "./WeaponSimpleView";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let image = this.state.image
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 200
        }
        imageCompression(image, options).then((response) => {
            let formData = new FormData()
            formData.append('profileImage', response)
            axios({
            url: `${apiUrl}/api/user/${this.props.user_id}/upload`,
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "multipart/form-data"
            },
            data: formData
            })
            .then((response) => this.props.getUser())
            .catch((error) => {
                console.log(error)
            })
        })  
    }

    handleFileSelect = (event) => {
        this.setState({
            image: event.target.files[0]
        })
      }
    
    render() {
        const weaponsList = this.props.favoriteWeapons.map((weapon, index) => {
            return <WeaponSimpleView onFavorite={this.props.onFavorite} key={index} weapon={weapon} />;
        })
        return(
            <div>
                <h1>Profile</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="file"
                        label="Image"
                        name="image"
                        accept=".jpeg, .png, .jpg"
                        onChange={this.handleFileSelect}
                    />
                    {this.state.image && <button>Submit</button>}
                </form>
                {this.props.userImage[0] && this.props.userImage[0].data && this.props.userImage.map((value, index) => {
                    const base64String = btoa(
                        String.fromCharCode(...new Uint8Array((value.data.data)))
                    );
                    return <img src={`data:image/png;base64,${base64String}`} key={index} id="profile-picture"/>
                })}
                {/* <FileBase64 multiple={ false } onDone={({base64}) => this.setState({
                    image: base64
                })}/> */}
                <h3>{this.props.username}</h3>
                <h2>Favorite Weapons</h2>
                {weaponsList}
            </div>
        )
    }
}

export default Profile