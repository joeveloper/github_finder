import React, { Component } from 'react'
import withRouter from '../HOC/withRouter';

export class User extends Component {
  async componentDidMount() {
    console.log(this.props);
    await this.props.getUser(this.props.params.login)
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      login
    } = this.props.user;

const {loading} = this.props;

    return (
      <div>
          {name}
      </div>
    )
  }
}

export default withRouter(User);