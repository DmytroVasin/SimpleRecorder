const isDev = (process.env.NODE_ENV === 'development');

const electron = require('electron');
const { BrowserWindow } = electron;
const platform = require('os').platform();
const path = require('path');

class MainWindow {
  constructor() {

    let htmlPath = 'file://' + path.join(__dirname, '..') + '/pages/main_page.html'

    this.window = new BrowserWindow({
      show: true,
      height: 200,
      width: 600,
      frame: true,
      hasShadow: false,
      resizable: false
    });

    this.window.loadURL(htmlPath);

  }
}

module.exports = MainWindow;
