import React from 'react';
import {ListGroup, Row, Col, Card, CardDeck} from 'react-bootstrap';
import './HealthCheck.css';
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaMinusCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import WideCard from '../components/WideCard.js';

const listDiagnostics = diags => {
  return (
    <ListGroup>
      {Object.keys(diags).map(key => {
        return (
          <ListGroup.Item key={key}>
            <strong>{key}</strong>: {diags[key]}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

const displayDiagnostics = diags => {
  return (
    <>
      <Row>
        <Col>
          <CardDeck className="info-card">
            <Card bg="light">
              <Card.Header>Wireless status</Card.Header>
              <Row>
                <Col md="auto" style={{width: '50%'}}>
                  <ListGroup>
                    <ListGroup.Item>
                      <strong>Wireless 2.4GHz Networks</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {healthIcon(diags.Self_Test_Wireless_Networks_Detected)}
                      {diags.Self_Test_Wireless_Networks_Detected_Details}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {healthIcon(diags.Self_Test_Wireless_Contention)}
                      {diags.Self_Test_Wireless_Contention_Details}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md="auto" style={{width: '50%'}}>
                  <ListGroup>
                    <ListGroup.Item>
                      <strong>Wireless 5GHz Networks</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {healthIcon(
                        diags.Self_Test_Wireless_Networks_Detected_5GHz,
                      )}
                      {diags.Self_Test_Wireless_Networks_Detected_5GHz_Details}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {healthIcon(diags.Self_Test_Wireless_Contention_5GHz)}
                      {diags.Self_Test_Wireless_Contention_5GHz_Details}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </CardDeck>
        </Col>
      </Row>
      <WideCard title='All other status info' body={listDiagnostics(diags)} />
    </>
  );
};

const healthIcon = color => {
  if (!color) {
    return <FaMinusCircle color="grey" size="32" />;
  }
  if (color.toLowerCase() === 'red') {
    return <FaTimesCircle className="red-cross" color="red" size="32" />;
  }
  if (color.toLowerCase() === 'amber') {
    return <FaExclamationTriangle className="amber" color="orange" size="32" />;
  }
  if (color.toLowerCase() === 'green') {
    return <FaCheckCircle className="green-tick" color="green" size="32" />;
  }
  return <FaMinusCircle className="grey-minus" color="grey" size="32" />;
};

const loadingPage = () => {
  return <WideCard title='Healthcheck' body='Loading...' />
};

const failedToGetData = error => {
  const failureBody = `Data failed to load. Error: ${error}`;
  return <WideCard title='Healthcheck - Load failure' body={failureBody} />
};

const HealthCheck = props => {
  if (props.diagnosticData.status === 'loading') {
    return loadingPage();
  }
  const response = props.diagnosticData || {};
  if (
    response.result === 'TEST_COMPLETED_CACHE' ||
    response.result === 'TEST_COMPLETED_LIVE'
  ) {
    return displayDiagnostics(props.diagnosticData.data || {});
  }
  return failedToGetData(response.result);
};

export default HealthCheck;
