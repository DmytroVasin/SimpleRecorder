import '../styles/recorder.scss'

import React, { Component } from 'react'
import { render } from 'react-dom'
import classNames from 'classnames';

class Recorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      camera: true
    };

    navigator.getUserMedia(
      { audio: false, video: { width: 400, height: 200 } },
      this.getMediaSuccess,
      this.getMediaError
    );
  }

  getMediaSuccess = (stream) => {
    this.showVideo(stream)
  }

  getMediaError = (e) => {
    console.log(e)
    console.log('getUserMedia() failed.')
  }

  showVideo = (stream) => {
    let { video } = this.refs

    video.src = window.URL.createObjectURL(stream)
    video.onloadedmetadata = (e) => { video.play() }
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
    });
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
