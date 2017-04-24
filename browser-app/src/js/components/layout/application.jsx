import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as actions from '../../actions/actions'

class ApplicationComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ipcRenderer.on('start-track-downloading', this.handleStartTrackDownloading);
    ipcRenderer.on('finish-track-downloading', this.handleFinishTrackDownloading);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('start-track-downloading', this.handleStartTrackDownloading);
    ipcRenderer.removeListener('finish-track-downloading', this.handleFinishTrackDownloading);
  }


  handleStartTrackDownloading = () => {
    this.props.actions.startTrackDownloading()
  }

  handleFinishTrackDownloading = () => {
    this.props.actions.finishTrackDownloading()
  }

  render() {
    return (
      <div className='window'>
        <div className='window-container'>
          <div>Menu</div>

          <div className='window-content'>
            { this.props.children }
          </div>
        </div>

        <div className='window-arrow-back'></div>
        <div className='window-arrow-front'></div>
      </div>
    );
  }
};


function mapStateToProps(store) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationComponent)
