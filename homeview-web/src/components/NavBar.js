import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import UserStatus from './UserStatus';

const NavBar = props => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Homeview</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto"></Nav>
        <Nav>
          <UserStatus
            isAuthenticated={props.isAuthenticated}
            handleLogout={props.handleLogout}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
