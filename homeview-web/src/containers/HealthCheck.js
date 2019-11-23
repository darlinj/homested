import React from 'react';
import {ListGroup, Row, Col, Card, CardDeck} from 'react-bootstrap';
import {FaCheckCircle, FaMinusCircle, FaTimesCircle} from 'react-icons/fa';

const listDiagnostics = diags => {
  return (
    <ListGroup>
      {Object.keys(diags).map(key => {
        return (
          <ListGroup.Item>
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
        <CardDeck className="info-card" style={{width: '100%'}}>
          <Card bg="light">
            <Card.Header>Wireless status</Card.Header>
            <Row>
              <Col md="auto" style={{width: '50%'}}>
                <h3>Wireless 2.4GHz Networks</h3>
                <ListGroup>
                  <ListGroup.Item>
                    {healthIcon(diags.Self_Test_Wireless_Networks_Detected)}
                    {diags.Self_Test_Wireless_Networks_Detected_Details}
                    {diags.Self_Test_Wireless_Networks_Detected}
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md="auto">Wireless 5GHz Networks</Col>
            </Row>
          </Card>
        </CardDeck>
      </Row>
      <Row>
        <CardDeck className="info-card">
          <Card bg="light">
            <Card.Header>all keys</Card.Header>
            <Card.Body>{listDiagnostics(diags)}</Card.Body>
          </Card>
        </CardDeck>
      </Row>
    </>
  );
};

const healthIcon = color => {
  let icon = <FaMinusCircle color="grey" size="32" />;
  if (color === 'Green') {
    icon = <FaCheckCircle color="green" size="32" />;
  } else {
    icon = <FaTimesCircle color="red" size="32" />;
  }
  return <> {icon} </>;
};

const HealthCheck = props => {
  const response = props.diagnosticData || {};
  let healthCheckPage = 'Loading...';
  if (
    response.result === 'TEST_COMPLETED_CACHE' ||
    response.result === 'TEST_COMPLETED_LIVE'
  ) {
    healthCheckPage = displayDiagnostics(props.diagnosticData.data || {});
  } else {
    healthCheckPage = <h2>Data failed to load {response.result}</h2>;
  }
  return <>{healthCheckPage}</>;
};

export default HealthCheck;
