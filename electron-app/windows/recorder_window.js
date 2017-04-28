const { BrowserWindow } = require('electron');
const path = require('path');

class RecorderWindow {
  constructor() {

    let htmlPath = 'file://' + path.join(__dirname, '..') + '/pages/recorder_window.html'

    this.window = new BrowserWindow({
      show: false,
      height: 400,
      width: 600,
      minHeight: 200,
      minWidth: 200,
      frame: false,
      hasShadow: false,
      alwaysOnTop: true,
      transparent: true,
      resizable: true
    });

    this.window.loadURL(htmlPath);
  }

  disable() {
    this.window.setResizable(false);
    this.window.setIgnoreMouseEvents(true);
  }

  enable() {
    this.window.setResizable(true);
    this.window.setIgnoreMouseEvents(false);
  }
}

module.exports = RecorderWindow;
