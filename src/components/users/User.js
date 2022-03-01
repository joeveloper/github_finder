import React, { Fragment, Component } from 'react'
import withRouter from '../HOC/withRouter';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
  async componentDidMount() {
    console.log(this.props);
    await this.props.getUser(this.props.params.login)
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired
  }

  render() {
    const {
      avatar_url,
      location,
      bio,
      login,
      hireable,
      company,
      blog,
      html_url
    } = this.props.user;

const {loading} = this.props;

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
      </Fragment>
    );
  }
}

export default withRouter(User);