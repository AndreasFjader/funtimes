# Fun Times

Fun Times is a VS Code extension that simplifies converting datetime formats. No more need for an external website or other program!

## Features

Select a datetime string or an epoch time in seconds. Then simply press one of the following key combinations (currently only for Windows):

- `CTRL + SHIFT + ,` -> Opens a dialog where you can select which datetime format to convert into.
- `CTRL + ALT + U` -> Converts to a UTC datetime string (yyyy-MM-ddTHH:mm:ss.SSSZ)
- `CTRL + ALT + I` -> Converts to epoch in seconds
- `CTRL + ALT + L` -> Convers to a datetime string local to your machines timezone (yyyy-MM-ddTHH:mm:ss + HH:mm)

## Installation

1. Go to the "Extension" view in VS Code.
2. Click **Views and More Actions...**
3. Select **Install from VSIX...**

Alternatively, install from the command line:

Run the command:
```bash
code --install-extension funtimes
```

## Known Issues

The extension currently only supports conversions to epoch, local, and UTC timestamps.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.5

Added handlers to allow for converting directly via keypresses, as opposed to selecting a conversion option via the dialogue window.

### 0.1.0

Packaged into installable extension for the first testing phase.
