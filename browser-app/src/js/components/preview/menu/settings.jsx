import React from 'react'
import classNames from 'classnames';

export class MenuSettings extends React.Component {

  handleToggleVideo = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.props.toggleVideo(value)
  }

  handleToggleSettings = () => {
    this.props.toggleSettings()
  }

  render () {
    const { recording, settingsOpen, showVideo } = this.props;

    return (
      <div id='settings'>

        <div className='row'>
          <div id='show-more' className={ classNames({ 'active': settingsOpen, 'disable': recording }) } onClick={this.handleToggleSettings}>
            Settings
          </div>
        </div>

        <div className='row'>
          <div className='question'>Video</div>

          <div className='switch'>
            <input id='cmn-toggle-1' className='cmn-toggle cmn-toggle-round-flat' type='checkbox' checked={showVideo} onChange={this.handleToggleVideo}/>
            <label htmlFor='cmn-toggle-1'></label>
          </div>
        </div>

        <div className='row'>
          <div className='question'>Audio</div>

          <div className='switch'>
            <input id='cmn-toggle-2' className='cmn-toggle cmn-toggle-round-flat' type='checkbox' />
            <label htmlFor='cmn-toggle-2'></label>
          </div>
        </div>

      </div>
    )
  }
}
