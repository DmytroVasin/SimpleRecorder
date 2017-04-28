import React, { Component } from 'react'

import { Preview } from './preview.jsx'

class ApplicationComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='window'>
        <div className='window-container'>

          <div className='window-content'>
            <Preview />
          </div>

        </div>
      </div>
    );
  }
};

export default ApplicationComponent
