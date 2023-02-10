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
    this.getAllWeapons()
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
      console.log(results)
        this.setState({
          weapons: results
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
        {this.state.auth && 
          <Router>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <Link to="/api/user">Profile</Link>
              <Link to="/api/weapons">Weapons</Link>
              <Link to="/api/generalchat">Chat</Link>
              <Link to="/api/logout" onClick={this.userSignedOut}>Logout</Link>
              {/* Work out how to do the logout in the backend */}
            </nav>
            <Routes>
              <Route path="/api/user" element={<Profile />} />
              <Route path="/api/weapons" element={<Weapons weapons={this.state.weapons}/>} />
              <Route path="/api/generalchat" element={<GeneralChat generalChat={this.getGeneralChat} comments={this.state.comments} />} />
            </Routes>
          </Router>}

        {!this.state.auth &&
        <Welcome userSignedIn={this.userSignedIn} />
        }
        
      </>
      

    )
  }
}

export default App;
