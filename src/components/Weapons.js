import axios from "axios"
import React, { Component } from "react"
import apiUrl from "../apiConfig"
import WeaponSimpleView from "./WeaponSimpleView"

class Weapons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.weapons)
        const weaponsList = this.props.weapons.map((weapon, index) => {
            return <WeaponSimpleView key={index} weapon={weapon} />;
        })
        return(
            <div>
            <h1> Weapons </h1>
            {weaponsList}
            </div>
        )}
    }

    export default Weapons;