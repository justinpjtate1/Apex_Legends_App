import axios from "axios"
import React, { Component } from "react"
import apiUrl from "../apiConfig"

class Weapons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const weaponImages = this.props.weapons.map((weapon) => {
            return weapon;
        })
        return(
            <div>
            <h1> Weapon </h1>
            </div>
        )}
    }

    export default Weapons;