// src/extension.ts
import * as vscode from "vscode";
import { NotebookCell, NotebookCellKind, NotebookEditor } from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.runMarkdownCellgroup",
    async () => {
      const editor = vscode.window.activeNotebookEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active Jupyter notebook");
        return;
      }

      const sectionPath = await getSectionPathFromChord();
      if (!sectionPath) {
        return; // User cancelled the input
      }

      const cells = editor.notebook.getCells();
      const sections = getSections(cells);

      const targetSection = getTargetSection(sections, sectionPath);
      if (!targetSection) {
        vscode.window.showErrorMessage("Invalid section path");
        return;
      }

      await runCells(editor, targetSection.start, targetSection.end);
    }
  );

  context.subscriptions.push(disposable);
}

async function getSectionPathFromChord(): Promise<number[] | undefined> {
  return new Promise((resolve) => {
    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder =
      "Enter section path (1-9, Enter to confirm, Esc to cancel)";
    quickPick.items = [{ label: "" }];

    let path: number[] = [];

    quickPick.onDidChangeValue((value) => {
      const lastChar = value[value.length - 1];
      if (lastChar >= "1" && lastChar <= "9") {
        path.push(parseInt(lastChar));
        quickPick.items = [{ label: path.join(".") }];
      }
      quickPick.value = "";
    });

    quickPick.onDidAccept(() => {
      quickPick.hide();
      resolve(path);
    });

    quickPick.onDidHide(() => {
      resolve(undefined);
      quickPick.dispose();
    });

    quickPick.show();
  });
}

function getSections(cells: readonly NotebookCell[]): Section {
  const root: Section = { start: 0, end: cells.length - 1, subsections: [] };
  let currentSection: Section = root;
  let sectionStack: Section[] = [root];

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (cell.kind === NotebookCellKind.Markup) {
      const text = cell.document.getText();
      const headerLevel = text.match(/^#+/)?.[0].length || 0;

      if (headerLevel > 0) {
        while (sectionStack.length > headerLevel) {
          sectionStack.pop();
        }
        currentSection = sectionStack[sectionStack.length - 1];

        const newSection: Section = {
          start: i,
          end: cells.length - 1,
          subsections: [],
        };
        currentSection.subsections.push(newSection);
        sectionStack.push(newSection);
        currentSection = newSection;
      }
    }

    // Update the end index of all sections in the stack
    for (const section of sectionStack) {
      section.end = i;
    }
  }

  return root;
}

function getTargetSection(sections: Section, path: number[]): Section | null {
  let currentSection = sections;

  for (const index of path) {
    if (index <= 0 || index > currentSection.subsections.length) {
      return null;
    }
    currentSection = currentSection.subsections[index - 1];
  }

  return currentSection;
}

async function runCells(editor: NotebookEditor, start: number, end: number) {
  console.log(`start: ${start}, end: ${end + 1}`);
  await vscode.commands.executeCommand("notebook.cell.execute", {
    start: start,
    end: end + 1,
  });
}

interface Section {
  start: number;
  end: number;
  subsections: Section[];
}
