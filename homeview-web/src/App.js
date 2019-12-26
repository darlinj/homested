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
import axios from 'axios';

const App = props => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [customerData, setCustomerData] = useState({state: 'initialized'});
  const [diagnosticData, setDiagnosticData] = useState({state: 'initialized'});
  const [requestParams, setRequestParams] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

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
    findCustomer();
    getDiagnosticData();
  };

  const findCustomer = () => {
    if (!isAuthenticated) {
      return;
    }
    setCustomerData({state: 'loading'});
    API.get('homeviewAPI', `/find-customer?searchTerm=${encodeURI(searchTerm)}`)
      .then(response => {
        setCustomerData({...response.message, state: 'loaded'});
        setRequestParams(response.searchTerm);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getDiagnosticData = () => {
    if (!isAuthenticated) {
      return;
    }
    axios.interceptors.request.use(
      config => {
        config.timeout = 50000;
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    setDiagnosticData({state: 'loading'});
    API.get(
      'homeviewAPI',
      `/get-diagnostics?searchTerm=${encodeURI(searchTerm)}`,
    )
      .then(response => {
        setDiagnosticData({...response.message, state: 'loaded'});
        setRequestParams(response.searchTerm);
      })
      .catch(e => {
        console.log(e);
        getDiagnosticData();
        setDiagnosticData({state: 'failed', result: e});
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
        setSearchTerm={setSearchTerm}
      />
      <Routes childProps={childProps} />
    </div>
  );
};

export default withRouter(App);
