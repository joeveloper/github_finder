import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  SHOW_ALERT,
  REMOVE_ALERT
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  // Searc User

  //Get User

  //get repos

  //Clear Users

  //Set Loading

  return (
    <GithubContext.Provider
      value= {{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading
      }}
  >
    {props.children}
  </GithubContext.Provider>
  )
}

export default GithubState;