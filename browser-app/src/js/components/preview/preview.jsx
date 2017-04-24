import React, { Component } from 'react'

let localStream
let recordedChunks = []
let recorder

export class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true
    };
  }

  handleStream = (stream) => {
    let { video } = this.refs;

    video.src = window.URL.createObjectURL(stream)
    video.onloadedmetadata = (e) => { video.play() }
  }

  handleError = (e) => {
    console.log(e)
  }

  startRec = () => {

    navigator.getUserMedia(
      { audio: true, video: { width: 400, height: 200 } },
      this.getMediaSuccess,
      this.getMediaError
    );

  }

  startDesktopRec = () => {
    ipcRenderer.send('start-recording');
  }

  stopDesktopRec = () => {
    ipcRenderer.send('stop-recording');
  }

  stopRec = () => {
    let { video } = this.refs;

    console.log('Stopping record and starting download')

    recorder.stop()
    recorder = null

    // http://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
    localStream.getVideoTracks()[0].stop();
    localStream.getAudioTracks()[0].stop();
    localStream = null

    video.src = ''
  }

  getMediaSuccess = (stream) => {
    localStream = stream

    this.updateRecordingAudio()
    this.showVideo(stream)
    this.startRecording(stream)
  }

  showVideo = (stream) => {
    let { video } = this.refs

    video.src = window.URL.createObjectURL(stream)
    video.onloadedmetadata = (e) => { video.play() }
  }

  startRecording = (stream) => {
    recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' })
    recorder.ondataavailable = this.handleRecorderDataAvailable
    recorder.onstop = (e) => { console.log('-------------STOP---------------------') }
    recorder.start()

    console.log('-------------START---------------------')
  }

  getMediaError = (e) => {
    console.log(e)
    console.log('getUserMedia() failed.')
  }

  handleRecorderDataAvailable = (event) => {
    if (event.data.size > 0) {
      console.log(' Recorded chunk of size ' + event.data.size + 'B');

      recordedChunks.push(event.data)
    }
  }

  downloadRecording = () => {
    let blob = new Blob(recordedChunks)
    let blob_url = window.URL.createObjectURL(blob)

    // ipcRenderer.send('dowload-file-from-url', blob_url);
  }

  playLast = () => {
    let { video } = this.refs;

    let blob = new Blob(recordedChunks)
    let blob_url = window.URL.createObjectURL(blob)

    video.src = blob_url
  }

  handleAudioChange = () => {
    let newMicState = !this.state.isOn

    this.setState({
      isOn: newMicState
    }, () => {
      this.updateRecordingAudio()
    });


  }

  updateRecordingAudio = (isEnabled) => {
    let { isOn } = this.state

    if (localStream && localStream.getAudioTracks()[0]) {
      localStream.getAudioTracks()[0].enabled = isEnabled;
    }
  }

  render() {
    const { text } = this.props

    return (
      <div>
        <button onClick={ this.startDesktopRec }>Record Desktop</button>
        <button onClick={ this.stopDesktopRec }>Stop Record Desktop</button>
        <button onClick={ this.startRec }>Record Camera</button>
        <button onClick={ this.stopRec }>Stop Recording</button>
        <button onClick={ this.downloadRecording }>Downlaod</button>
        <button onClick={ this.playLast }>Play last video</button>
        <label >
          <input type='checkbox' checked={this.state.isOn} onChange={this.handleAudioChange}/>
          Mic is On
        </label>
        <video ref='video'></video>
      </div>
    )
  }
}
