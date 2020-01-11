'use strict';
var deviceManagementAPI = require('./deviceManagementAPI');

const logEvent = (event) => {
  console.info('EVENT\n' + JSON.stringify(event, null, 2));
  console.info(
    'SEARCHTERM\n' +
      JSON.stringify(
        event.queryStringParameters.searchTerm.replace(/ /g, '+'),
        null,
        2,
      ),
  );
}

const makeCustomerResponse = async (searchTerm, operation) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(
      {
        message: await deviceManagementAPI.query(searchTerm, operation)
      },
      null,
      2,
    ),
  };
}

module.exports.find= async event => {
  logEvent(event);
  const searchTerm = event.queryStringParameters.searchTerm.replace(/ /g,'+');
  return await makeCustomerResponse(searchTerm, "operation=findDeviceById&mode=true&associatedlandevices=true");
};

