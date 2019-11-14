import React from 'react';
import './Home.css';
import Login from './Login';

const Home = props => {
  const renderLander = () => {
    return <Login {...props} />;
  };

  const renderTest = () => {
    return (
      <div className="test">
        Please enter the customer telephone number, RBSID or Serial Number of
        the Hub
        <h1>Test API call</h1>
        <h2>{props.customerData} </h2>
      </div>
    );
  };

  return (
    <div className="Home">
      {props.isAuthenticated ? renderTest() : renderLander()}
    </div>
  );
};

export default Home;
