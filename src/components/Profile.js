import React, { Component } from 'react';
import axios from 'axios';
import apiUrl from "../apiConfig";
import FileBase64 from 'react-file-base64'
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
            console.log(response)
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
            .then((response) => {
                console.log(response)
            })
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

    // createPatch = (patchImage) => {
    //     console.log(patchImage)
    //     axios.patch(`${apiUrl}/api/user/${this.props.user_id}`, {
    //         user: {
    //             profileImg: patchImage
    //         }
    //     }, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("jwt")}`
    //         }
    //         })
    // }

    // handleSubmitImage = (e) => {
    //     e.preventDefault();
    //     this.createPatch(this.state.image);
    // }

    // convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //           };
    //     });
    // };

    // handleFileUpload = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await this.convertToBase64(file);
    //     this.setState({
    //         image: base64
    //     })
    // }
    
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
                    <button>Submit</button>
                </form>
                {this.props.userImage.map((value, index) => {
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