import React, { Component } from 'react'

import { Preview } from './preview.jsx'

export class PreviewPage extends Component {

  render() {
    return (
      <div id='preview-page-container'>
        <Preview text='Record Camera'/>
      </div>
    )
  }
}
