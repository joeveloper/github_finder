import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import { Alert } from './components/layout/Alert';
import User from './components/users/User';

class App extends Component {

  //set state initial values 
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }


  //Search Github users using the GET API
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  };

  //Get a single github user
  getUser = async (login) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?/${login}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false });
    console.log(res.data, '<== this is from the `getUser` function')
    
  }

  
  //Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }

  //Set alert for empty search string
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null, loading: false })
    }, 2000);
  };

  render() {
    //destructure state 
    const { users, user, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Routes>
              <Route exact path='/' element={<Fragment>
                <Search
                  searchUsers={this.searchUsers}
                  clearUsers={this.clearUsers}
                  showClear={users.length > 0 ? true : false}
                  setAlert={this.setAlert}
                />

                <Users loading={loading} users={users} />
              </Fragment>} />
              <Route exact path='/about' element={<About />} />
              <Route element={(
                <User getUser={this.getUser} user={user} loading={loading} />
              )} exact path='/user/:login'
              />
            </Routes>
          </div>
        </div>
      </Router>

    )
  }
};

export default App;
