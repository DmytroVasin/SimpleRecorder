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

  toggleCamera = () => {
    ipcRenderer.send('toggle-camera');
  }

  render() {
    const { text } = this.props

    return (
      <div id='preview-page'>

        <div className='left-side'>
          <button onClick={ this.toggleCamera }>Toggle camera</button>

          <div className='button big'>
            <img src={videoSrc} />
          </div>
          <div className='button big'>
            <img src={imageSrc} />
          </div>
        </div>
        <div className='right-side'>

          <div className='button big'>
            <img src={videoSrc} />
          </div>

          <div className='button big'>
            <img src={videoSrc} />
          </div>

          <div className='button big'>
            <img src={videoSrc} />
          </div>

        </div>

      </div>
    )
  }
}
