'use strict';
const axios = require('axios');
var parser = require('fast-xml-parser');

const makeHDMRequest = async(searchTerm, operation_params) => {
  const adjustedSearchTerm = searchTerm.replace(/ /g, '+');
  return axios({
    method: 'get',
    auth: {
      username: process.env.HDM_USER,
      password: process.env.HDM_PASSWORD,
    },
    url: `${process.env.HDM_URL_PART1}${adjustedSearchTerm}${process.env.HDM_URL_PART2}${operation_params}`,
  })
    .then(function(response) {
      const parsedData = parser.parse(response.data, {ignoreNameSpace: true});
      const responseData = parsedData['requestResponses']['requestResponse'];
      const errorData = responseData['errorMessage'];
      let filteredData = {};
      if (responseData['nameValues']) {
        filteredData = responseData['nameValues'].reduce(
          (acc, nameValuePair) => {
            return {[nameValuePair.name]: nameValuePair.value || '', ...acc};
          },
          {},
        );
      }
      return {result: errorData, data: filteredData};
    })
    .catch(function(error) {
      console.log('ERROR:', error);
      return {result: 'ERROR', data: data};
    });
};

const logEvent = (event) => {
  console.info('EVENT\n' + JSON.stringify(event, null, 2));
  console.info(
    'SEARCHTERM\n' +
      JSON.stringify(
        event.queryStringParameters.searchTerm.replace(' ', '+'),
        null,
        2,
      ),
  );
}

const getResponse = async (searchTerm, operation) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(
      {
        message: await makeHDMRequest(searchTerm, operation)
      },
      null,
      2,
    ),
  };
}

module.exports.findCustomer = async event => {
  logEvent(event);
  return getResponse(event.queryStringParameters.searchTerm, "operation=findDeviceById&mode=true&associatedlandevices=true");
};

module.exports.diagnosticTest = async event => {
  logEvent(event);
  return getResponse(event.queryStringParameters.searchTerm, "operation=diagnosticTest&TestName=selfTest");
};

