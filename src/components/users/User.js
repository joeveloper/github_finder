import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import withRouter from '../HOC/withRouter';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User =  ({data, user, loading, getUser, getUserRepos, repos, match}) => {
  const params = useParams()
    const {
      avatar_url,
      location,
      bio,
      login,
      hireable,
      company,
      blog,
      html_url,
      followers,
      following,
      public_repos,
      public_gists
    } = user;

    useEffect(() => {
      getUser(params.login);
      getUserRepos(params.login);
    }, []);

if (loading) return <Spinner/>

    return (
      <Fragment>
          <Link to='/' className='btn btn-light'>
            Back to Search
            </Link>
            Hireable:{''};
            {hireable ? (
              <i className='fas fa-check text-success'/>
            ):(
              <i className='fas fa-times-circle text-danger'/>
            )} 
            <div className='card grid-2'> 
            <div className='all-center'>
              <img src={avatar_url} className="round-img" style={{width: '150px'}}/>
              <h1>{login}</h1>
              <p>location: {location}</p>
            </div>
            <div>
              {bio && (<Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
                </Fragment>
              )}
                <a href={html_url} className='btn btn-dark my-1'>
                  View github profile
                </a>
                <ul>
                  <li>
                    {login && <Fragment>
                      <strong> Username: </strong> {login}
                      </Fragment>}
                  </li>
                  <li>
                    {company && <Fragment>
                      <strong> Company: </strong> {company}
                      </Fragment>}
                  </li>
                  <li>
                    {blog && <Fragment>
                      <strong> Website: </strong> {blog}
                      </Fragment>}
                  </li>
                </ul>
            </div>
            </div>

            <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-light">Public Repos: {public_repos}</div>
            <div className="badge badge-dark">Public Gist: {public_gists}</div>
            </div>

            <Repos repos={repos}/>
      </Fragment>
    );
  }


User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired
}

export default withRouter(User);