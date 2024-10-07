import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "my-vscode-extension" is now active!');

  let disposable = vscode.commands.registerCommand('myExtension.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from My VSCode Extension!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}