'use strict'
import React from 'react'
import { Link, Router, Route } from 'react-router'

import App from './App';
import * as About from './Hello';
import * as Contact from './Contact';
import * as NoMatch from './Default';

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="contact" component={Contact}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body)