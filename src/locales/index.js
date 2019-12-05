import enUS from './en-US.js'
import jaJP from './ja-JP.js'
import zhCN from './zh-CN.js'

const locales = {
  'zh-cn': zhCN,
  'en-us': enUS,
  'ja-jp': jaJP,
}

const defaultLocale = 'zh-cn'

export function getLocale() {
  const localeFromStorage =
    window.localStorage && window.localStorage.getItem('locale')
  const navigatorLang =
    window.navigator.language || window.navigator.browserLanguage
  const locale = localeFromStorage || navigatorLang || defaultLocale
  const lowerCaseLocale = locale.toLowerCase()
  if (locales[lowerCaseLocale]) {
    return lowerCaseLocale
  } else if (
    Object.keys(locales).find(item => item.indexOf(lowerCaseLocale) !== -1)
  ) {
    return lowerCaseLocale
  }
  return defaultLocale
}

export function getLocaleMessages(locale = defaultLocale) {
  let localeMessages
  const lowerCaseLocale = locale.toLowerCase()
  if (locales[lowerCaseLocale]) {
    localeMessages = locales[lowerCaseLocale]
  } else {
    const key = Object.keys(locales).find(
      item => item.indexOf(lowerCaseLocale) !== -1
    )
    if (key) {
      localeMessages = locales[key]
    } else {
      localeMessages = locales[defaultLocale]
    }
  }
  return localeMessages
}

export function saveLocale(locale) {
  window.localStorage.setItem('locale', locale)
}
