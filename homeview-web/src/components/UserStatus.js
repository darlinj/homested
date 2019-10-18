import React from 'react';
import {Nav} from 'react-bootstrap';

const UserStatus = props => {
  const loggedIn = <Nav.Link href="/login">Login</Nav.Link>
  const loggedOut = <Nav.Item onClick={props.handleLogout}>Logout</Nav.Item>;

  return props.isAuthenticated ? loggedOut : loggedIn;
};

export default UserStatus;
