// 添加polyfill，兼容IE9/11
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'

// IE9 Base64 polyfill
if (!global.atob || !global.btoa) {
  console.log('start to add base64 polyfill')
  import(/* webpackChunkName: 'polyfill-base64' */ 'Base64').then(base64 => {
    global.btoa = base64.default.btoa
    global.atob = base64.default.atob
    console.log('add base64 polyfill success')
  })
}

import React from 'react'
import ReactDOM from 'react-dom'
import fastclick from 'fastclick'
import App from './App.jsx'

// add redux
import { Provider, useSelector } from 'react-redux'
import configureStore from './models/configureStore.js'

// add react-intl
import { IntlProvider } from 'react-intl'
import { getLocaleMessages } from './locales/index.js'

// use fastclick
fastclick.attach(document.body)

// import roboto font
import 'typeface-roboto'

// add router
import { BrowserRouter, HashRouter } from 'react-router-dom'
import detectBrowserInfo from 'check-browser-info'
let Router = BrowserRouter
// IE9 不支持 historyAPI, 切换为 HasHhRouter
const browserInfo = detectBrowserInfo()
if (browserInfo.name === 'IE' && browserInfo.version === '9') {
  Router = HashRouter
}

// create redux store
const preloadedState = {}
const store = configureStore(preloadedState)

// add AppWrapper Comp to wrap App Comp
function AppWrapper() {
  return (
    <Provider store={store}>
      <IntlProviderWrapper>
        <Router>
          <App />
        </Router>
      </IntlProviderWrapper>
    </Provider>
  )
}

// wrap App Comp with ReactIntl
function IntlProviderWrapper({ children, ...restProps }) {
  const locale = useSelector(({ locale }) => locale)
  return (
    <IntlProvider
      {...restProps}
      locale={locale}
      messages={getLocaleMessages(locale)}
    >
      {children}
    </IntlProvider>
  )
}

ReactDOM.render(<AppWrapper />, document.getElementById('app'))
