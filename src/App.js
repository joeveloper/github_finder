import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GithubState from './context/github/GithubState';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import { Alert } from './components/layout/Alert';
import User from './components/users/User';


const App = () => {

    //set state initial values 
  const [alert, setAlert] = useState(null)
 
  //Set alert for empty search string
  const showAlert = (msg, type) => {
    setAlert( { msg, type } ) 
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

    return (
      <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Routes>
              <Route exact path='/' element={<Fragment>
                <Search
                  // clearUsers={clearUsers}
                  // showClear={users.length > 0 ? true : false}
                  showAlert={showAlert}
                />

                <Users />
              </Fragment>} />
              <Route exact path='/about' element={<About />} />
              <Route element={(
                <User />
              )} exact path='/user/:login'
              />
            </Routes>
          </div>
        </div>
      </Router>
      </GithubState>
    )
  };


export default App;
