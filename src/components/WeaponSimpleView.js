import React, { Component } from "react"

class WeaponSimpleView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <h6>{this.props.weapon.weaponName}</h6>
                {/* Need to make a way to fetch images from the backend side */}
                {/* <img src={this.props.weapon.weaponImg} crossOrigin='anonymous' alt={'Fetching...'}/> */}
            </div>
        )}
    }

    export default WeaponSimpleView;