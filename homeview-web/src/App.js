import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar} from 'react-bootstrap';
import Routes from './Routes';
import { Auth } from 'aws-amplify';
import UserStatus from './components/UserStatus';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      if(await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    } catch (e) {
      if( e !== 'No current user') {
        console.log(e);
      }
    }
    if(this.mounted === true) {
      this.userHasAuthenticated(false);
    }
  }

  componentWillUnmount = () => {
    this.mounted = false;
  }

  userHasAuthenticated = (authenticated) => {
		this.setState({ isAuthenticated: authenticated });
	};

  handleLogout = async event => {
    await Auth.signOut();
		this.setState({ isAuthenticated: false });
    this.props.history.push('/login');
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
            Homeview
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <UserStatus isAuthenticated={this.state.isAuthenticated} handleLogout={this.handleLogout} />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
