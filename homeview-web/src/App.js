import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import Routes from './Routes';
import {Auth} from 'aws-amplify';
import UserStatus from './components/UserStatus';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = props => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    Auth.currentSession()
      .then(() => {
        setAuthenticated(true);
        return;
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  const handleLogout = async event => {
    await Auth.signOut();
    setAuthenticated(false);
    props.history.push('/login');
  };

  const childProps = {
    isAuthenticated: isAuthenticated,
    userHasAuthenticated: setAuthenticated,
  };
  return (
    <div className="App container">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Homeview</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <UserStatus
              isAuthenticated={isAuthenticated}
              handleLogout={handleLogout}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes childProps={childProps} />
    </div>
  );
};

export default withRouter(App);
