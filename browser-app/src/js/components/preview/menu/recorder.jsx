import React from 'react'

import videoSrc from '../../../../images/video.png';
import imageSrc from '../../../../images/image.png';

export class MenuRecorder extends React.Component {

  handleStartRecording = () => {
    this.props.startRecording()
  }

  render () {
    return (
      <div id='recorder'>
        <div id='big-buttons'>
          <div className='button' onClick={this.handleStartRecording}>
            <img src={videoSrc} />
          </div>

          <div className='button'>
            <img src={imageSrc} />
          </div>
        </div>
      </div>
    )
  }
}
