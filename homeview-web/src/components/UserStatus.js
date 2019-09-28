import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

const UserStatus = (props) => {
    const loggedIn = (
      <>
          <Nav.Link href="/signup">Signup</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
      </>
    )
    const loggedOut =  ( <NavItem onClick={props.handleLogout}>Logout</NavItem> )

    return props.isAuthenticated ? loggedOut : loggedIn
}

export default UserStatus;
