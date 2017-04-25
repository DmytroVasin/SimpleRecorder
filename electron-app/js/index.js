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
const RecorderWindow  = require('../windows/recorder_window');
const TrayIcon = require('./TrayIcon');

const { startRecording, stopRecording } = require('./recorder');
const { saveFile } = require('./save_file');

let mainWindow = null;
let recorder = null;
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

  recorder = new RecorderWindow();
  recorder.window.show();
});

ipcMain.on('quit-app', function() {
  mainWindow.window.close();
  recorder.window.close();

  app.quit();
});

ipcMain.on('start-recording', () => {
  startRecording(recorder)
});

ipcMain.on('stop-recording', () => {
  stopRecording((recorderedFilePath) => {
    saveFile(recorderedFilePath, (savedFilePath) => {

      title = savedFilePath.replace(/^.*[\\\/]/, '');
      message = 'File was saved successfully';

      sendNotification(title, message);
    });
  })
});


const sendNotification = function (title, message) {
  mainWindow.window.webContents.send('display-notification', {
    title: title,
    options: { body: message }
  })
}

ipcMain.on('toggle-camera', () => {
  recorder.window.webContents.send('toggle-camera');
});


const installExtentions = function () {
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}

