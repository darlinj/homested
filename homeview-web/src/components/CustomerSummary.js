import React from 'react';
import {Row, Col, Card, CardDeck} from 'react-bootstrap';
import HubSummary from './HubSummary';
import HealthCheck from './HealthCheck';
import {
  FaSpinner,
} from 'react-icons/fa';
import GaugeChart from 'react-gauge-chart';

const loadingSpinner = (state, spinnerClass) => {
  if (state !== 'initialized') {
    return (
      <FaSpinner
        className={`${state === 'loading' ? 'fa-spin' : ''} ${spinnerClass}`}
        style={{float: 'right'}}
        color="black"
        size="32"
      />
    );
  }
};

const CustomerSummary = props => {
  return (
    <>
      <Row>
        <Col>
          <CardDeck className="info-card">
            <Card bg="light">
              <Card.Header>
                HEALTH CHECK
                {loadingSpinner(props.diagnosticData.state, 'health-check')}
              </Card.Header>
              <Card.Body>
                <HealthCheck diagnosticData={props.diagnosticData} />
              </Card.Body>
            </Card>
            <Card bg="light">
              <Card.Header>
                HUB SUMMARY{' '}
                {loadingSpinner(props.customerData.state, 'hub-summary')}
              </Card.Header>
              <Card.Body>
                <HubSummary customerData={props.customerData} />
              </Card.Body>
            </Card>
            <Card bg="light">
              <Card.Header>
                SET-TOP BOX SUMMARY
                {loadingSpinner(props.customerData.state, 'set-top-box')}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Coming soon...
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardDeck className="info-card">
            <Card bg="light">
              <Card.Header>BROADBAND SPEED</Card.Header>
              <Card.Body>
                <Card.Text>Coming soon...</Card.Text>
                <GaugeChart
                  id="gauge-chart4"
                  nrOfLevels={10}
                  arcPadding={0.1}
                  cornerRadius={3}
                  percent={0.6}
                  textColor="black"
                />
              </Card.Body>
            </Card>
            <Card bg="light">
              <Card.Header>NETWORK</Card.Header>
              <Card.Body>
                <Card.Text>Coming soon...</Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default CustomerSummary;
