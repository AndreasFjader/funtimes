const vscode = require('vscode');
const luxon = require('luxon');
const { convertDateTimeToFormat } = require('./src/date-time.js');

const { DateTime } = luxon;
const conversionTypes = {
  toEpoch: 'Epoch',
  toISOLocal: 'ISO Local',
  toISOUTC: 'ISO UTC'
}

/**
 * @param {vscode.ExtensionContext} context
 */

function dtConverter(dt, type) {
  switch (type) {
    case conversionTypes.toEpoch:
      return dt.toSeconds();
    case conversionTypes.toISOLocal:
      return dt.toISO();
    case conversionTypes.toISOUTC:
      return dt.setZone('utc').toISO();
    default: return '';
  }
}

function convertIfValidDateTimeString(input) {
  const acceptedFormats = [
    'yyyy-MM-dd HH:mm:ss',
    'yyyy-MM-ddTHH:mm:ss',
    'yyyy-MM-ddTHH:mm:ss.SSSZ',
    'yyyy-MM-dd',
    'yyyy MM dd',
    'yyyy MM dd HH:mm:ss',
    'yyyy MM dd HH mm ss',
    'MMM dd yyyy HH:mm:ss',
    'MMM dd yyyy',
  ];

  for (const format of acceptedFormats) {
    const dt = DateTime.fromFormat(input, format);
    if (dt.isValid) { 
      return dt; 
    }
  }

  return DateTime.invalid('foobarbaz');
}

async function dateTimeConverter() {
	const editor = vscode.window.activeTextEditor;
	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);

  let dateTime;
  // Check if the input is a valid datetime of any kind.
  if (!isNaN(Number(selectedText))) {
    dateTime = DateTime.fromSeconds(Number(selectedText));
  } else {
    dateTime = convertIfValidDateTimeString(selectedText);
  }

	if (!dateTime.isValid) {
    vscode.window.showErrorMessage(`Unable to register "${selectedText}" as datetime.`);
    return;
	}

  const options = Object.values(conversionTypes);
  const conversionType = await vscode.window.showQuickPick(options);

  if (!conversionType) {
    return;
  }

  editor.edit((e) => e.replace(selection, `${dtConverter(dateTime, conversionType)}`));
}

async function activate(context) {
	const testCommand = vscode.commands.registerCommand('extension.showDialog', convertDateTimeToFormat);
	context.subscriptions.push(testCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
