const vscode = require('vscode');
const { DateTime } = require('luxon');

const { removeStringQuotes } = require('./utils.js');
const { validDateTimeStringFormats, conversionOptions } = require('./config.js');

async function convertDateTimeToFormat() {
  const editor = vscode.window.activeTextEditor;
	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);

  const dateTimeObj = generateDateTimeFromInput(selectedText);
  if (!dateTimeObj.isValid) {
    vscode.window.showErrorMessage(`Unable to register "${selectedText}" as datetime.`);
    return;
  }

  const options = Object.values(conversionOptions);
  const chosenOption = await vscode.window.showQuickPick(options);

  if (!chosenOption) {
    return;
  }

  const convertedDateTime = convertToDesiredFormat(dateTimeObj, chosenOption);
  if (!convertedDateTime) {
    vscode.window.showErrorMessage(`Datetime conversion failed, the chosen option "${chosenOption}" is not supported.`)
    return;
  }

  // Replacing the selected text in the text editor does not wrap the string between quotes.
  // That must be done before the replacement happens.
  if (typeof convertedDateTime === 'string') {
    editor.edit((e) => e.replace(selection, `'${convertedDateTime}'`));
  } else {
    editor.edit((e) => e.replace(selection, `${convertedDateTime}`));    
  }

}

function generateDateTimeFromInput(input) {
  // Remove excess string quotes here.
  const epoch = Number(input);
  if (!isNaN(epoch)) {
    return DateTime.fromSeconds(epoch);
  }
  return generateDateTimeFromStringInput(input);
}

function generateDateTimeFromStringInput(input) {
  // DateTime.fromFormat cannot validate if it's an ISO string. Must be done via fromISO.
  const strippedInput = removeStringQuotes(input);
  let dt = DateTime.fromISO(strippedInput);
  if (dt.isValid) {
    return dt;
  }

  for (const format of validDateTimeStringFormats) {
    dt = DateTime.fromFormat(strippedInput, format);
    if (dt.isValid) {
      return dt;
    }
  }
  // At this point, it's an invalid datetime object.
  return dt;
}

function convertToDesiredFormat(dateTime, convertOption) {
  switch(convertOption) {
    case conversionOptions.epoch:
      return dateTime.toSeconds();
    
    case conversionOptions.isoUTC:
      return dateTime.setZone('utc').toISO();

    case conversionOptions.isoLocal:
      return dateTime.toISO();

    default:
      return undefined;
  }
}

module.exports = {
  convertDateTimeToFormat,
}