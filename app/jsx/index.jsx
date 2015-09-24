'use strict'

// var React = require('react');
// var ReactDOM = require('react-dom');

import React 	from 'react'
import ReactDOM from 'react-dom'
import { Link, Router, Route } from 'react-router'

import App from './App';
import * as About from './Hello';
//import * as Contact from './Contact';
import * as NoMatch from './Default';

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('content'))
