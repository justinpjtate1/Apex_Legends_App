import React, { Component } from "react"
class WeaponSimpleView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <h6>{this.props.weapon.weaponName}</h6>
                {/* WHEN WE PUBLISH THIS, THE URL WILL NEED TO CHANGE */}
                <img src={`http://localhost:5001${this.props.weapon.weaponImg}`} crossOrigin='anonymous' alt={'Fetching...'}/>
            </div>
        )}
    }

    export default WeaponSimpleView;