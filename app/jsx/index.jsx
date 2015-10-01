'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Router, Route } from 'react-router'

import App from './App';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

ReactDOM.render((
  <Router>
    <Route path="/" 				component={App}>
      <Route path="/home" 	component={Home}/>
      <Route path="/about" 	component={About}/>
      <Route path="*" 			component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('content'))
