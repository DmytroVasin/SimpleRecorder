const isDev = (process.env.NODE_ENV === 'development');

const electron = require('electron');
const { BrowserWindow } = electron;
const path = require('path');

class MainWindow {

  constructor() {
    let htmlPath = 'file://' + path.join(__dirname, '..') + '/pages/main_page.html'

    this.window = new BrowserWindow({
      show: true,
      height: 150,
      width: 200,
      frame: true,
      hasShadow: false,
      resizable: false
    });

    this.window.loadURL(htmlPath);
  }

  setWindowSize(state) {
    let height;
    let width = this.window.getSize()[0];

    if ( state ) {
      height = 250
    } else {
      height = 150
    }

    this.window.setSize(width, height);
  }
}

module.exports = MainWindow;
