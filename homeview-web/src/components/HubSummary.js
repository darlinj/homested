import React from 'react';
import {ListGroup} from 'react-bootstrap';

const HubSummary = props => {
  if( props.customerData.loading ) {
    return <div>"Loading"</div>
  }
  return (
    <ListGroup>
      <ListGroup.Item>
        <strong>Customer type</strong>: {props.customerData.data.customerType}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Hub serial</strong>: {props.customerData.data.serialNumber}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>RBSID</strong>: {props.customerData.data.rbsid}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>SID</strong>: {props.customerData.data.sid}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Mode</strong>: {props.customerData.data.MODE}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Firmware Version</strong>:{' '}
        {props.customerData.data.softwareVersion}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>IP Address</strong>: {props.customerData.data.ipAddress}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>First contact</strong>:{' '}
        {props.customerData.data.firstContactTime}
      </ListGroup.Item>
      <ListGroup.Item>
        <strong>Last contact</strong>: {props.customerData.data.lastContactTime}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default HubSummary;
