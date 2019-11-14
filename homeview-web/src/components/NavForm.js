import React, {useState} from 'react';
import {Form, FormControl, FormGroup, Button} from 'react-bootstrap';

const NavForm = props => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.getCustomerData(searchTerm);
  };

  const form = (
    <Form inline className="ml-auto search-form" onSubmit={handleSubmit}>
      <FormGroup controlId="search-term">
        <FormControl
          autoFocus
          type="text"
          value={searchTerm || ''}
          onChange={handleChange}
          placeholder="Phone number, RBSID or Hub Serial"
          className="mr-sm-2 search-term"
        />
      </FormGroup>
      <Button type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
  const returnValue = props.isAuthenticated ? form : '';
  return returnValue;
};

export default NavForm;
