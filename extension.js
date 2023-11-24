const vscode = require('vscode');
const { convertDateTimeToFormat } = require('./src/handlers/datetime-to-format.js');
const { convertDateTimeToEpoch } = require('./src/handlers/datetime-to-epoch.js')
const { convertDateTimeToIsoUTC } = require('./src/handlers/datetime-to-utc.js')
const { convertDateTimeToIsoLocal } = require('./src/handlers/datetime-to-local.js')

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const convertWithOptionsCommand = vscode.commands.registerCommand('extension.convertWithOption', convertDateTimeToFormat);
	const convertToEpochCommand = vscode.commands.registerCommand('extension.convertToEpoch', convertDateTimeToEpoch);
	const convertToUtcCommand = vscode.commands.registerCommand('extension.convertToUtc', convertDateTimeToIsoUTC);
	const convertToLocalCommand = vscode.commands.registerCommand('extension.convertToLocal', convertDateTimeToIsoLocal);

	context.subscriptions.push(convertWithOptionsCommand);
	context.subscriptions.push(convertToEpochCommand);
	context.subscriptions.push(convertToUtcCommand);
	context.subscriptions.push(convertToLocalCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
