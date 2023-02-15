import React, { Component } from "react"
import WeaponModal from "./WeaponModal";
class WeaponSimpleView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const bool = this.props.isFavorite
        return(
            <>
            <div className={`grid-item ${this.props.weapon.stats.ammoType}`}>
                {/* WHEN WE PUBLISH THIS, THE URL WILL NEED TO CHANGE */}
                <img className={`weapon-image`} src={`http://localhost:5001${this.props.weapon.weaponImg}`} crossOrigin='anonymous' alt={'Fetching...'}/>
                <WeaponModal isFavorite = {this.props.isFavorite} onFavorite={this.props.onFavorite} weapon={this.props.weapon}/>
            </div>

            </>
        )}
    }

    export default WeaponSimpleView;