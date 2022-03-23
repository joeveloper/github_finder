import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import GithubState from './context/github/GithubState';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import { Alert } from './components/layout/Alert';
import User from './components/users/User';
import { SEARCH_USERS } from './context/types';


const App = () => {

    //set state initial values 
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)



  //Search Github users using the GET API
  

  //Get a single github user
  const getUser = async (login) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${login}`);
    setUser(res.data)
    setLoading(false) 
    console.log(res.data)
  }


  //get users repos
  const getUserRepos = async (login) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc`); //?per_page=5&sort=created:asc
    setRepos(res.data)
    setLoading(false)
  }
  
  //Clear users from state
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  //Set alert for empty search string
  const showAlert = (msg, type) => {
    setAlert( { msg, type } ) 
    setTimeout(() => {
      setAlert(null);
      setLoading(false)
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
                  clearUsers={clearUsers}
                  showClear={users.length > 0 ? true : false}
                  showAlert={showAlert}
                />

                <Users loading={loading} users={users} />
              </Fragment>} />
              <Route exact path='/about' element={<About />} />
              <Route element={(
                <User 
                getUser={getUser}
                getUserRepos={getUserRepos} 
                user={user} 
                loading={loading} 
                repos={repos}
                />

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
