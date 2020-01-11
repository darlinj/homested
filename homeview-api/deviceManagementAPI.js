const axios = require('axios');
var parser = require('fast-xml-parser');

module.exports.query = async(searchTerm, operation_params) => {
  console.info('URL', `${process.env.HDM_URL_PART1}${searchTerm}${process.env.HDM_URL_PART2}${operation_params}`)
  return axios({
    method: 'get',
    auth: {
      username: process.env.HDM_USER,
      password: process.env.HDM_PASSWORD,
    },
    url: `${process.env.HDM_URL_PART1}${searchTerm}${process.env.HDM_URL_PART2}${operation_params}`,
  })
    .then(function(response) {
      console.log('RESPONSE:', response.data);
      const parsedData = parser.parse(response.data, {ignoreNameSpace: true});
      const responseData = parsedData['requestResponses']['requestResponse'];
      const errorData = responseData['errorMessage'];
      let filteredData = {};
      if (responseData['nameValues']) {
        filteredData = responseData['nameValues'].reduce(
          (acc, nameValuePair) => {
            return {[nameValuePair.name]: nameValuePair.value || 'empty', ...acc};
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

