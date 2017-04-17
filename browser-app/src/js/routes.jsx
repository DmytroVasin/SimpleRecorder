import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Application from './components/layout/application.jsx'

import PreviewContainer from './containers/preview_container.js'

export default (
  <Route path='/'                        component={ Application } >
    <IndexRoute                          component={ PreviewContainer } />
  </Route>
)
