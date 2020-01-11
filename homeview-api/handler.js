'use strict';
var databaseManager = require('./databaseManager');
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


const makeDiagnosticsResponse = async (searchTerm, operation) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(
      {
        message: await databaseManager.getItem(searchTerm)
      },
      null,
      2,
    ),
  };
}

const updateDiagnosticDataCache = async (searchTerm, operation) => {
  const diagnosticData = await deviceManagementAPI.query(searchTerm, operation);
  diagnosticData.serialNumber = searchTerm;
  if (/REQUESTED/.test(diagnosticData.result)) {
    return;
  }
  else {
    databaseManager.saveItem(diagnosticData);
  }
}

module.exports.findCustomer = async event => {
  logEvent(event);
  const searchTerm = event.queryStringParameters.searchTerm.replace(/ /g,'+');
  return await makeCustomerResponse(searchTerm, "operation=findDeviceById&mode=true&associatedlandevices=true");
};

module.exports.getDiagnostics = async event => {
  logEvent(event);
  const searchTerm = event.queryStringParameters.searchTerm.replace(/ /g,'+');
  updateDiagnosticDataCache(searchTerm, "operation=diagnosticTest&TestName=selfTest");
  return await makeDiagnosticsResponse(searchTerm, "operation=diagnosticTest&TestName=selfTest");
};

