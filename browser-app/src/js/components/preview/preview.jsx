import React, { Component } from 'react'
import classNames from 'classnames';

import videoSrc from '../../../images/video.png';
import imageSrc from '../../../images/image.png';

let localStream
let recordedChunks = []
let recorder

export class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true,
      settingsOpen: false
    };
  }

  handleToggleVideo = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isOn: value
    }, () => {
      ipcRenderer.send('toggle-camera', this.state.isOn);
    });
  }

  handleToggleSettings = () => {
    this.setState({
      settingsOpen: !this.state.settingsOpen
    }, () => {
      this.resizeAppWindow()
    });
  }

  resizeAppWindow = () => {
    ipcRenderer.send('resize-app-window', this.state.settingsOpen);
  }

  render() {
    const { text } = this.props
    const { settingsOpen, isOn } = this.state

    return (
      <div id='preview-page'>

        <div id='main-preview'>
          <div id='big-buttons'>
            <div className='button'>
              <img src={videoSrc} />
            </div>

            <div className='button'>
              <img src={imageSrc} />
            </div>
          </div>

          <div id='show-more' className={ classNames({ 'active': settingsOpen }) } onClick={this.handleToggleSettings}>
            Settings
          </div>
        </div>

        <div id='settings'>
          <div className='row'>
            <div className='question'>
              Grab video
            </div>

            <div className='switch'>
              <input id='cmn-toggle-1' className='cmn-toggle cmn-toggle-round-flat' type='checkbox' checked={isOn} onChange={this.handleToggleVideo}/>
              <label htmlFor='cmn-toggle-1'></label>
            </div>
          </div>

          <div className='row'>
            <div className='question'>
              Grab audio
            </div>

            <div className='switch'>
              <input id='cmn-toggle-2' className='cmn-toggle cmn-toggle-round-flat' type='checkbox' />
              <label htmlFor='cmn-toggle-2'></label>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
