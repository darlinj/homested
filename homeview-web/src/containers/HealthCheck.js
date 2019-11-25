import React from 'react';
import {ListGroup, Row, Col, Card, CardDeck} from 'react-bootstrap';
import './HealthCheck.css';
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaMinusCircle,
  FaTimesCircle,
} from 'react-icons/fa';

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
      <Row>
        <Col>
          <CardDeck className="info-card">
            <Card bg="light">
              <Card.Header>All other status info</Card.Header>
              <Card.Body>{listDiagnostics(diags)}</Card.Body>
            </Card>
          </CardDeck>
        </Col>
      </Row>
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

const HealthCheck = props => {
  if (props.diagnosticData.result === undefined) {
    return <h3>Loading...</h3>;
  }
  const response = props.diagnosticData || {};
  let healthCheckPage = 'Loading...';
  if (
    response.result === 'TEST_COMPLETED_CACHE' ||
    response.result === 'TEST_COMPLETED_LIVE'
  ) {
    healthCheckPage = displayDiagnostics(props.diagnosticData.data || {});
  } else {
    healthCheckPage = <h2>Data failed to load. Error: {response.result}</h2>;
  }
  return <>{healthCheckPage}</>;
};

export default HealthCheck;
