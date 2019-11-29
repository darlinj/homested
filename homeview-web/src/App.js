import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Routes from './Routes';
import {Auth, API} from 'aws-amplify';
import NavBar from './components/NavBar';
import GetCustomerForm from './components/GetCustomerForm';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = props => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [customerData, setCustomerData] = useState('');
  const [diagnosticData, setDiagnosticData] = useState({});
  const [requestParams, setRequestParams] = useState({});

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

  const getCustomerData = searchTerm => {
    if (!isAuthenticated) {
      return;
    }
    setCustomerData('Loading...');
    API.get(
      'homeviewAPI',
      `/find-customer?searchTerm=${encodeURI(searchTerm)}`,
    )
      .then(response => {
        setCustomerData(
          response.message
        );
        setRequestParams(response.searchTerm);
      })
      .catch(e => {
        console.log(e);
      });
    getDiagnosticData(searchTerm);
  };

  const getDiagnosticData = searchTerm => {
    if (!isAuthenticated) {
      return;
    }
    API.get(
      'homeviewAPI',
      `/get-diagnostics?searchTerm=${encodeURI(searchTerm)}`,
    )
      .then(response => {
        setDiagnosticData(
          response.message
        );
        setRequestParams(response.searchTerm);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const childProps = {
    isAuthenticated: isAuthenticated,
    userHasAuthenticated: setAuthenticated,
    getCustomerData: getCustomerData,
    getDiagnosticData: getDiagnosticData,
    customerData: customerData,
    diagnosticData: diagnosticData,
    requestParams: requestParams,
  };

  return (
    <div className="App container">
      <ToastContainer />
      <NavBar
        handleLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        getCustomerData={getCustomerData}
      />
      <GetCustomerForm
        isAuthenticated={isAuthenticated}
        getCustomerData={getCustomerData}
      />
      <Routes childProps={childProps} />
    </div>
  );
};

export default withRouter(App);
