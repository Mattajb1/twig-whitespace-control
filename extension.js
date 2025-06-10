const vscode = require('vscode');



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// FUNCTION: Toggle whitespace
	const toggleWhitespace = vscode.commands.registerCommand('twig-whitespace-control.toggleWhitespace', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);

			let replacedText = selectedText;

			// Twig cases
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

			if (replacedText.includes('-#}')) {
				replacedText = replacedText.replaceAll('-#}', '#}');
			} else if (replacedText.includes('#}')) {
				replacedText = replacedText.replaceAll('#}', '-#}');
			}

			if (replacedText.includes('{#-')) {
				replacedText = replacedText.replaceAll('{#-', '{#');
			} else if (replacedText.includes('{#')) {
				replacedText = replacedText.replaceAll('{#', '{#-');
			}

			if (replacedText !== selectedText) {
				editor.edit(editBuilder => {
				editBuilder.replace(selection, replacedText);
				});
			}
		}
	});

	// FUNCTION: One line 
	const oneLine = vscode.commands.registerCommand('twig-whitespace-control.oneLine', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);

			let replacedText = selectedText;

			//Removes newlines and tab. TODO: Remove all whitespace except inside twig wrappers
			if (/(\r\n|\n|\r|\t)/g.test(selectedText)) {
				replacedText = selectedText.replace(/(\r\n|\n|\r|\t)/g, '');
			}

			if (replacedText !== selectedText) {
				console.log(selectedText, replacedText);
				editor.edit(editBuilder => {
				editBuilder.replace(selection, replacedText);
				})
			}
		}
	})

	// FUNCTION: Twig beautify (WIP)
	const twigBeautify = vscode.commands.registerCommand('twig-whitespace-control.twigBeautify', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			let selectedText = editor.document.getText(selection);

			let replacedText = selectedText;

			// Twig cases
			if (replacedText.includes('%}')) {
				replacedText = replacedText.replaceAll('-%}', '%}');
			} else if (replacedText.includes('%}')) {
				replacedText = replacedText.replaceAll('%}', '-%}');
			}

			if (replacedText.includes('-}}')) {
				replacedText = replacedText.replaceAll('-}}', '}}');
			} else if (replacedText.includes('}}')) {
				replacedText = replacedText.replaceAll('}}', '-}}');
			}

			if (replacedText.includes('-#}')) {
				replacedText = replacedText.replaceAll('-#}', '#}');
			} else if (replacedText.includes('#}')) {
				replacedText = replacedText.replaceAll('#}', '-#}');
			}

			if (replacedText !== selectedText) {
				console.log('Not finished')
				/*
				editor.edit(editBuilder => {
				editBuilder.replace(selection, replacedText); 
				});
				*/
			}
		}
	});

	// Push functiions to disposable array subscriptions
	context.subscriptions.push(toggleWhitespace, oneLine);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
