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
      comments: []
    }
  }
  // ALL SIGN IN / OUT RELATED METHODS
  userSignedIn = () => {
    this.setState({
      auth: true
    })
    this.getAllWeapons()
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

  // GENERAL CHAT
  getGeneralChat = () => {
    axios.get(`${apiUrl}/generalchat`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
  })
  .then((response) => {
      return response.data
  }).then((results) => {
    console.log(results)
      this.setState({
        weapons: results
      })
  })
  }

  render() {
    return(
      <>
          <Router>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <Link to="/api/user">Profile</Link>
              <Link to="/api/weapons">Weapons</Link>
              <Link to="/api/generalchat">Chat</Link>
              <Link to="/api/logout" onClick={this.userSignedOut}>Logout</Link>
              <Link to="/api/signin">Sign In</Link>
              <Link to="/api/signup">Sign Up</Link>
              {/* Work out how to do the logout in the backend */}
            </nav>
            <Routes>
              <Route path="/api/user" element={this.state.auth ? (<Profile />) : (<Navigate replace to = {"/"} />)} />
              <Route path="/api/weapons" element={this.state.auth ? (<Weapons weapons={this.state.weapons}/>) : (<Navigate replace to = {"/"} />)} />
              <Route path="/api/generalchat" element={this.state.auth ? (<GeneralChat generalChat={this.getGeneralChat} comments={this.state.comments}/>) : (<Navigate replace to = {"/"} />)} />
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
