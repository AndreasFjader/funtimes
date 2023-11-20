const { convertDateTimeToFormatWithSelection } = require('../date-time.js');
const { conversionOptions } = require('../config.js');

async function convertDateTimeToIsoLocal() {
  convertDateTimeToFormatWithSelection(conversionOptions.isoLocal);
}

module.exports = { convertDateTimeToIsoLocal };