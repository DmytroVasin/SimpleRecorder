const isDev = (process.env.NODE_ENV === 'development');

let installExtension = null;
if ( isDev ) {
  installExtension = require('electron-devtools-installer');
}

const aperture = require('aperture')();
const electron = require('electron');
const {app, ipcMain, Menu, shell} = electron;

const platform = require('os').platform();
const menuTemplate = require('./menuTemplate');
const MainWindow  = require('../windows/main_window');
const RecorderWindow  = require('../windows/recorder_window');
const TrayIcon = require('./TrayIcon');

const { saveFile } = require('./download_file');

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
  startRecording()
});

ipcMain.on('stop-recording', () => {
  stopRecording()
});

ipcMain.on('toggle-camera', () => {
  recorder.window.webContents.send('toggle-camera');
});


const installExtentions = function () {
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}

// ----------------------------------- RECORDING

const startRecording = function () {
  let cropArea = recorder.window.getBounds()
  let workArea = electron.screen.getPrimaryDisplay().workArea

  // Electron use top/left corner
  // aperture use bottom/left corne
  cropArea.y = (workArea.height + workArea.y) - (cropArea.height + cropArea.y);

  // Remove dashed boundaries
  cropArea.x += 1;
  cropArea.y += 1;
  cropArea.width -= 2;
  cropArea.height -= 2;

  const options = {
    fps: 30,
    cropArea: cropArea,
    showCursor: true,
    highlightClicks: true
  };

  aperture.startRecording(options).then(filePath => {
    console.log(`Started recording after ${Date.now() / 1000}s`);
  })
  .catch(err => {
    console.log('.....................................')
    console.log(err);
    console.log('.....................................')
  });
}

const stopRecording = function () {
  aperture.stopRecording()
    .then(filePath => {
      console.log(`file path: ${filePath}`);
      console.log(`Stop recording after ${Date.now() / 1000}s`);
      saveFile(mainWindow.window, filePath);
    });

  recorder.window.hide();
}
