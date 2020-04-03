import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import fastclick from 'fastclick'
import App from './App'

// add redux
import { Provider, useSelector } from 'react-redux'
import configureStore from './models/configureStore'

// add react-intl
import { IntlProvider } from 'react-intl'
import { getLocaleMessages } from './locales'

// import roboto font
import 'typeface-roboto'

// add router
import { BrowserRouter, HashRouter } from 'react-router-dom'
import detectBrowserInfo from 'check-browser-info'

// add MUI theme provider
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles'

import raf from 'raf'

// use fastclick
// @ts-ignore : not work when using fastclick(document.body)
fastclick.attach(document.body)

let Router = BrowserRouter
// IE9 不支持 historyAPI, 切换为 HasHhRouter
const browserInfo = detectBrowserInfo()
if (browserInfo.name === 'IE' && browserInfo.version === '9') {
  Router = HashRouter

  // requestAnimationFrame polyfill
  raf.polyfill()
}
// 根据 webpack 的全局变量 __WEBPACK_ENV_BASENAME__ (取的是 package.json 中的 basename) 来设置 Router 的 basename
const basename = __WEBPACK_ENV_BASENAME__

// create redux store
const preloadedState = {}
const store = configureStore(preloadedState)

// add AppWrapper Comp to wrap App Comp
function AppWrapper() {
  return (
    <Provider store={store}>
      <IntlProviderWrapper>
        <ThemeProviderWrapper>
          <Router basename={basename}>
            <App />
          </Router>
        </ThemeProviderWrapper>
      </IntlProviderWrapper>
    </Provider>
  )
}

// wrap App Comp with ReactIntl
function IntlProviderWrapper({
  children,
  ...restProps
}: React.PropsWithChildren<React.Attributes>) {
  const locale = useSelector(({ localeState }) => localeState.locale)
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

// wrap App Comp with MUI theme provider
function ThemeProviderWrapper({
  children,
}: React.PropsWithChildren<React.Attributes>) {
  const theme = useSelector(({ themeState }) => themeState.theme)
  console.log('themeType', theme.palette.type)
  return (
    <ThemeProvider theme={theme}>
      {/* inject the style tags first in the head */}
      <StylesProvider injectFirst>{children}</StylesProvider>
    </ThemeProvider>
  )
}

ReactDOM.render(<AppWrapper />, document.getElementById('app'))
