import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';

function Welcome(props) {
    return(
        <>
            <h1>Welcome to Apex Legends Dictionary</h1>
            <Router>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <Link to="/api/signin">Sign In</Link>
                    <Link to="/api/signup">Sign Up</Link>
                    {/* Work out how to do the logout in the backend */}
                </nav>
                <Routes>
                    <Route path="/api/signin" element={<Signin />} />
                    <Route path="/api/signup" element={<Signup />} />
                </Routes>
            </Router>
        </>
        
    )
};

export default Welcome;