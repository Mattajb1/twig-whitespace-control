const vscode = require('vscode');



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	console.log('test');

	const disposable = vscode.commands.registerCommand('twig-whitespace-control.toggleWhitespace', function () {
			const editor = vscode.window.activeTextEditor;
	if (editor) {
		const selection = editor.selection;
		let selectedText = editor.document.getText(selection);
		
		if (selectedText.includes('{%')) {
			let replacedText = selectedText.replaceAll('{%', '{%-')

			editor.edit(editBuilder => {
				editBuilder.replace(selection, replacedText)
			})
			
		}

		vscode.window.showInformationMessage(selectedText);
	}
	
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
