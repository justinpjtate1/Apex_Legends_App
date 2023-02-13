import React, { Component } from "react"
import WeaponModal from "./WeaponModal";
class WeaponSimpleView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <>
            <div>
                {/* WHEN WE PUBLISH THIS, THE URL WILL NEED TO CHANGE */}
                <img src={`http://localhost:5001${this.props.weapon.weaponImg}`} crossOrigin='anonymous' alt={'Fetching...'}/>
                <WeaponModal onFavorite={this.props.onFavorite} weapon={this.props.weapon}/>
            </div>

            </>
        )}
    }

    export default WeaponSimpleView;