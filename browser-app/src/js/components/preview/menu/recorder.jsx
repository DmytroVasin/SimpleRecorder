import React from 'react'
import classNames from 'classnames';

import videoSrc from '../../../../images/video.png';
import startSrc from '../../../../images/start.png';
import stopSrc from '../../../../images/stop.png';
import waitingSrc from '../../../../images/waiting.png';
import takeImageSrc from '../../../../images/image.png';
import makeImageSrc from '../../../../images/image_make.png';

export class MenuRecorder extends React.Component {

  handleTakeVideo = () => {
    this.props.takeVideo()
  }

  handleStartRecording = () => {
    this.props.startRecording()
  }

  handleStopRecording = () => {
    this.props.stopRecording()
  }

  handleTakePhoto = () => {
    this.props.takePhoto()
  }

  handleMakePhoto = () => {
    this.props.makePhoto()
  }

  render () {
    let { recorder } = this.props

    return (
      <div id='recorder' className={recorder}>
        <div className='button take-video' onClick={this.handleTakeVideo}>
          <img src={videoSrc} />
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

        <div className='button take-photo' onClick={this.handleTakePhoto}>
          <img src={takeImageSrc} />
        </div>

        <div className='button make-photo' onClick={this.handleMakePhoto}>
          <img src={makeImageSrc} />
        </div>
      </div>
    )
  }
}
