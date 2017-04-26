const isDev = (process.env.NODE_ENV === 'development');

const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');

class MainWindow {

  constructor() {
    let htmlPath = 'file://' + path.join(__dirname, '..') + '/pages/main_page.html'

    this.window = new BrowserWindow({
      show: true,
      height: 121,
      width: 200,
      frame: true,
      hasShadow: false,
      resizable: false,
      maximizable: false
    });

    this.window.loadURL(htmlPath);
    this.setWindowPosition();

    this.window.on('close', (e) => {
      app.quit();
    });
  }

  setWindowSize(state) {
    let height;
    let width = this.window.getSize()[0];

    if ( state ) {
      height = 191
    } else {
      height = 121
    }

    this.window.setSize(width, height);
  }

  setWindowPosition(bounds) {
    let monitorWidth = electron.screen.getPrimaryDisplay().workArea.width
    let windowWidth = this.window.getBounds().width

    this.window.setPosition(monitorWidth - windowWidth, 0);
  }
}

module.exports = MainWindow;
