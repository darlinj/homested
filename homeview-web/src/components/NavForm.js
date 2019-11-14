import React from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';

const NavForm = props => {
  const form = (
    <Form inline className="ml-auto">
      <FormControl
        type="text"
        placeholder="Phone number, RBSID or Hub Serial"
        className="mr-sm-2"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  )
  const returnValue = props.isAuthenticated ? form : ""
  return returnValue;
};

export default NavForm;
