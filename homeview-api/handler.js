'use strict';
const axios = require('axios');
var parser = require('fast-xml-parser');

module.exports.hello = async event => {
  const foo = getCustomer('1234');
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(foo, null, 2),
  };
};

const buildResponse = event => {
  return {
    message: 'Go Serverless v1.0! Your function executed successfully!',
    input: event,
  };
};

const getCustomer = async searchTerm => {
  const adjustedSearchTerm = searchTerm.replace(/ /g, '+');
  return axios({
    method: 'get',
    auth: {
      username: process.env.HDM_USER,
      password: process.env.HDM_PASSWORD,
    },
    url: `https://qbtws.qa.motive.com/hdmhomeflow/services/hdmhomeflow/execute/${adjustedSearchTerm}/GATEWAY/HDM.xml?operation=findDeviceById&mode=true&associatedlandevices=true&requestIdentifier=`,
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

module.exports.findCustomer = async event => {
  console.info('EVENT\n' + JSON.stringify(event, null, 2));
  console.info(
    'SEARCHTERM\n' +
      JSON.stringify(
        event.queryStringParameters.searchTerm.replace(' ', '+'),
        null,
        2,
      ),
  );
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(
      {
        message:
          JSON.stringify(
            await getCustomer(event.queryStringParameters.searchTerm),
          ) + process.env.HDM_USER,
        input: event,
        searchTerm: event.queryStringParameters,
      },
      null,
      2,
    ),
  };
};

module.exports.buildResponse = buildResponse;
module.exports.getCustomer = getCustomer;
