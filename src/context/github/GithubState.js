import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS 
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}


const GithubState = props => {

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  // Search User
  const searchUsers = async (text) => {
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${githubClientId}&client_secret=
    ${githubClientSecret}`);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data}
    );
  };

   //Get a single github user
   const getUser = async (login) => {
    const res = await axios.get(`https://api.github.com/users/${login}`);
   
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  }
  //Set Loading
  const setLoading = () => dispatch({type: SET_LOADING});


  //get repos
  const getUserRepos = async (login) => {
    setLoading()
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc`); //?per_page=5&sort=created:asc
    dispatch({
      type: GET_REPOS,
      payload: res.data 
    })
  }

  //Clear Users
  const clearUsers = () => dispatch({
    type: CLEAR_USERS
  })
  


    return (
    <GithubContext.Provider
      value= {{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
  >
    {props.children}
  </GithubContext.Provider>
  )
    ;
}

export default GithubState;