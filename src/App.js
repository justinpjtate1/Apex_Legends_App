import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
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
      weapons: []
    }
  }
  // ALL SIGN IN / OUT RELATED METHODS
  userSignedIn = () => {
    this.setState({
      auth: true
    })
  }

  userSignedOut = () => {
    localStorage.removeItem("jwt")
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
    axios.get(`${apiUrl}/weapons`, {
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

  render() {
    return(
      <>
          {!this.state.auth && <h1>Welcome to this Apex Legends App!</h1>}
          {this.state.auth && <h1>We will set this to be the page name</h1>}
          <Router>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              {this.state.auth && <><Link to="/api/user">Profile</Link>
              <Link to="/api/weapons">Weapons</Link>
              <Link to="/api/generalchat">Chat</Link>
              <Link to="/api/logout" onClick={this.userSignedOut}>Logout</Link></>}
              {!this.state.auth && <><Link to="/api/signin">Sign In</Link>
              <Link to="/api/signup">Sign Up</Link></>}
              {/* Work out how to do the logout in the backend */}
            </nav>
            <Routes>
              {this.state.auth && <><Route path="/api/user" element={<Profile />} />
              <Route path="/api/weapons" element={<Weapons getAllWeapons={this.getAllWeapons}/>} />
              <Route path="/api/generalchat" element={<GeneralChat />} /></>}
              {!this.state.auth && <><Route path="/api/signin" element={<Signin 
                    userSignedIn={() => this.userSignedIn()} />} 
                    />
              <Route path="/api/signup" element={<Signup />} /></>}
            </Routes>
          </Router>
        
      </>
      

    )
  }
}

export default App;
