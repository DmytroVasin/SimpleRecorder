const { BrowserWindow } = require('electron');
const path = require('path');

class RecorderWindow {
  constructor() {

    let htmlPath = 'file://' + path.join(__dirname, '..') + '/pages/recorder_window.html'

    this.window = new BrowserWindow({
      show: false,
      height: 400,
      width: 600,
      minHeight: 100,
      minWidth: 100,
      frame: false,
      hasShadow: false,
      transparent: true,
      resizable: true,
      alwaysOnTop: true
    });

    this.window.loadURL(htmlPath);
  }
}

module.exports = RecorderWindow;
