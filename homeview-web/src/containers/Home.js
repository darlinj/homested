import React, {useState, useEffect} from 'react';
import {ListGroup} from 'react-bootstrap';
import {API} from 'aws-amplify';
import './Home.css';
import Login from './Login';

const Home = props => {
  const [apiResponse, setApiResponse] = useState('Loading...');

  useEffect(() => {
    if (!props.isAuthenticated) {
      return;
    }
    API.get('testApiCall', '/hello')
      .then(response => {
        setApiResponse(response.message);
      })
      .catch(e => {
        console.log(e);
      });
  });

  const renderLander = () => {
    return <Login {...props} />;
  };

  const renderTest = () => {
    return (
      <div className="test">
      Please enter the customer telephone number, RBSID or Serial Number of the Hub
        <h1>Test API call</h1>
        <ListGroup>{apiResponse}</ListGroup>
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
