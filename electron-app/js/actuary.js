const electron = require('electron');
const aperture = require('aperture')();
const jimp = require('jimp');

class Actuary {
  constructor(recorder) {
    this.recorder = recorder
    this.workArea = electron.screen.getPrimaryDisplay().workArea
    this.options = {
      fps: 30,
      showCursor: true,
      highlightClicks: true,
      audioSourceId: 'none'
    }
  }

  cropScreenshot(base64data, callback) {
    let encondedImageBuffer = new Buffer(base64data.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');

    jimp.read(encondedImageBuffer, (err, image) => {
      if (err) throw err;

      let cropArea = this.recorder.window.getBounds()
      cropArea = this.removeBorders(cropArea)

      image.crop(cropArea.x, cropArea.y, cropArea.width, cropArea.height)

      callback(image)
    });
  }

  startRecording(callback) {
    console.log('-------------------------------------------------')
    console.log(`Preparing at: ${Date.now() / 1000}s`)
    console.log('-------------------------------------------------')

    this.options['cropArea'] = this.calculateCropArea();

    aperture.startRecording(this.options).then(filePath => {
      console.log('-------------------------------------------------')
      console.log(`Recording at: ${Date.now() / 1000}s`);
      console.log('-------------------------------------------------')
      callback();
    })
  }

  stopRecording(callback) {
    aperture.stopRecording()
      .then(filePath => {
        console.log(`file path: ${filePath}`);
        console.log(`Stop recording after ${Date.now() / 1000}s`);
        callback(filePath);
      });
  }

  toggleAudio(boolean) {
    if (boolean) {
      aperture.getAudioSources().then(devices => {
        this.options['audioSourceId'] = (devices && devices[0] && devices[0].id) || 'none';
      });
    } else {
      this.options['audioSourceId'] = 'none';
    }
  }

  calculateCropArea() {
    let area = this.recorder.window.getBounds()
    // Electron use top/left corner
    // aperture use bottom/left corne
    area.y = (this.workArea.height + this.workArea.y) - (area.height + area.y);

    // Remove dashed boundaries
    area = this.removeBorders(area)

    return area;
  }

  removeBorders(area) {
    area.x += 1;
    area.y += 1;
    area.width -= 2;
    area.height -= 2;

    return area
  }
}

module.exports = Actuary;
