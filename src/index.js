// 添加polyfill，兼容IE9/11
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import fastclick from 'fastclick'
import App from './App.jsx'

// use fastclick
fastclick.attach(document.body)

// import roboto font
import 'typeface-roboto'

ReactDOM.render(<App />, document.getElementById('app'))
