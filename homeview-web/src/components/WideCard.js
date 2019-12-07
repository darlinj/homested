import React from 'react'
import {Row, Col, Card, CardDeck} from 'react-bootstrap';

const WideCard = (props) => {
  return (
    <Row>
      <Col>
        <CardDeck className="info-card">
          <Card bg="light">
            <Card.Header>{props.title}</Card.Header>
            <Card.Body>{props.body}</Card.Body>
          </Card>
        </CardDeck>
      </Col>
    </Row>
  );
};

export default WideCard;
