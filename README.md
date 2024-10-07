# Jupyter Notebook Section Runner

This VSCode extension allows you to run a specific section or subsection of your Jupyter notebook via keyboard shortcut.

## Installation

1. Open VSCode
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "Jupyter Notebook Section Runner"
4. Click Install

## Usage / Example

```
1. Introduction
2. Data Preprocessing
3. Model Training
3.1 Training Model V1
3.1.1 Training Model V1.1
3.2 Training Model V2
4. Visualization
```

1. To run all of section 3 (Model Training):

   - Press `CTRL+CMD+G` (or `CTRL+ALT+G` on Windows / Linux)
   - Type `3`
   - Press Enter
   - Section 3 and all subsections get run

2. To run section 3.1.1 (Training Model V1.1):
   - Press `CTRL+CMD+G` (or `CTRL+ALT+G` on Windows / Linux)
   - Type `311`
   - Press Enter
   - Exclusively Training Model V1.1 gets run

## How I use this extension

I tend to hack around in jupyter notebooks, rendering images and plots. Sometimes I tweak something mutliple cells up and need to rerun a series of cells. I'll use this to quickly fire off a executions of particular cells, without executing all the remaining cells in the notebook, as sometimes it will kick off multiple training jobs in sequence.

## Default Keybinding

The default keybinding to activate the Section runner is:

- macOS: `ctrl+cmd+g`
- Windows/Linux: `ctrl+alt+g`

## Customizing Keybindings

To change the keybinding:

1. Open the Keyboard Shortcuts editor in VSCode:
   - Windows/Linux: File > Preferences > Keyboard Shortcuts
   - macOS: Code > Preferences > Keyboard Shortcuts
2. Search for "Run Notebook Section"
3. Click the plus icon next to the command to add a new keybinding
4. Press your desired key combination
5. The new keybinding will be saved automatically

## Feedback and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue on my GitHub repository. Contributions are welcome!

## License

This extension is released under the MIT License. See the LICENSE file for details.
