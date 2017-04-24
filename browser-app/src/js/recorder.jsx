import '../styles/recorder.scss'

import React, { Component } from 'react'
import { render } from 'react-dom'

class Recorder extends Component {

  render() {
    return (
      <div className='window'></div>
    )
  }
}

render(<Recorder />, document.getElementById('react-root'))
