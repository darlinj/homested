import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaMinusCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const HealthCheck = props => {
  if (props.diagnosticData.state === 'initialized') {
    return <div>Search for a customer to populate data</div>;
  }
  if (props.diagnosticData.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (!props.diagnosticData.data) {
    return (
      <ListGroup>
        <ListGroup.Item>
          <FaMinusCircle className="grey-minus" color="grey" size="32" /> This infomation was not available
        </ListGroup.Item>
      </ListGroup>
    );
  }

  const healthIcon = color => {
    if (!color) {
      return <FaMinusCircle color="grey" size="32" />;
    }
    if (color.toLowerCase() === 'red') {
      return <FaTimesCircle className="red-cross" color="red" size="32" />;
    }
    if (color.toLowerCase() === 'amber') {
      return (
        <FaExclamationTriangle className="amber" color="orange" size="32" />
      );
    }
    if (color.toLowerCase() === 'green') {
      return <FaCheckCircle className="green-tick" color="green" size="32" />;
    }
    return <FaMinusCircle className="grey-minus" color="grey" size="32" />;
  };

  return (
    <ListGroup>
      <ListGroup.Item>
        {healthIcon(
          props.diagnosticData.data.Self_Test_Wireless_Contention_5GHz,
        )}
        Wireless Status
      </ListGroup.Item>
      <ListGroup.Item>
        {healthIcon(props.diagnosticData.data.Self_Test_Power_Mode_Status)}
        Hub Status
      </ListGroup.Item>
      <ListGroup.Item>
        {healthIcon(props.diagnosticData.data.Self_Test_Wireless_Noise_Status)}
        Network Status
      </ListGroup.Item>
    </ListGroup>
  );
};

export default HealthCheck;
