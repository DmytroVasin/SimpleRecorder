const isDev = (process.env.NODE_ENV === 'development');

const electron = require('electron');
const { BrowserWindow } = electron;
const platform = require('os').platform();
const path = require('path');

class MainWindow {
  constructor() {

    let htmlPath = 'file://' + path.join(__dirname, '..') + '/pages/main_page.html'

    this.window = new BrowserWindow({
      show: true, //false,
      height: 321,
      width: 800,
      frame: true, //false
      hasShadow: false,
      transparent: false, //true,
      resizable: false
    });

    this.window.loadURL(htmlPath);

    if ( !isDev ) {
      this.window.on('blur', () => {
        this.window.hide();
      });
    }
  }
}

module.exports = MainWindow;
