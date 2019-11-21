import React, {useState} from 'react';
import './Home.css';
import Login from './Login';
import HomeNetwork from './HomeNetwork';
import CustomerSummary from '../components/CustomerSummary';

import {Tab, Tabs} from 'react-bootstrap';

const Home = props => {
  const [rerenderGraph, setRerenderGraph] = useState(false);
  const renderLander = () => {
    return <Login {...props} />;
  };

  const renderCustomerDetails = () => {
    if (props.customerData === 'Loading...') {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <Tabs
          defaultActiveKey="overview"
          id="uncontrolled-tab-example"
          onSelect={handleClick}>
          <Tab eventKey="overview" title="Overview">
            <CustomerSummary customerData={props.customerData} />
          </Tab>
          <Tab eventKey="health-check" title="Health Check">
            something
          </Tab>
          <Tab
            eventKey="home-network"
            title="Home Network"
            className="home-network-tab">
            <HomeNetwork rerenderGraph={rerenderGraph} />
          </Tab>
        </Tabs>
      </>
    );
  };

  const handleClick = tab => {
    if (rerenderGraph === false && tab === 'home-network') {
      setRerenderGraph(true);
    }
  };

  const renderMain = () => {
    return <>{props.customerData ? renderCustomerDetails() : ''}</>;
  };

  return (
    <div className="Home">
      {props.isAuthenticated ? renderMain() : renderLander()}
    </div>
  );
};

export default Home;
