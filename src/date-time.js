const vscode = require('vscode');
const { DateTime } = require('luxon');

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

  let convertedDateTime = convertToDesiredFormat(dateTimeObj, chosenOption);
  if (!convertedDateTime) {
    vscode.window.showErrorMessage(`Datetime conversion failed, the chosen option "${chosenOption}" is not supported.`)
    return;
  }

  // Replacing the selected text in the text editor does not wrap the string between quotes.
  // That must be done before the replacement happens.
  if (typeof convertedDateTime === String) {
    convertedDateTime = `'${convertedDateTime}'`;
  }

  editor.edit((e) => e.replace(selection, `${convertedDateTime}`));
}

function generateDateTimeFromInput(input) {
  // TODO: Check if the input is numerical or string, based on if it's wrapped in '' or "".
  const epoch = Number(input);
  if (!isNaN(epoch)) {
    return DateTime.fromSeconds(epoch);
  }
  return generateDateTimeFromStringInput(input);
}

function generateDateTimeFromStringInput(input) {
  const dtISO = DateTime.fromISO(input);
  if (dtISO.isValid) {
    return dtISO;
  }

  for (const format of validDateTimeStringFormats) {
    const dt = DateTime.fromFormat(input, format);
    if (dt.isValid) {
      return dt;
    }
  }

  return DateTime.invalid('non-approved datetime string format');
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