import {
  createBrowserHistory,
  createHashHistory,
  BrowserHistoryBuildOptions,
  HashHistoryBuildOptions,
  History,
} from 'history'
import detectBrowserInfo from 'check-browser-info'

export type HistoryType = 'browser' | 'hash'
export type OptionsType = BrowserHistoryBuildOptions | HashHistoryBuildOptions

export function createHistory(
  historyType: HistoryType = 'browser',
  options: OptionsType
): History {
  if (historyType === 'browser') {
    return createBrowserHistory(options)
  } else {
    return createHashHistory(options)
  }
}

const browserInfo = detectBrowserInfo()
const isIE9 = browserInfo.name === 'IE' && browserInfo.version === '9'

// 根据 webpack 的全局变量 __WEBPACK_ENV_BASENAME__ (取的是 package.json 中的 basename) 来设置 Router 的 basename
const basename = __WEBPACK_ENV_BASENAME__

const options: OptionsType = {
  basename,
}
const history = createHistory(isIE9 ? 'hash' : 'browser', options)

export default history
