import React, { Component } from 'react'

import { MenuRecorder } from './menu/recorder'
import { MenuSettings } from './menu/settings'

export class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recorder: 'picking',
      showVideo: false,
      withAudio: false,
      settingsOpen: false
    };
  }

  componentDidMount() {
    ipcRenderer.on('finish-processing', this.handleFinishProcessing);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('finish-processing', this.handleFinishProcessing);
  }


  takeVideo = () => {
    this.setState({
      recorder: 'video_cropping',
    }, () => {
      ipcRenderer.send('start-cropping');
    })
  }

  takePhoto = () => {
    this.setState({
      recorder: 'photo_cropping',
    }, () => {
      ipcRenderer.send('start-cropping');
    })
  }

  startRecording = () => {
    this.setState({
      recorder: 'processing',
    }, () => {
      ipcRenderer.send('start-processing', this.state.withAudio);
    })
  }

  handleFinishProcessing = () => {
    this.setState({
      recorder: 'recording'
    })
  }

  stopRecording = () => {
    ipcRenderer.send('stop-recording');
  }

  toggleAudio = (value) => {
    this.setState({
      withAudio: value
    });
  }

  toggleSettings = () => {
    this.setState({
      settingsOpen: !this.state.settingsOpen
    }, () => {
      ipcRenderer.send('resize-app-window', this.state.settingsOpen);
    });
  }

  toggleVideo = (value) => {
    this.setState({
      showVideo: value
    }, () => {
      ipcRenderer.send('toggle-camera', this.state.showVideo);
    });
  }

  render() {
    return (
      <div id='preview-page'>
        <MenuRecorder
          recorder={this.state.recorder}
          takeVideo={this.takeVideo}
          takePhoto={this.takePhoto}
          startRecording={this.startRecording}
          stopRecording={this.stopRecording} />

        <MenuSettings
          withAudio={this.state.withAudio}
          showVideo={this.state.showVideo}
          settingsOpen={this.state.settingsOpen}
          toggleVideo={this.toggleVideo}
          toggleAudio={this.toggleAudio}
          toggleSettings={this.toggleSettings} />
      </div>
    )
  }
}
