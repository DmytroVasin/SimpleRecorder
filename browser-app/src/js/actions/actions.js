import { push } from 'react-router-redux'
import { hashHistory } from 'react-router'
import axios from 'axios'
import { random } from '../utils';

export function startTrackDownloading() {
  return (dispatch) => {
    dispatch({
      type: 'START_TRACK_DOWNLOADING'
    })
  }
}

export function finishTrackDownloading() {
  return (dispatch) => {
    dispatch({
      type: 'FINISH_TRACK_DOWNLOADING'
    })
  }
}
