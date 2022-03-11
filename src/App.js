import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import { Alert } from './components/layout/Alert';
import User from './components/users/User';

const App = () => {

    //set state initial values 
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)



  //Search Github users using the GET API
  const searchUsers = async (text) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items)
    setLoading(false)
  };

  //Get a single github user
  const getUser = async (login) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${login}`);
    setUsers(res.data)
    setLoading(false) 
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

 
    //destructure state 
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Routes>
              <Route exact path='/' element={<Fragment>
                <Search
                  searchUsers={searchUsers}
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

    )
  };

export default App;
