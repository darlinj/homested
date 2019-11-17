const handler = require('./handler');
const dotenv = require('dotenv');
const axios = require('axios');

jest.mock('axios');

describe("getting data from HDM", () => {
  dotenv.config();
  it("finds the customer successfully", () => {
    const apiResponse = '<?xml version="1.0" encoding="UTF-8"?><ns1:requestResponses xmlns:ns1="http://homeflow.hdmservice.motive.com/"><ns1:requestResponse xmlns:ns1="http://homeflow.hdmservice.motive.com/"><errorCode>1</errorCode><errorMessage>EXECUTE_SUCCESS</errorMessage><nameValues><errorCode>1</errorCode><errorMessage></errorMessage><name>key1</name><value>value1</value></nameValues><nameValues><errorCode>1</errorCode><errorMessage></errorMessage><name>key2</name><value>value2</value></nameValues><uniqueId>+088044+1801004390</uniqueId></ns1:requestResponse></ns1:requestResponses>'
    axios.mockResolvedValue({ data: apiResponse });
    const jsonResult = { result:"EXECUTE_SUCCESS", data: {key1: "value1", key2: "value2"}}
    return handler.getCustomer(" 088044 1801004390").then((data) => {expect(data).toEqual(jsonResult)});
  });

  it("doesn't find the customer", () => {
    const apiResponse = '<?xml version="1.0" encoding="UTF-8"?><ns1:requestResponses xmlns:ns1="http://homeflow.hdmservice.motive.com/"><ns1:requestResponse xmlns:ns1="http://homeflow.hdmservice.motive.com/"><errorCode>0</errorCode><errorMessage>DEVICE_NOT_FOUND</errorMessage><uniqueId>not_a_customer_id</uniqueId></ns1:requestResponse></ns1:requestResponses>'
    axios.mockResolvedValue({ data: apiResponse });
    const jsonResult = { result:"DEVICE_NOT_FOUND", data: {}}
    return handler.getCustomer("not_a_customer_id").then((data) => {expect(data).toEqual(jsonResult)});
  });
});
