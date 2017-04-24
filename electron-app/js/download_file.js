const { rename } = require('fs');
const moment = require('moment');

const electron = require('electron');
const path = require('path');

const { app, dialog, session } = electron;

const saveFile = function(mainWindow, url) {
  let targetPath = app.getPath('downloads');
  let name = fileName();
  let message

  dialog.showSaveDialog({
    title: 'Download Screen Record',
    defaultPath: path.join(targetPath, name),
    filters: [
      { name: 'Movies', extensions: ['mp4'] }
    ]
  }, function(filePath) {
    if (filePath) {
      rename(url, filePath);
    }

    title = filePath.replace(/^.*[\\\/]/, '');
    message = 'File was download successfully';

    // mainWindow.webContents.send('finish-track-downloading');
    sendNotification(mainWindow, name, message);
  })
};

const sendNotification = function (mainWindow, title, message) {
  mainWindow.webContents.send('display-notification', {
    title: title,
    options: { body: message }
  })
}

const fileName = function() {
  let data = moment().format('MMMM_Do_YYYY_hh_mm_ss')

  return `${data}.mp4`;
}

module.exports = {
  saveFile: saveFile
}
