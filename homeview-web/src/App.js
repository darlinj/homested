import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Routes from './Routes';
import {Auth} from 'aws-amplify';
import NavBar from './components/NavBar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = props => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [customerData, setCustomerData] = useState("Some data");

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

  const getCustomerData = () => {
    setCustomerData("some more data");
  }

  const childProps = {
    isAuthenticated: isAuthenticated,
    userHasAuthenticated: setAuthenticated,
    getCustomerData: getCustomerData,
    customerData: customerData
  };

  return (
    <div className="App container">
      <ToastContainer />
      <NavBar handleLogout={handleLogout} isAuthenticated={isAuthenticated} getCustomerData={getCustomerData} />
      <Routes childProps={childProps} />
    </div>
  );
};

export default withRouter(App);
