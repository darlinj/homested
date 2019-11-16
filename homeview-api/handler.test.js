const handler = require('./handler');
const dotenv = require('dotenv');

describe("getting data from HDM", () => {
  dotenv.config();
  it("finds the customer using the search term supplied", async () =>{
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
    return handler.getCustomer(" 088044 1801004390").then((data) => {expect(data).toEqual("some data")});
  });
});
