import React, { Component } from 'react'

import { MenuRecorder } from './menu/recorder'
import { MenuSettings } from './menu/settings'

export class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      showVideo: true,
      settingsOpen: false
    };
  }

  startRecording = () => {
    ipcRenderer.send('start-recording');
  }

  toggleVideo = (value) => {
    this.setState({
      showVideo: value
    }, () => {
      ipcRenderer.send('toggle-camera', this.state.showVideo);
    });
  }

  toggleSettings = () => {
    this.setState({
      settingsOpen: !this.state.settingsOpen
    }, () => {
      ipcRenderer.send('resize-app-window', this.state.settingsOpen);
    });
  }

  render() {

    return (
      <div id='preview-page'>
        <MenuRecorder startRecording={this.startRecording} />

        <MenuSettings
          recording={this.state.recording}
          showVideo={this.state.showVideo}
          settingsOpen={this.state.settingsOpen}
          toggleVideo={this.toggleVideo}
          toggleSettings={this.toggleSettings} />
      </div>
    )
  }
}
