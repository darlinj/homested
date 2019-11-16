const handler = require('./handler');
const dotenv = require('dotenv');
const axios = require('axios');

jest.mock('axios');

describe("getting data from HDM", () => {
  dotenv.config();
  xit("finds the customer using the search term supplied", async () =>{
    const response = "Go Serverless v1.1! Your function executed successfully!"
    const returnValue = await handler.findCustomer({foo: "bar"});
      expect(JSON.parse(returnValue.body).message).toEqual(response);
  });

  it("returns the data as JSON", () => {
    const response = {
       "input": {
         "some": "stuff",
       },
       "message": "Go Serverless v1.0! Your function executed successfully!",
     }
    const event = { some: "stuff"};
    expect(handler.buildResponse(event)).toEqual(response);
  });

  it("finds the customer", () => {
    const apiResponse = '<?xml version="1.0" encoding="UTF-8"?><ns1:requestResponses xmlns:ns1="http://homeflow.hdmservice.motive.com/"><ns1:requestResponse xmlns:ns1="http://homeflow.hdmservice.motive.com/"><errorCode>1</errorCode><errorMessage>EXECUTE_SUCCESS</errorMessage><nameValues><errorCode>1</errorCode><errorMessage></errorMessage><name>key1</name><value>value1</value></nameValues><nameValues><errorCode>1</errorCode><errorMessage></errorMessage><name>key2</name><value>value2</value></nameValues><uniqueId>+088044+1801004390</uniqueId></ns1:requestResponse></ns1:requestResponses>'
    axios.mockResolvedValue({ data: apiResponse });
    const jsonResult = { result:"EXECUTE_SUCCESS", data: {key1: "value1", key2: "value2"}}
    return handler.getCustomer(" 088044 1801004390").then((data) => {expect(data).toEqual(jsonResult)});
  });

});
