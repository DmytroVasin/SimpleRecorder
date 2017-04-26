import React, { Component } from 'react'

import videoSrc from '../../../images/video.png';
import imageSrc from '../../../images/image.png';

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

  handleToggleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isOn: value
    }, () => {
      ipcRenderer.send('toggle-camera', this.state.isOn);
    });
  }

  render() {
    const { text } = this.props

    return (
      <div id='preview-page'>

        <div className='button big'>
          <img src={videoSrc} />
        </div>
        <div className='button big'>
          <img src={imageSrc} />
        </div>

        <div id='settings'>
          <div className='row'>
            <div className='question'>
              Grab video
            </div>

            <div className='switch'>
              <input id='cmn-toggle-1' className='cmn-toggle cmn-toggle-round-flat' type='checkbox' checked={this.state.isOn} onChange={this.handleToggleChange}/>
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
