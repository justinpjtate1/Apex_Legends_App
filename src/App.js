import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';
import Weapons from './components/Weapons';
import GeneralChat from './components/GeneralChat';
import Welcome from './components/Welcome';
import Signin from './components/Signin';
import Signup from './components/Signup';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import axios from 'axios';
import apiUrl from './apiConfig';

class App extends Component{
  constructor(props) {
    super(props)

    this.state = {
      auth: false,
      weapons: [],
      user_id: '',
      username: '',
      favoriteWeapons: []
    }
  }

  // ALL SIGN IN / OUT RELATED METHODS
  userSignedIn = () => {
    this.getAllWeapons()
    this.getUser()
    this.setState({
      auth: true
    })
  }

  userSignedOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    this.setState({
      auth: false,
    })
  }
  // COMPONENT LIFE CYCLE METHODS
  componentDidMount = () => {
    const token = localStorage.getItem("jwt")
    if(token !== null) {
      this.userSignedIn()
      this.getAllWeapons()
    }

  }

  // WEAPONS FUNCTIONS
  getAllWeapons = () => {
    //axios get
    axios.get(`${apiUrl}/api/weapons`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    .then((response) => {
        return response.data
    }).then((results) => {
        this.setState({
          weapons: results.weapons
        })
    })
  }
  
  handleFavorite = (weapon) => {
    console.log(weapon);
    const weaponChoice = weapon;
    const weaponIndex = this.state.favoriteWeapons.indexOf(weaponChoice);
    let favorites = this.state.favoriteWeapons;
    if (weaponIndex === -1){
      favorites.push(weaponChoice);
    } else {
      favorites.splice(weaponIndex, 1);
    }
    this.setState({
      favoriteWeapons: favorites
    });
  }

  // PROFILE FUNCTIONS
  getUser = () => {
    const userId = localStorage.getItem('user')
        axios.get(`${apiUrl}/api/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        .then((response) => {
          this.setState({
            user_id: response.data.user._id,
            username: response.data.user.username,
            favoriteWeapons: response.data.user.favoriteWeapons
          })
        })
 }


  render() {
    return(
      <>
          <Router>
            <nav className='navbar navbar-expand-lg navbar-light apex-nav'>
              <Link className={'nav-opts'} to="/api/user">Profile</Link>
              <Link className={'nav-opts'} to="/api/weapons">Weapons</Link>
              <Link className={'nav-opts'} to="/api/generalchat">Chat</Link>
              <Link className={'nav-opts'} to="/api/logout" onClick={this.userSignedOut}>Logout</Link>
              <Link className={'nav-opts'} to="/api/signin">Sign In</Link>
              <Link className={'nav-opts'} to="/api/signup">Sign Up</Link>
              {/* Work out how to do the logout in the backend */}
            </nav>
            <Routes>
              <Route path="/api/user" element={this.state.auth ? (<Profile user_id={this.state.user_id} username={this.state.username} favoriteWeapons={this.state.favoriteWeapons} />) : (<Navigate replace to = {"/"} />)} />
              <Route path="/api/weapons" element={this.state.auth ? (<Weapons onFavorite={this.handleFavorite} weapons={this.state.weapons}/>) : (<Navigate replace to = {"/"} />)} />
              <Route path="/api/generalchat" element={this.state.auth ? (<GeneralChat user_id={this.state.user_id}/>) : (<Navigate replace to = {"/"} />)} />
              <Route path="/api/signin" element={!this.state.auth ? (<Signin userSignedIn={() => this.userSignedIn()}/>) : (<Navigate replace to = {"/"} />)}/>
              <Route path="/api/signup" element={!this.state.auth ? (<Signup />) : (<Navigate replace to = {"/"} />)}/>
              <Route path="/" element={!this.state.auth ? (<h1>Welcome to this Apex Legends App!</h1>) : (<h1>We will set this to be the page name</h1>)}/>
            </Routes>
          </Router>
        
      </>
      

    )
  }
}

export default App;
