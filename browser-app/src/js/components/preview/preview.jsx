import React, { Component } from 'react'
import { buildPhoto } from '../../utils/screenshotter';

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
    ipcRenderer.on('finish-downloading', this.handleFinishDownloading);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('finish-processing', this.handleFinishProcessing);
    ipcRenderer.removeListener('finish-downloading', this.handleFinishDownloading);
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
      ipcRenderer.send('start-processing');
    })
  }

  handleFinishProcessing = () => {
    this.setState({
      recorder: 'recording'
    })
  }

  handleFinishDownloading = () => {
    this.setState({
      recorder: 'picking'
    })
  }

  stopRecording = () => {
    ipcRenderer.send('stop-recording');
  }

  toggleAudio = (value) => {
    this.setState({
      withAudio: value
    }, () => {
      ipcRenderer.send('toggle-audio', this.state.withAudio);
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

  makePhoto = (value) => {
    buildPhoto();
  }

  render() {
    return (
      <div id='preview-page'>
        <MenuRecorder
          recorder={this.state.recorder}
          takeVideo={this.takeVideo}
          takePhoto={this.takePhoto}
          startRecording={this.startRecording}
          stopRecording={this.stopRecording}
          makePhoto={this.makePhoto} />

        <MenuSettings
          recorder={this.state.recorder}
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
