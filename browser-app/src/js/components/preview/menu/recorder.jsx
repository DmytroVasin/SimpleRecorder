import React from 'react'
import classNames from 'classnames';

import videoSrc from '../../../../images/video.png';
import imageSrc from '../../../../images/image.png';
import startSrc from '../../../../images/start.png';
import stopSrc from '../../../../images/stop.png';
import waitingSrc from '../../../../images/waiting.png';

export class MenuRecorder extends React.Component {

  handleStartRecording = () => {
    this.props.startRecording()
  }

  handleStopRecording = () => {
    this.props.stopRecording()
  }

  handleTakeVideo = () => {
    this.props.takeVideo()
  }

  handleTakePhoto = () => {
    this.props.takePhoto()
  }

  render () {
    let { recorder } = this.props

    return (
      <div id='recorder' className={recorder}>
        <div className='button take-video' onClick={this.handleTakeVideo}>
          <img src={videoSrc} />
        </div>

        <div className='button take-photo' onClick={this.handleTakeVideo}>
          <img src={imageSrc} />
        </div>

        <div className='button start-rec' onClick={this.handleStartRecording}>
          <img src={startSrc} />
        </div>

        <div className='button stop-rec' onClick={this.handleStopRecording}>
          <img src={stopSrc} />
        </div>

        <div className='button waiting'>
          <img src={waitingSrc} />
        </div>
      </div>
    )
  }
}
