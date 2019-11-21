import React from 'react';
import {
  ListGroup,
  Table,
  Row,
  Col,
  Card,
  CardDeck,
} from 'react-bootstrap';
import {FaCheckCircle, FaMinusCircle, FaTimesCircle} from 'react-icons/fa';
import GaugeChart from 'react-gauge-chart';

const CustomerSummary = (props) => {
  return (
    <>
            <Row>
              <Col>
                <CardDeck className="info-card">
                  <Card bg="light">
                    <Card.Header>HEALTH CHECK</Card.Header>
                    <Card.Body>
                      <ListGroup>
                        <ListGroup.Item>
                          <FaCheckCircle color="green" size="32" /> Wireless
                          Status
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <FaMinusCircle color="grey" size="32" /> Hub Status
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <FaTimesCircle color="red" size="32" /> Network Status
                        </ListGroup.Item>
                      </ListGroup>
                      (This is not live data)
                    </Card.Body>
                  </Card>
                  <Card bg="light">
                    <Card.Header>HUB SUMMARY</Card.Header>
                    <Card.Body>
                      <Table hover size="sm">
                        <tbody>
                          <tr>
                            <td colSpan="2">
                              {props.customerData.data.deviceTypeAlias}
                            </td>
                          </tr>
                          <tr>
                            <td>Customer type</td>
                            <td>{props.customerData.data.customerType}</td>
                          </tr>
                          <tr>
                            <td>Hub serial no.</td>
                            <td>{props.customerData.data.serialNumber}</td>
                          </tr>
                          <tr>
                            <td>RBSID</td>
                            <td>{props.customerData.data.rbsid}</td>
                          </tr>
                          <tr>
                            <td>SID</td>
                            <td>{props.customerData.data.sid}</td>
                          </tr>
                          <tr>
                            <td>Mode</td>
                            <td>{props.customerData.data.MODE}</td>
                          </tr>
                          <tr>
                            <td>Firmware version</td>
                            <td>{props.customerData.data.softwareVersion}</td>
                          </tr>
                          <tr>
                            <td>IP Address</td>
                            <td>{props.customerData.data.ipAddress}</td>
                          </tr>
                          <tr>
                            <td>First contact</td>
                            <td>{props.customerData.data.firstContactTime}</td>
                          </tr>
                          <tr>
                            <td>Last contact</td>
                            <td>{props.customerData.data.lastContactTime}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                  <Card bg="light">
                    <Card.Header>SET-TOP BOX SUMMARY</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        No set top box associated with this customer
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
  )
}

export default CustomerSummary;
