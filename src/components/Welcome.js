import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


function Welcome(props) {
    return(
        <>
            <h1>Welcome to Apex Legends Dictionary</h1>
            <Router>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>

                    {/* Work out how to do the logout in the backend */}
                </nav>
                <Routes>
                    
                </Routes>
            </Router>
        </>
        
    )
};

export default Welcome;