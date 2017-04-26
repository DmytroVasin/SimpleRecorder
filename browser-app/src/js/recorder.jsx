import '../styles/recorder.scss'

import React, { Component } from 'react'
import { render } from 'react-dom'
import classNames from 'classnames';

class Recorder extends Component {

  constructor(props) {
    super(props);

    this.localStream = null;
    this.state = {
      camera: false
    };
  }

  componentDidMount() {
    ipcRenderer.on('toggle-camera', this.toggleCamera);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('toggle-camera', this.toggleCamera);
  }

  toggleCamera = (event, boolean) => {
    this.setState({
      camera: boolean
    }, () => {
      if (this.state.camera) {
        this.startCamera()
      } else {
        this.stopCamera()
      }
    });
  }

  stopCamera = () => {
    let { video } = this.refs

    this.localStream.getVideoTracks()[0].stop();
    video.src = null
  }

  startCamera = () => {
    navigator.getUserMedia(
      { audio: false, video: { width: 100, height: 100 } },
      this.getMediaSuccess,
      this.getMediaError
    );
  }

  getMediaSuccess = (stream) => {
    this.localStream = stream

    let { video } = this.refs
    video.src = window.URL.createObjectURL(stream)
    video.onloadedmetadata = (e) => { video.play() }
  }

  getMediaError = (e) => {
    console.log(e)
    console.log('getUserMedia() failed.')
  }


  render() {
    const { camera } = this.state;

    return (
      <div className='window'>
        <video ref='video' id='camera-preview' className={ classNames({ 'show': camera }) }></video>
      </div>
    )
  }
}

render(<Recorder />, document.getElementById('react-root'))
