import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Alert  from './components/layout/Alert';
import Home from './components/pages/Home';
import User from './components/users/User';
import NotFound from './components/pages/NotFound';


const App = () => {

    return (
      <GithubState>
        <AlertState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert />
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/about' element={<About />} />
              <Route element={(<User />)} exact path='/user/:login' />
              <Route component={<NotFound/>} />
            </Routes>
          </div>
        </div>
      </Router>
      </AlertState>
      </GithubState>
    )
  };


export default App;
