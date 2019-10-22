import React from 'react'
import ReactDOM from 'react-dom'
import fastclick from 'fastclick'
import App from './App.jsx'

// use fastclick
fastclick.attach(document.body)

// import roboto font
import 'typeface-roboto'

ReactDOM.render(<App />, document.getElementById('app'))

// eslint-disable-next-line no-unused-vars
function testEslint() {
  let a = 1,
    b = '2'
  return a + b
}
