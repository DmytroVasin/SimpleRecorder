const { rename } = require('fs');
const moment = require('moment');

const electron = require('electron');
const path = require('path');

const { app, dialog } = electron;

const saveFile = function(url, callback) {
  let targetPath = app.getPath('downloads');
  let name = fileName();

  dialog.showSaveDialog({
    title: 'Screen Record',
    defaultPath: path.join(targetPath, name),
    filters: [
      { name: 'Movies', extensions: ['mp4'] }
    ]
  }, function(filePath) {
    if (filePath) {
      rename(url, filePath);

      callback(filePath)
    }
  })
};

const fileName = function() {
  let data = moment().format('MMMM_Do_YYYY_hh_mm_ss')

  return `${data}.mp4`;
}

module.exports = {
  saveFile: saveFile
}
