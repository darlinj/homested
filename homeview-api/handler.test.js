const handler = require('./handler');
const dotenv = require('dotenv');
const axios = require('axios');

jest.mock('axios');

describe('finding the customer', () => {
  dotenv.config();

  afterEach( () => {
    axios.mockClear();
  });

  it('finds the customer successfully', () => {
    const apiResponse =
      '<?xml version="1.0" encoding="UTF-8"?><ns1:requestResponses xmlns:ns1="http://homeflow.hdmservice.motive.com/"><ns1:requestResponse xmlns:ns1="http://homeflow.hdmservice.motive.com/"><errorCode>1</errorCode><errorMessage>EXECUTE_SUCCESS</errorMessage><nameValues><errorCode>1</errorCode><errorMessage></errorMessage><name>key1</name><value>value1</value></nameValues><nameValues><errorCode>1</errorCode><errorMessage></errorMessage><name>key2</name><value>value2</value></nameValues><uniqueId>+088044+1801004390</uniqueId></ns1:requestResponse></ns1:requestResponses>';
    axios.mockResolvedValue({data: apiResponse});
    const jsonResult = {
      result: 'EXECUTE_SUCCESS',
      data: {key1: 'value1', key2: 'value2'},
    };
    return handler
      .findCustomer({queryStringParameters: {searchTerm: ' 088044 1801004390'}})
      .then(data => {
        expect(axios.mock.calls[0][0].url).toMatch(/findDeviceById/);
        expect(JSON.parse(data.body).message).toEqual(jsonResult);
      });
  });

  it("doesn't find the customer", () => {
    const apiResponse =
      '<?xml version="1.0" encoding="UTF-8"?><ns1:requestResponses xmlns:ns1="http://homeflow.hdmservice.motive.com/"><ns1:requestResponse xmlns:ns1="http://homeflow.hdmservice.motive.com/"><errorCode>0</errorCode><errorMessage>DEVICE_NOT_FOUND</errorMessage><uniqueId>not_a_customer_id</uniqueId></ns1:requestResponse></ns1:requestResponses>';
    axios.mockResolvedValue({data: apiResponse});
    const jsonResult = {result: 'DEVICE_NOT_FOUND', data: {}};
    return handler
      .findCustomer({queryStringParameters: {searchTerm: ' 088044 1801004390'}})
      .then(data => {
        expect(JSON.parse(data.body).message).toEqual(jsonResult);
      });
  });

  it('gets the diagnostic status info from HDM', () => {
    const apiResponse =
      '<?xml version="1.0" encoding="UTF-8"?><ns1:requestResponses xmlns:ns1="http://homeflow.hdmservice.motive.com/"><ns1:requestResponse xmlns:ns1="http://homeflow.hdmservice.motive.com/"><errorCode>1</errorCode><errorMessage>TEST_COMPLETED_LIVE</errorMessage><nameValues><errorCode>1</errorCode><name>key1</name><value>value1</value></nameValues><nameValues><errorCode>1</errorCode><name>key2</name><value>value2</value></nameValues><uniqueId>+084316+NQ62055767</uniqueId></ns1:requestResponse></ns1:requestResponses>';
    axios.mockResolvedValue({data: apiResponse});
    const jsonResult = {
      result: 'TEST_COMPLETED_LIVE',
      data: {key1: 'value1', key2: 'value2'},
    };
    return handler
      .diagnosticTest({
        queryStringParameters: {searchTerm: ' 088044 1801004390'},
      })
      .then(data => {
        expect(axios.mock.calls[0][0].url).toMatch(/operation=diagnosticTest&TestName=selfTest/);
        expect(JSON.parse(data.body).message).toEqual(jsonResult);
      });
  });
});
