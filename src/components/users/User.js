import React, { Fragment, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import withRouter from '../HOC/withRouter';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User =  () => {
  const githubContext = useContext(GithubContext);

  const {user, loading, getUser,  getUserRepos, repos} = githubContext;

 

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
                <a href={html_url} target='_blank' rel="noreferrer" className='btn btn-dark my-1'>
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
                      <strong> Website: </strong> <a href= {blog} target='_blank' rel="noreferrer"> {blog} </a>
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




export default withRouter(User);