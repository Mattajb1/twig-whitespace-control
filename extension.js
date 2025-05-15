const vscode = require('vscode');



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const disposable = vscode.commands.registerCommand('twig-whitespace-control.toggleWhitespace', function () {
	const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			
			// Declare replacement text
			let replacedText = selectedText;

			// Toggle whitespace cases
			if (replacedText.includes('{%-')) {
				replacedText = replacedText.replaceAll('{%-', '{%');
			} else if (replacedText.includes('{%')) {
				replacedText = replacedText.replaceAll('{%', '{%-');
			}

			if (replacedText.includes('-%}')) {
				replacedText = replacedText.replaceAll('-%}', '%}');
			} else if (replacedText.includes('%}')) {
				replacedText = replacedText.replaceAll('%}', '-%}');
			}

			if (replacedText.includes('{{-')) {
				replacedText = replacedText.replaceAll('{{-', '{{');
			} else if (replacedText.includes('{{')) {
				replacedText = replacedText.replaceAll('{{', '{{-');
			}

			if (replacedText.includes('-}}')) {
				replacedText = replacedText.replaceAll('-}}', '}}');
			} else if (replacedText.includes('}}')) {
				replacedText = replacedText.replaceAll('}}', '-}}');
			}					

			if (replacedText !== selectedText) {
				editor.edit(editBuilder => {
				editBuilder.replace(selection, replacedText);
				});
			}
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
