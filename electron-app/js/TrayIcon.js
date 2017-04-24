const { Tray } = require('electron');
const path = require('path');

class TrayIcon {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    this.tray = new Tray(path.join(__dirname, '../icons/mac/icon-22.png'));

    this.tray.setToolTip('WebRTCViewer')
    this.tray.setHighlightMode('never')

    this.tray.on('click', this._toggleWindow.bind(this))
    this.tray.on('right-click', this._toggleWindow.bind(this))
    this.tray.on('double-click', this._toggleWindow.bind(this))
  }

  _toggleWindow(e, bounds) {
    if ( this.mainWindow.window.isVisible() ) {
      this.mainWindow.window.hide();
    } else {
      this.mainWindow.setWindowPosition(bounds);
      this.mainWindow.window.show();
    }
  }
}

module.exports = TrayIcon;
