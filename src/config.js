const validDateTimeStringFormats = [
  'yyyy-MM-dd HH:mm:ss',
  'yyyy-MM-ddTHH:mm:ss',
  'yyyy-MM-dd',
  'yyyy MM dd',
  'yyyy MM dd HH:mm:ss',
  'yyyy MM dd HH mm ss',
  'MMM dd yyyy HH:mm:ss',
  'MMM dd yyyy',
];

const conversionOptions = {
  epoch: 'Epoch',
  isoLocal: 'ISO Local',
  isoUTC: 'ISO UTC'
}

module.exports = {
  validDateTimeStringFormats,
  conversionOptions,
}
