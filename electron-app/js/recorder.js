const electron = require('electron');
const aperture = require('aperture')();

const startRecording = function (recorder, boolean, callback) {
  console.log('-------------------------------------------------')
  console.log('Preparing: ...-----------------------------------')
  console.log('-------------------------------------------------')

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
  audioSourceId = 'none';

  if (boolean) {
    aperture.getAudioSources().then(devices => {
      // WILL NOT APPLY
      audioSourceId = (devices && devices[0] && devices[0].id) || 'none';
    });
  }

  const options = {
    fps: 30,
    cropArea: cropArea,
    showCursor: true,
    highlightClicks: true,
    audioSourceId: audioSourceId
  };

  aperture.startRecording(options).then(filePath => {
    console.log('-------------------------------------------------')
    console.log(`Started recording after ${Date.now() / 1000}s`);
    console.log('-------------------------------------------------')
    callback();
  })
  .catch(err => {
    console.log('-------------------------------------------------')
    console.log(err);
    console.log('-------------------------------------------------')
  });
}

const stopRecording = function (callback) {
  aperture.stopRecording()
    .then(filePath => {
      console.log(`file path: ${filePath}`);
      console.log(`Stop recording after ${Date.now() / 1000}s`);
      callback(filePath);
    });
}


module.exports = {
  startRecording: startRecording,
  stopRecording: stopRecording
}
