const isDev = (process.env.NODE_ENV === 'development');

let installExtension = null;
if ( isDev ) {
  installExtension = require('electron-devtools-installer');
}

const electron = require('electron');
const {app, ipcMain, Menu, shell} = electron;

const menuTemplate = require('./menuTemplate');
const MainWindow  = require('../windows/main_window');
const RecorderWindow  = require('../windows/recorder_window');
const TrayIcon = require('./TrayIcon');

const Actuary  = require('./actuary');
const { saveFile } = require('./save_file');

let mainWindow = null;
let recorder = null;
let trayIcon = null;
let actuary = null;

app.on('ready', () => {
  if ( isDev ) installExtentions();

  mainWindow = new MainWindow();
  Menu.setApplicationMenu( Menu.buildFromTemplate(menuTemplate(mainWindow)) );

  trayIcon = new TrayIcon();

  recorder = new RecorderWindow();
  actuary = new Actuary(recorder)
});

ipcMain.on('quit-app', () => {
  mainWindow.window.close();
  recorder.window.close();

  app.quit();
});

ipcMain.on('start-processing', (event) => {
  recorder.disable()

  actuary.startRecording(() => {
    mainWindow.window.webContents.send('finish-processing')
  });
});

ipcMain.on('start-cropping', () => {
  recorder.window.show();
});

ipcMain.on('stop-recording', () => {
  recorder.enable()
  recorder.window.hide()

  actuary.stopRecording((recorderedFilePath) => {
    saveFile(recorderedFilePath, (savedFilePath) => {

      title = savedFilePath.replace(/^.*[\\\/]/, '');
      message = 'File was saved successfully';

      sendNotification(title, message);
      mainWindow.window.webContents.send('finish-downloading')
    });
  })
});

ipcMain.on('toggle-camera', (event, boolean) => {
  recorder.window.webContents.send('toggle-camera', boolean);
});

ipcMain.on('toggle-audio', (event, boolean) => {
  actuary.toggleAudio(boolean)
});

ipcMain.on('resize-app-window', (event, boolean) => {
  mainWindow.setWindowSize(boolean);
});


const sendNotification = (title, message) => {
  mainWindow.window.webContents.send('display-notification', {
    title: title,
    options: { body: message }
  })
}


const installExtentions = () => {
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}

