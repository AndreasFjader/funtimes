const { convertDateTimeToFormatWithSelection } = require('../date-time.js');
const { conversionOptions } = require('../config.js');

async function convertDateTimeToEpoch() {
  convertDateTimeToFormatWithSelection(conversionOptions.epoch);
}

module.exports = { convertDateTimeToEpoch };