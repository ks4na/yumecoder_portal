// 添加polyfill，兼容IE9/11
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import fastclick from 'fastclick'
import App from './App.jsx'

// add redux
import { Provider } from 'react-redux'
import configureStore from './models/configureStore.js'

// use fastclick
fastclick.attach(document.body)

// import roboto font
import 'typeface-roboto'

// create redux store
const preloadedState = {}
const store = configureStore(preloadedState)

// add AppWrapper Comp to wrap App Comp
function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<AppWrapper />, document.getElementById('app'))
