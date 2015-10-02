'use strict'

import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import { Link, Router, Route } from 'react-router'

class App extends React.Component {  
  render() {
    return (
      <div>
        <h1>App</h1>
        
        {/* change the <a>s to <Links>s */}

        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/foo">foo</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
}

// function multiply(a, b) {
//   return a * b;
// }

//export {App, multiply}
export default App