import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import UserStatus from './UserStatus';
import './NavBar.css';

const NavBar = props => {
  return (
    <Navbar variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <img className="btlogo" src="/bt-logo.png"  alt="" />
        Homeview
      </Navbar.Brand>
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
