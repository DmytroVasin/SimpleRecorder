const { app, Tray, Menu } = require('electron');
const path = require('path');

class TrayIcon {
  constructor() {
    this.tray = new Tray(path.join(__dirname, '../icons/mac/icon-22.png'));

    this.tray.setToolTip('WebRTCViewer')
    this.tray.setHighlightMode('never')

    const contextMenu = Menu.buildFromTemplate([
      { label: 'Start' },
      { label: 'Take Snapshot' },
      { type: 'separator' },
      {
        label: 'Quit Recorder',
        click: () => {
          app.quit();
        }
      }
    ])

    this.tray.setContextMenu(contextMenu)
  }
}

module.exports = TrayIcon;
