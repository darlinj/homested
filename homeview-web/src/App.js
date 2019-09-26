import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import Routes from './Routes';
import { Auth } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      if(await Auth.currentSession()) {
		    this.setState({ isAuthenticated: true });
      }
    } catch (e) {
      if( e !== 'No current user') {
        console.log(e);
      }
    }
    this.setState({ isAuthenticated: false });
  }

  userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	};

  handleLogout = async event => {
    await Auth.signOut();
		this.setState({ isAuthenticated: false });
    this.props.history.push('/login');
  };

  userStatus = () => {
    const loggedIn = (
      <>
          <Nav.Link href="/signup">Signup</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
      </>
    )
    const loggedOut =  ( <NavItem onClick={this.handleLogout}>Logout</NavItem> )

    const foo = this.state.isAuthenticated ? loggedOut : loggedIn

    return   foo;
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            Test application
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              {this.userStatus()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
