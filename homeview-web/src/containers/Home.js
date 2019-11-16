import React  from 'react';
import './Home.css';
import Login from './Login';

const Home = props => {
  const renderLander = () => {
    return <Login {...props} />;
  };

  const renderCustomerDetails = () => {
    return (
      <div className="test">
        <h1>Customer details</h1>
        <h2>{props.customerData} </h2>
        <h2>{JSON.stringify(props.requestParams)} </h2>
      </div>
    );
  }

  const renderMain = () => {
    return (
      <>
      {props.customerData ? renderCustomerDetails() : "Please enter the customer telephone number, RBSID or Serial Number of the Hub" }
      </>
    );
  };

  return (
    <div className="Home">
      {props.isAuthenticated ? renderMain() : renderLander()}
    </div>
  );
};

export default Home;
