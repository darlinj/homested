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
  const [customerData, setCustomerData] = useState({state: 'initialized'});
  const [diagnosticData, setDiagnosticData] = useState({state: 'initialized'});
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
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getDiagnosticData = () => {
    if (!isAuthenticated) {
      return;
    }
    setDiagnosticData({state: 'loading'});
    API.get(
      'homeviewAPI',
      `/get-diagnostics?searchTerm=${encodeURI(searchTerm)}`,
    )
      .then(response => {
        setDiagnosticData({...response.message, state: 'loaded'});
      })
      .catch(e => {
        console.log(e);
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
    searchTerm: searchTerm,
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
