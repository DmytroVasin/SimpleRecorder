import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as actions from '../../actions/actions'

class ApplicationComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='window'>
        <div className='window-container'>

          <div className='window-content'>
            { this.props.children }
          </div>

        </div>
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
