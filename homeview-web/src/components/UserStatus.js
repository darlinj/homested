import React from 'react';
import {Nav} from 'react-bootstrap';

const UserStatus = props => {
  const loggedIn = <Nav.Link className="title-links" href="/login">Login</Nav.Link>
  const loggedOut = <Nav.Item className="title-links"  onClick={props.handleLogout}>Logout</Nav.Item>;

  return props.isAuthenticated ? loggedOut : loggedIn;
};

export default UserStatus;
