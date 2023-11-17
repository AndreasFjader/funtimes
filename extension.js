const vscode = require('vscode');
const { convertDateTimeToFormat } = require('./src/date-time.js');

/**
 * @param {vscode.ExtensionContext} context
 */

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
