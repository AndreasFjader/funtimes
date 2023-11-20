const { convertDateTimeToFormatWithSelection } = require('../date-time.js');
const { conversionOptions } = require('../config.js');

async function convertDateTimeToIsoUTC() {
  convertDateTimeToFormatWithSelection(conversionOptions.isoUTC);
}

module.exports = { convertDateTimeToIsoUTC };