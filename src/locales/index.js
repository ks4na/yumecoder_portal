import enUS from './en-US.js'
import jaJP from './ja-JP.js'
import zhCN from './zh-CN.js'

const localeInfos = {
  'zh-cn': { locale: 'zh-cn', msgs: zhCN },
  'en-us': { locale: 'en', msgs: enUS },
  'ja-jp': { locale: 'ja', msgs: jaJP },
}

const defaultLocale = 'zh-cn'

export function getLocale(str) {
  const localeFromStorage =
    window.localStorage && window.localStorage.getItem('locale')
  const navigatorLang =
    window.navigator.language || window.navigator.browserLanguage
  const locale = str || localeFromStorage || navigatorLang || defaultLocale

  const lowerCaseLocale = locale.toLowerCase()

  const item = Object.keys(localeInfos).find(
    item => item.indexOf(lowerCaseLocale) !== -1
  )
  if (item) {
    return localeInfos[item].locale
  }
  return defaultLocale
}

export function getLocaleMessages(locale = defaultLocale) {
  let localeMessages
  const lowerCaseLocale = locale.toLowerCase()
  const key = Object.keys(localeInfos).find(
    item => item.indexOf(lowerCaseLocale) !== -1
  )
  if (key) {
    localeMessages = localeInfos[key].msgs
  } else {
    localeMessages = localeInfos[defaultLocale].msgs
  }
  return localeMessages
}

export function saveLocale(locale) {
  window.localStorage.setItem('locale', locale)
}
