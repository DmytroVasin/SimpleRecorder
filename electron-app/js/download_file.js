const electron = require('electron');
const path = require('path');

const { app, dialog, session } = electron;

const downloadFile = function(mainWindow, url) {
  let targetPath = app.getPath('downloads');
  let name = fileName();

  mainWindow.webContents.send('start-track-downloading');

  dialog.showSaveDialog({
    title: 'Download Screen Record',
    defaultPath: path.join(targetPath, name),
    filters: [
      { name: 'Movies', extensions: ['mp4'] }
    ]
  }, function(filePath) {
    if (filePath) {

      session.defaultSession.on('will-download', function(event, item, webContents) {
        item.setSavePath(filePath)

        item.once('done', function(event, state) {
          mainWindow.webContents.send('finish-track-downloading');
          let title;
          let message;
          if (state === 'interrupted') {
            title = 'Something went wrong. Sorry.';
            message = '';
          }

          if (state === 'completed') {
            title = item.getSavePath().replace(/^.*[\\\/]/, '');
            message = 'File was download successfully';
          }

          sendNotification(mainWindow, title, message);
        });
      });

      mainWindow.webContents.downloadURL(url);
    } else {
      mainWindow.webContents.send('finish-track-downloading');
    }
  })
}

const sendNotification = function (mainWindow, title, message) {
  mainWindow.webContents.send('display-notification', {
    title: title,
    options: { body: message }
  })
}

const fileName = function() {
  let today = new Date();
  let month = (today.getMonth() + 1)
  let date = today.getDate()
  let year = today.getFullYear()
  let format = '.mp4'

  return 'ScreenRecord-'+month+'-'+date+'-'+year+format;
}

module.exports = downloadFile;
