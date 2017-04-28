const { rename } = require('fs');
const moment = require('moment');

const electron = require('electron');
const path = require('path');

const { app, dialog } = electron;


const saveFile = (url, callback) => {
  let targetPath = app.getPath('downloads');
  let name = fileName();

  dialog.showSaveDialog({
    title: 'Screen Record',
    defaultPath: path.join(targetPath, name),
    filters: [
      { name: 'Movies', extensions: ['mp4'] }
    ]
  }, (filePath) => {
    if (filePath) {
      rename(url, filePath);

      callback(filePath)
    }
  })
};

const saveScreenshot = (image, callback) => {
  let targetPath = app.getPath('downloads');
  let name = fileName();

  dialog.showSaveDialog({
    title: 'Screen Record',
    defaultPath: path.join(targetPath, name),
    filters: [
      { name: 'Images', extensions: ['jpg'] },
    ]
  }, function (filePath) {
    if (filePath){
      image.write(filePath)

      callback(filePath)
    }
  });
}

const fileName = () => {
  let data = moment().format('MMMM_Do_YYYY_hh_mm_ss')

  return `${data}.mp4`;
};

module.exports = {
  saveFile: saveFile,
  saveScreenshot: saveScreenshot
}
