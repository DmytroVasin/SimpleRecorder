const isDev = (process.env.NODE_ENV === 'development');

let installExtension = null;
if ( isDev ) {
  installExtension = require('electron-devtools-installer');
}

const electron = require('electron');
const {app, ipcMain, Menu, shell} = electron;

const platform = require('os').platform();
const menuTemplate = require('./menuTemplate');
const MainWindow  = require('../windows/main_window');
const TrayIcon = require('./TrayIcon');

const downloadFile = require('./download_file');

let mainWindow = null;
let trayIcon = null;

if ( !isDev ) {
  // Dock works only on Mac
  if (app.dock) {
    app.dock.hide();
  }
}

app.on('ready', function () {
  if ( isDev ) installExtentions();

  mainWindow = new MainWindow();
  Menu.setApplicationMenu( Menu.buildFromTemplate(menuTemplate(mainWindow)) );

  trayIcon = new TrayIcon(mainWindow);
});

ipcMain.on('quit-app', function() {
  mainWindow.window.close();
  app.quit();
});

ipcMain.on('dowload-file-from-url', function(event, url) {
  downloadFile(mainWindow.window, url)
});

const installExtentions = function () {
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}
