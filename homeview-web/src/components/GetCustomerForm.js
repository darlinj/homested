import React from 'react';
import {
  Row,
  Col,
  FormLabel,
  Form,
  FormControl,
  FormGroup,
  Button,
} from 'react-bootstrap';

const GetCustomerForm = props => {

  const handleChange = event => {
    props.setSearchTerm(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.getCustomerData(props.searchTerm);
  };

  const renderForm = props => {
    return (
      <Row>
        <Col style={{textAlign: 'center'}}>
          <Form inline style={{marginTop: "10px"}} className="ml-auto search-form justify-content-center" onSubmit={handleSubmit}>
            <FormGroup controlId="search-term">
              <FormLabel>Search : </FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={props.searchTerm || ''}
                onChange={handleChange}
                placeholder="Phone number, RBSID or Hub Serial"
                className="mr-sm-2 search-term"
              />
            </FormGroup>
            <Button type="submit" variant="outline-success">
              Go
            </Button>
          </Form>
          Please enter the customer telephone number, RBSID or Serial Number of
          the Hub
        </Col>
      </Row>
    );
  };

  return props.isAuthenticated ? renderForm(props) : '';
};

export default GetCustomerForm;
