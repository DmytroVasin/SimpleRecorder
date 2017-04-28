const buildPhoto = () => {
  desktopCapturer.getSources({ types: ['screen'] }, (error, sources) => {
    if (error) throw error;

    navigator.webkitGetUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sources[0].id,
          minWidth: 1280,
          maxWidth: 4000,
          minHeight: 720,
          maxHeight: 4000
        }
      }
    },
    handleStream,
    handleError
    );
  });
};

const handleError = (e) => {
  // Do nothing...
};

const handleStream = (stream) => {
  let video = document.createElement('video');
  video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;';

  video.onloadedmetadata = () => {
    video.style.height = video.videoHeight + 'px';
    video.style.width = video.videoWidth + 'px';

    drawCanvas(video)

    video.remove();
    try {
      stream.getTracks()[0].stop();
    } catch (e) {}
  };

  video.src = URL.createObjectURL(stream);
  document.body.appendChild(video);
};

const drawCanvas = (video) => {
  let canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  let ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  let base64src = canvas.toDataURL('image/jpeg');

  ipcRenderer.send('make-snapshot', base64src);
}

module.exports = {
  buildPhoto: buildPhoto
};
